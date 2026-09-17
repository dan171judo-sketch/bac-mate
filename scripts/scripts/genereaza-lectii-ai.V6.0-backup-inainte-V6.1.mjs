$ErrorActionPreference = "Stop"

$generator = ".\scripts\genereaza-lectii-ai.mjs"
$backup = ".\scripts\genereaza-lectii-ai.V6.0-backup-automat-V6.1.mjs"

Write-Host ""
Write-Host "BAC MATE - instalare Math QA V6.1"
Write-Host "================================="
Write-Host ""

if (-not (Test-Path $generator)) {
    throw "Nu gasesc generatorul: $generator"
}

Copy-Item $generator $backup -Force
Write-Host "OK - backup creat:"
Write-Host $backup
Write-Host ""

$text = Get-Content $generator -Raw

if ($text -match "function mathQaValideazaExercitiu") {
    throw "Math QA pare deja instalat. Oprire pentru siguranta."
}

$marker = "function valideazaLotExercitii(x) {"

if (-not $text.Contains($marker)) {
    throw "Nu gasesc functia valideazaLotExercitii. Generatorul ramane nemodificat."
}

$mathQa = @'
/* =========================================================
   BAC MATE V6.1 - MATH QA DETERMINIST
   Verificari matematice locale pentru cazuri demonstrabile.

   IMPORTANT:
   - AI-ul NU este sursa de adevar;
   - verificam numai cazurile pe care le putem calcula sigur;
   - cazurile necunoscute raman pentru verificare umana;
   - acest gate NU seteaza verificatMatematic=true.
========================================================= */

function mathQaNormalizeazaText(text) {
  return String(text ?? "")
    .normalize("NFKC")
    .replace(/[−–—]/g, "-")
    .replace(/∞/g, "inf")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function mathQaNumar(text) {
  const valoare = Number(
    String(text ?? "")
      .replace(",", ".")
      .trim()
  );

  return Number.isFinite(valoare)
    ? valoare
    : null;
}

function mathQaAproapeEgal(a, b) {
  return (
    Number.isFinite(a) &&
    Number.isFinite(b) &&
    Math.abs(a - b) < 1e-10
  );
}

function mathQaParseazaInterval(text) {
  if (!esteText(text)) {
    return null;
  }

  let t = String(text)
    .normalize("NFKC")
    .trim()
    .replace(/[−–—]/g, "-")
    .replace(/∞/g, "inf")
    .replace(/\s+/g, "")
    .toLowerCase();

  t = t
    .replace(/infinity/g, "inf")
    .replace(/\+infinitate/g, "+inf")
    .replace(/-infinitate/g, "-inf")
    .replace(/\+infinit/g, "+inf")
    .replace(/-infinit/g, "-inf");

  const match = t.match(
    /^([\[\(])([^,;]+)[,;]([^\]\)]+)([\]\)])$/
  );

  if (!match) {
    return null;
  }

  function parseazaCapat(valoare) {
    if (valoare === "-inf") {
      return -Infinity;
    }

    if (
      valoare === "inf" ||
      valoare === "+inf"
    ) {
      return Infinity;
    }

    return mathQaNumar(valoare);
  }

  const stanga = parseazaCapat(match[2]);
  const dreapta = parseazaCapat(match[3]);

  if (
    stanga === null ||
    dreapta === null ||
    !(stanga < dreapta)
  ) {
    return null;
  }

  const inchisStanga =
    match[1] === "[";

  const inchisDreapta =
    match[4] === "]";

  // Infinitul nu poate fi inclus intr-un interval.
  if (
    stanga === -Infinity &&
    inchisStanga
  ) {
    return null;
  }

  if (
    dreapta === Infinity &&
    inchisDreapta
  ) {
    return null;
  }

  return {
    stanga,
    dreapta,
    inchisStanga,
    inchisDreapta,
  };
}

function mathQaIntervalEgal(a, b) {
  if (!a || !b) {
    return false;
  }

  return (
    a.stanga === b.stanga &&
    a.dreapta === b.dreapta &&
    a.inchisStanga === b.inchisStanga &&
    a.inchisDreapta === b.inchisDreapta
  );
}

function mathQaIntervalContine(
  interval,
  valoare
) {
  if (
    !interval ||
    !Number.isFinite(valoare)
  ) {
    return false;
  }

  const stangaOk =
    interval.stanga === -Infinity ||
    valoare > interval.stanga ||
    (
      mathQaAproapeEgal(
        valoare,
        interval.stanga
      ) &&
      interval.inchisStanga
    );

  const dreaptaOk =
    interval.dreapta === Infinity ||
    valoare < interval.dreapta ||
    (
      mathQaAproapeEgal(
        valoare,
        interval.dreapta
      ) &&
      interval.inchisDreapta
    );

  return stangaOk && dreaptaOk;
}

function mathQaIntervalDinConditii(enunt) {
  if (!esteText(enunt)) {
    return null;
  }

  const t = String(enunt)
    .normalize("NFKC")
    .replace(/[−–—]/g, "-")
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/\s+/g, "")
    .toLowerCase();

  const regex =
    /x(<=|>=|<|>)([-+]?\d+(?:[.,]\d+)?)/g;

  const conditii = [];
  let match;

  while (
    (match = regex.exec(t)) !== null
  ) {
    const valoare =
      mathQaNumar(match[2]);

    if (valoare === null) {
      return null;
    }

    conditii.push({
      operator: match[1],
      valoare,
    });
  }

  // Aplicam acest gate numai daca avem exact
  // doua conditii explicite cu x.
  if (conditii.length !== 2) {
    return null;
  }

  let stanga = -Infinity;
  let dreapta = Infinity;
  let inchisStanga = false;
  let inchisDreapta = false;

  for (const conditie of conditii) {
    if (
      conditie.operator === ">" ||
      conditie.operator === ">="
    ) {
      if (conditie.valoare > stanga) {
        stanga = conditie.valoare;
        inchisStanga =
          conditie.operator === ">=";
      } else if (
        mathQaAproapeEgal(
          conditie.valoare,
          stanga
        )
      ) {
        inchisStanga =
          inchisStanga &&
          conditie.operator === ">=";
      }
    }

    if (
      conditie.operator === "<" ||
      conditie.operator === "<="
    ) {
      if (conditie.valoare < dreapta) {
        dreapta = conditie.valoare;
        inchisDreapta =
          conditie.operator === "<=";
      } else if (
        mathQaAproapeEgal(
          conditie.valoare,
          dreapta
        )
      ) {
        inchisDreapta =
          inchisDreapta &&
          conditie.operator === "<=";
      }
    }
  }

  if (
    stanga === -Infinity ||
    dreapta === Infinity ||
    !(stanga < dreapta)
  ) {
    return null;
  }

  return {
    stanga,
    dreapta,
    inchisStanga,
    inchisDreapta,
  };
}

function mathQaRezolvaInecuatieLiniara(
  enunt
) {
  if (!esteText(enunt)) {
    return null;
  }

  const t = String(enunt)
    .normalize("NFKC")
    .replace(/[−–—]/g, "-")
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/\s+/g, "")
    .toLowerCase();

  /*
   * Cazuri suportate:
   *
   * ax+b<c
   * ax+b<=c
   * ax+b>c
   * ax+b>=c
   *
   * Exemple:
   * 2x-5<3
   * 3x+1>=7
   * -2x+4<=10
   */

  const gasita = t.match(
    /([-+]?\d*(?:[.,]\d+)?)x([+-]\d+(?:[.,]\d+)?)?(<=|>=|<|>)([-+]?\d+(?:[.,]\d+)?)/
  );

  if (!gasita) {
    return null;
  }

  let coefText = gasita[1];

  if (
    coefText === "" ||
    coefText === "+"
  ) {
    coefText = "1";
  }

  if (coefText === "-") {
    coefText = "-1";
  }

  const a =
    mathQaNumar(coefText);

  const b =
    gasita[2]
      ? mathQaNumar(gasita[2])
      : 0;

  const c =
    mathQaNumar(gasita[4]);

  if (
    a === null ||
    b === null ||
    c === null ||
    mathQaAproapeEgal(a, 0)
  ) {
    return null;
  }

  let operator = gasita[3];
  const limita = (c - b) / a;

  if (a < 0) {
    const invers = {
      "<": ">",
      "<=": ">=",
      ">": "<",
      ">=": "<=",
    };

    operator = invers[operator];
  }

  if (
    operator === "<" ||
    operator === "<="
  ) {
    return {
      stanga: -Infinity,
      dreapta: limita,
      inchisStanga: false,
      inchisDreapta:
        operator === "<=",
    };
  }

  return {
    stanga: limita,
    dreapta: Infinity,
    inchisStanga:
      operator === ">=",
    inchisDreapta: false,
  };
}

function mathQaExtrageNumarApartenenta(
  enunt
) {
  if (!esteText(enunt)) {
    return null;
  }

  const text = String(enunt)
    .normalize("NFKC")
    .replace(/[−–—]/g, "-");

  const modele = [
    /interval(?:ul)?\s+(?:care\s+)?conține\s+(?:numărul\s+)?([-+]?\d+(?:[.,]\d+)?)/i,
    /care\s+interval\s+conține\s+(?:numărul\s+)?([-+]?\d+(?:[.,]\d+)?)/i,
    /numărul\s+([-+]?\d+(?:[.,]\d+)?)\s+(?:aparține|este\s+în)/i,
  ];

  for (const model of modele) {
    const match = text.match(model);

    if (match) {
      return mathQaNumar(match[1]);
    }
  }

  return null;
}

function mathQaValideazaExercitiu(
  exercitiu,
  baza
) {
  const erori = [];

  if (
    !exercitiu ||
    !esteText(exercitiu.enunt) ||
    !esteText(
      exercitiu.raspunsCorect
    )
  ) {
    return erori;
  }

  /*
   * GATE 1
   * Doua conditii explicite cu x.
   *
   * Exemplu:
   * x > 2 si x <= 5
   * trebuie (2,5], nu [2,5].
   */

  const intervalConditii =
    mathQaIntervalDinConditii(
      exercitiu.enunt
    );

  if (intervalConditii) {
    const intervalRaspuns =
      mathQaParseazaInterval(
        exercitiu.raspunsCorect
      );

    if (
      intervalRaspuns &&
      !mathQaIntervalEgal(
        intervalConditii,
        intervalRaspuns
      )
    ) {
      erori.push(
        `${baza}.mathQA: raspunsul interval nu corespunde conditiilor explicite din enunt`
      );
    }
  }

  /*
   * GATE 2
   * Inecuatie liniara simpla.
   *
   * Exemplu:
   * 2x - 5 < 3
   * trebuie (-inf,4).
   */

  const intervalInecuatie =
    mathQaRezolvaInecuatieLiniara(
      exercitiu.enunt
    );

  if (intervalInecuatie) {
    const intervalRaspuns =
      mathQaParseazaInterval(
        exercitiu.raspunsCorect
      );

    if (
      intervalRaspuns &&
      !mathQaIntervalEgal(
        intervalInecuatie,
        intervalRaspuns
      )
    ) {
      erori.push(
        `${baza}.mathQA: raspunsul nu este solutia corecta a inecuatiei liniare`
      );
    }
  }

  /*
   * GATE 3
   * Alegere multipla de apartenenta.
   *
   * Daca putem interpreta toate cele 4 variante
   * drept intervale, trebuie sa existe EXACT
   * o singura varianta matematic corecta.
   */

  if (
    exercitiu.tip ===
      "alegere-multipla" &&
    Array.isArray(
      exercitiu.variante
    ) &&
    exercitiu.variante.length === 4
  ) {
    const valoare =
      mathQaExtrageNumarApartenenta(
        exercitiu.enunt
      );

    if (valoare !== null) {
      const intervale =
        exercitiu.variante.map(
          (varianta) =>
            mathQaParseazaInterval(
              varianta
            )
        );

      if (intervale.every(Boolean)) {
        const corecte = [];

        intervale.forEach(
          (interval, index) => {
            if (
              mathQaIntervalContine(
                interval,
                valoare
              )
            ) {
              corecte.push(index);
            }
          }
        );

        if (corecte.length !== 1) {
          erori.push(
            `${baza}.mathQA: alegerea multipla de apartenenta are ${corecte.length} variante matematic corecte; trebuie exact 1`
          );
        } else {
          const declarat =
            mathQaNormalizeazaText(
              exercitiu.raspunsCorect
            );

          const calculat =
            mathQaNormalizeazaText(
              exercitiu.variante[
                corecte[0]
              ]
            );

          if (declarat !== calculat) {
            erori.push(
              `${baza}.mathQA: raspunsCorect nu coincide cu unica varianta matematic adevarata`
            );
          }
        }
      }
    }
  }

  return erori;
}

'@

$text = $text.Replace(
    $marker,
    $mathQa + $marker
)

$oldTail = @'
      }
    }
  );

  return erori;
}
/* =========================================================
   VALIDATOR VIDEO
'@

$newTail = @'
      }

      erori.push(
        ...mathQaValideazaExercitiu(
          exercitiu,
          baza
        )
      );
    }
  );

  return erori;
}
/* =========================================================
   VALIDATOR VIDEO
'@

if (-not $text.Contains($oldTail)) {
    Copy-Item $backup $generator -Force
    throw "Nu am gasit finalul exact al validatorului de exercitii. Am restaurat automat backup-ul."
}

$text = $text.Replace(
    $oldTail,
    $newTail
)

# Actualizam numai identificarea versiunii.
$text = $text.Replace(
    'const VERSIUNE_GENERATOR = "6.0";',
    'const VERSIUNE_GENERATOR = "6.1";'
)

$text = $text.Replace(
    'BAC MATE — GENERATOR LOCAL CONTENT ENGINE V6.0',
    'BAC MATE — GENERATOR LOCAL CONTENT ENGINE V6.1'
)

$text = $text.Replace(
    'BAC MATE — Generator Local Content Engine V6.0',
    'BAC MATE — Generator Local Content Engine V6.1'
)

Set-Content `
    -Path $generator `
    -Value $text `
    -Encoding UTF8

Write-Host "OK - Math QA V6.1 a fost inserat."
Write-Host ""
Write-Host "Verific sintaxa..."
Write-Host ""

node --check $generator

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "EROARE DE SINTAXA."
    Write-Host "Restaurez automat V6.0..."
    Copy-Item $backup $generator -Force
    throw "V6.1 nu a fost pastrat. Generatorul V6.0 a fost restaurat."
}

Write-Host ""
Write-Host "================================="
Write-Host "OK - SINTAXA V6.1 ESTE VALIDA"
Write-Host "================================="
Write-Host ""
Write-Host "NU rula inca generarea."