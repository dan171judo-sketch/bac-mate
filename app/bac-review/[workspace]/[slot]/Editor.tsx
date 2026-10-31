'use client';

import Link from 'next/link';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type RubricStep = {
  text: string;
  points: number;
};

type Checks = Record<string, boolean>;

type SlotData = {
  slot: string;
  statement?: string;
  expectedResults?: string[];
  acceptedEquivalentForms?: string[];
  rubricSteps?: RubricStep[];
  checks?: Checks;
  evidence?: {
    subjectPage?: number;
    rubricPage?: number;
  };
  assisted?: {
    subjectPageCandidates?: number[];
    rubricPageCandidates?: number[];
  };
};

type EditorProps = {
  workspace: string;
  slot: SlotData;
  index: number;
  total: number;
  prevSlot: string | null;
  nextSlot: string | null;
  subjectPdf: string | null;
  rubricPdf: string | null;
};

export default function Editor({
  workspace,
  slot,
  index,
  total,
  prevSlot,
  nextSlot,
  subjectPdf,
  rubricPdf,
}: EditorProps) {
  const [statement, setStatement] = useState(
    slot.statement ?? ''
  );

  const [expected, setExpected] = useState(
    (slot.expectedResults ?? []).join('\n')
  );

  const [equiv, setEquiv] = useState(
    (slot.acceptedEquivalentForms ?? []).join('\n')
  );

  const [steps, setSteps] = useState<RubricStep[]>(
    slot.rubricSteps?.length
      ? slot.rubricSteps
      : [{ text: '', points: 5 }]
  );

  const [checks, setChecks] = useState<Checks>(
    slot.checks ?? {}
  );

  const [subjectPage, setSubjectPage] = useState(
    Number(
      slot.evidence?.subjectPage ??
        slot.assisted?.subjectPageCandidates?.[0] ??
        1
    )
  );

  const [rubricPage, setRubricPage] = useState(
    Number(
      slot.evidence?.rubricPage ??
        slot.assisted?.rubricPageCandidates?.[0] ??
        1
    )
  );

  const [message, setMessage] = useState('');

  const pointsTotal = useMemo(
    () =>
      steps.reduce(
        (totalPoints, step) =>
          totalPoints + (Number(step.points) || 0),
        0
      ),
    [steps]
  );

  function updateStep(
    index: number,
    key: keyof RubricStep,
    value: string | number
  ) {
    setSteps((current) =>
      current.map((step, currentIndex) =>
        currentIndex === index
          ? { ...step, [key]: value }
          : step
      )
    );
  }

  async function save() {
    setMessage('Salvez...');

    try {
      const response = await fetch(
        '/api/bac-review/save',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            workspace,
            slot: slot.slot,
            statement,
            expectedResults: expected
              .split('\n')
              .map((value) => value.trim())
              .filter(Boolean),
            acceptedEquivalentForms: equiv
              .split('\n')
              .map((value) => value.trim())
              .filter(Boolean),
            rubricSteps: steps,
            subjectPage,
            rubricPage,
            checks,
            reviewer: 'human-reviewer',
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          result.error ?? 'Eroare la salvare.'
        );
        return;
      }

      setMessage(
        'Salvat ✓ Workspace-ul NU este promovat automat.'
      );
    } catch {
      setMessage('Eroare la salvare.');
    }
  }

  const base =
    `/bac-review/${encodeURIComponent(workspace)}/`;

  return (
    <main className="mx-auto max-w-[1700px] space-y-4 p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/bac-review">
            ← workbench
          </Link>

          <h1 className="text-2xl font-bold">
            {workspace} · {slot.slot}
          </h1>

          <p className="text-sm opacity-70">
            Slot {index + 1}/{total}. Compară vizual
            cu documentele oficiale; extracția automată
            nu este adevăr matematic.
          </p>
        </div>

        <nav className="flex gap-2">
          {prevSlot ? (
            <Link
              className="rounded border px-3 py-2"
              href={
                base +
                encodeURIComponent(prevSlot)
              }
            >
              ← {prevSlot}
            </Link>
          ) : null}

          {nextSlot ? (
            <Link
              className="rounded border px-3 py-2"
              href={
                base +
                encodeURIComponent(nextSlot)
              }
            >
              {nextSlot} →
            </Link>
          ) : null}
        </nav>
      </header>

      <div className="grid gap-5 xl:grid-cols-2">
        <section>
          <div className="grid gap-4 md:grid-cols-2">
            <PdfCanvas
              title="Subiect oficial"
              file={subjectPdf}
              pageNumber={subjectPage}
            />

            <PdfCanvas
              title="Barem oficial"
              file={rubricPdf}
              pageNumber={rubricPage}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label>
              Pagina subiect

              <input
                className="mt-1 w-full rounded border p-2"
                type="number"
                min={1}
                value={subjectPage}
                onChange={(event) =>
                  setSubjectPage(
                    Math.max(
                      1,
                      Number(event.target.value) || 1
                    )
                  )
                }
              />
            </label>

            <label>
              Pagina barem

              <input
                className="mt-1 w-full rounded border p-2"
                type="number"
                min={1}
                value={rubricPage}
                onChange={(event) =>
                  setRubricPage(
                    Math.max(
                      1,
                      Number(event.target.value) || 1
                    )
                  )
                }
              />
            </label>
          </div>

          <label className="block">
            Enunț verificat

            <textarea
              className="mt-1 min-h-32 w-full rounded border p-2"
              value={statement}
              onChange={(event) =>
                setStatement(event.target.value)
              }
            />
          </label>

          <label className="block">
            Rezultate așteptate (unul/rând)

            <textarea
              className="mt-1 w-full rounded border p-2"
              value={expected}
              onChange={(event) =>
                setExpected(event.target.value)
              }
            />
          </label>

          <label className="block">
            Forme echivalente acceptate

            <textarea
              className="mt-1 w-full rounded border p-2"
              value={equiv}
              onChange={(event) =>
                setEquiv(event.target.value)
              }
            />
          </label>

          <section>
            <h2 className="font-semibold">
              Barem — total obligatoriu 5p{' '}
              <span
                className={
                  Math.abs(pointsTotal - 5) < 0.0001
                    ? ''
                    : 'font-bold'
                }
              >
                ({pointsTotal}p)
              </span>
            </h2>

            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-2 py-1"
              >
                <input
                  className="flex-1 rounded border p-2"
                  value={step.text}
                  onChange={(event) =>
                    updateStep(
                      index,
                      'text',
                      event.target.value
                    )
                  }
                />

                <input
                  className="w-24 rounded border p-2"
                  type="number"
                  step={0.5}
                  value={step.points}
                  onChange={(event) =>
                    updateStep(
                      index,
                      'points',
                      Number(event.target.value)
                    )
                  }
                />

                <button
                  type="button"
                  className="rounded border px-2"
                  onClick={() =>
                    setSteps((current) =>
                      current.filter(
                        (_, currentIndex) =>
                          currentIndex !== index
                      )
                    )
                  }
                >
                  ×
                </button>
              </div>
            ))}

            <button
              type="button"
              className="rounded border px-3 py-1"
              onClick={() =>
                setSteps((current) => [
                  ...current,
                  {
                    text: '',
                    points: 1,
                  },
                ])
              }
            >
              + pas
            </button>
          </section>

          <section className="space-y-2">
            {[
              [
                'statementMatchesOfficial',
                'Enunț identic cu PDF-ul oficial',
              ],
              [
                'mathNotationChecked',
                'Notația matematică verificată vizual',
              ],
              [
                'rubricMatchesOfficial',
                'Barem verificat cu PDF-ul oficial',
              ],
              [
                'pointsChecked',
                'Punctaj total verificat: 5p',
              ],
            ].map(([key, label]) => (
              <label
                key={key}
                className="block"
              >
                <input
                  type="checkbox"
                  checked={checks[key] === true}
                  onChange={(event) =>
                    setChecks((current) => ({
                      ...current,
                      [key]: event.target.checked,
                    }))
                  }
                />{' '}
                {label}
              </label>
            ))}
          </section>

          <button
            type="button"
            className="rounded border px-4 py-2 font-semibold"
            onClick={save}
          >
            Salvează verificarea slotului
          </button>

          <p className="text-sm font-semibold">
            {message}
          </p>
        </section>
      </div>
    </main>
  );
}

function PdfCanvas({
  title,
  file,
  pageNumber,
}: {
  title: string;
  file: string | null;
  pageNumber: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [status, setStatus] = useState(
    file ? 'Se încarcă PDF-ul...' : 'PDF indisponibil.'
  );

  const [pageCount, setPageCount] = useState<number | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    let loadingTask:
      | ReturnType<
          typeof import('pdfjs-dist')['getDocument']
        >
      | null = null;

    async function renderPdf() {
      if (!file) {
        setStatus('PDF indisponibil.');
        setPageCount(null);
        return;
      }

      setStatus('Se încarcă PDF-ul...');
      setPageCount(null);

      try {
        const pdfjs = await import('pdfjs-dist');

        if (cancelled) {
          return;
        }

        pdfjs.GlobalWorkerOptions.workerSrc =
          '/pdf.worker.min.mjs';

        const response = await fetch(
          `/api/bac-review/pdf?file=${encodeURIComponent(file)}`,
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(
            `PDF HTTP ${response.status}`
          );
        }

        const arrayBuffer =
          await response.arrayBuffer();

        if (cancelled) {
          return;
        }

        loadingTask = pdfjs.getDocument({
          data: new Uint8Array(arrayBuffer),
        });

        const pdf = await loadingTask.promise;

        if (cancelled) {
          return;
        }

        setPageCount(pdf.numPages);

        const safePageNumber = Math.min(
          Math.max(
            1,
            Math.trunc(pageNumber || 1)
          ),
          pdf.numPages
        );

        const pdfPage = await pdf.getPage(
          safePageNumber
        );

        if (cancelled) {
          return;
        }

        const canvas = canvasRef.current;

        if (!canvas) {
          throw new Error(
            'Canvas indisponibil.'
          );
        }

        const context =
          canvas.getContext('2d');

        if (!context) {
          throw new Error(
            'Context canvas indisponibil.'
          );
        }

        const baseViewport =
          pdfPage.getViewport({
            scale: 1,
          });

        const containerWidth =
          canvas.parentElement?.clientWidth ??
          600;

        const scale = Math.max(
          0.5,
          (containerWidth - 20) /
            baseViewport.width
        );

        const viewport =
          pdfPage.getViewport({
            scale,
          });

        const outputScale =
          window.devicePixelRatio || 1;

        canvas.width = Math.floor(
          viewport.width * outputScale
        );

        canvas.height = Math.floor(
          viewport.height * outputScale
        );

        canvas.style.width =
          `${Math.floor(viewport.width)}px`;

        canvas.style.height =
          `${Math.floor(viewport.height)}px`;

        context.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const renderTask =
          pdfPage.render({
            canvas,
            canvasContext: context,
            viewport,
            transform:
              outputScale !== 1
                ? [
                    outputScale,
                    0,
                    0,
                    outputScale,
                    0,
                    0,
                  ]
                : undefined,
          });

        await renderTask.promise;

        if (!cancelled) {
          setStatus('');
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          'BAC Review PDF render error:',
          error
        );

        setStatus(
          'PDF-ul nu a putut fi randat.'
        );
      }
    }

    void renderPdf();

    return () => {
      cancelled = true;

      if (loadingTask) {
        void loadingTask.destroy().catch(
          () => undefined
        );
      }
    };
  }, [file, pageNumber]);

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">
          {title}
        </span>

        <span className="text-xs opacity-70">
          pagina {pageNumber}
          {pageCount
            ? ` / ${pageCount}`
            : ''}
        </span>
      </div>

      <div className="h-[720px] overflow-auto rounded border bg-white p-2">
        {status ? (
          <div className="mb-2 rounded border p-2 text-sm">
            {status}
          </div>
        ) : null}

        <canvas
          ref={canvasRef}
          className="mx-auto block"
        />
      </div>
    </div>
  );
}