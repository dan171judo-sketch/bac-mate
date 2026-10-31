
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "../../../../lib/supabase/admin";
import {
  STRIPE_PRICES,
  type StripePlan,
} from "../../../../lib/stripe-prices";

export const runtime = "nodejs";

const planByPrice = Object.fromEntries(
  Object.entries(STRIPE_PRICES).map(([plan, price]) => [
    price,
    plan,
  ])
) as Record<string, StripePlan>;

function subscriptionStatus(
  status: Stripe.Subscription.Status
) {
  if (status === "active") return "active";
  if (status === "trialing") return "trialing";
  return "inactive";
}

async function syncSubscription(
  stripe: Stripe,
  subscriptionId: string
) {
  // Citim starea actuala din Stripe, nu obiectul
  // vechi primit in eveniment.
  const subscription =
    await stripe.subscriptions.retrieve(
      subscriptionId
    );

  const admin = createAdminClient();

  const userId =
    subscription.metadata.supabase_user_id;

  if (!userId) {
    throw new Error(
      "Lipseste supabase_user_id din metadata Stripe."
    );
  }

  const firstItem = subscription.items.data[0];

  if (!firstItem) {
    throw new Error(
      "Abonamentul Stripe nu are un pret asociat."
    );
  }

  const plan = planByPrice[firstItem.price.id];

  if (!plan) {
    throw new Error(
      "Pret Stripe necunoscut: " +
        firstItem.price.id
    );
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const expiresAt = new Date(
    firstItem.current_period_end * 1000
  ).toISOString();

  const { data: existing, error: readError } =
    await admin
      .from("subscriptions")
      .select("stripe_subscription_id")
      .eq("user_id", userId)
      .maybeSingle();

  if (readError) {
    throw new Error(
      "Supabase: " + readError.message
    );
  }

  // Nu permitem ca evenimentele unui abonament
  // Stripe vechi sa suprascrie unul nou.
  if (
    existing?.stripe_subscription_id &&
    existing.stripe_subscription_id !==
      subscription.id
  ) {
    const current =
      await stripe.subscriptions.retrieve(
        existing.stripe_subscription_id
      );

    if (
      ["active", "trialing", "past_due", "unpaid"].includes(
        current.status
      )
    ) {
      console.log(
        "Ignoram abonamentul Stripe vechi:",
        subscription.id
      );
      return;
    }
  }

  const { error } = await admin
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        plan,
        status: subscriptionStatus(
          subscription.status
        ),
        stripe_customer_id: customerId,
        stripe_subscription_id:
          subscription.id,
        starts_at: new Date(
          subscription.start_date * 1000
        ).toISOString(),
        expires_at: expiresAt,
        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );

  if (error) {
    throw new Error(
      "Supabase: " + error.message
    );
  }
}

export async function POST(
  request: NextRequest
) {
  const signature =
    request.headers.get("stripe-signature");

  const secret =
    process.env.STRIPE_WEBHOOK_SECRET;

  const stripeKey =
    process.env.STRIPE_SECRET_KEY;

  if (!signature || !secret || !stripeKey) {
    return NextResponse.json(
      {
        error:
          "Configuratia webhook lipseste.",
      },
      { status: 400 }
    );
  }

  const stripe = new Stripe(stripeKey);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      secret
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Semnatura Stripe invalida.",
      },
      { status: 400 }
    );
  }

  try {
    if (
      event.type ===
        "customer.subscription.created" ||
      event.type ===
        "customer.subscription.updated" ||
      event.type ===
        "customer.subscription.deleted"
    ) {
      const subscription =
        event.data.object as Stripe.Subscription;

      await syncSubscription(
        stripe,
        subscription.id
      );
    }

    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data.object as Stripe.Checkout.Session;

      if (session.subscription) {
        const subscriptionId =
          typeof session.subscription ===
          "string"
            ? session.subscription
            : session.subscription.id;

        await syncSubscription(
          stripe,
          subscriptionId
        );
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "BAC MATE Stripe Webhook:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Nu am putut sincroniza abonamentul.",
      },
      { status: 500 }
    );
  }
}
