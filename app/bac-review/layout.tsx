import { redirect } from "next/navigation";
import { isBacReviewAuthorized } from "@/lib/bac-review-auth";
export const dynamic = "force-dynamic";
export default async function Layout({children}:{children:React.ReactNode}){if(!(await isBacReviewAuthorized()))redirect("/bac-review-access");return children;}
