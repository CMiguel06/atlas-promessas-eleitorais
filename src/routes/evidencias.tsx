import { createFileRoute } from "@tanstack/react-router";
import {
  DOCUMENTS,
  EVIDENCE_TYPE_LABEL,
  PARTIES,
  PROMISES,
  type EvidenceType,
  type PromiseEvidence,
} from "@/lib/politrace-data";

export const Route = createFileRoute("/evidencias")({
  head: () => ({
    meta: [
      { title: "Evidências — Atlas" },
      {
        name: "description",
        content: "Fontes e evidências separadas pela sua função documental.",
      },
    ],
  }),
  component: Page,
});

const EVIDENCE_ORDER: EvidenceType[] = [
  "fonte_promessa",
  "evidencia_execucao",
  "evidencia_institucional",
  "evidencia_legal",
  "evidencia_orcamental",
  "nota_metodologica",
];

function groupEvidence(evidences: PromiseEvidence[]) {
  return EVIDENCE_ORDER.map((type) => ({
    type,
    items: evidences.filter((evidence) => evidence.tipo === type),
  }));
}

function Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Evidências e fontes</h1>
      <p className="text-muted-foreground mt-2 mb-8">
        A fonte eleitoral prova a existência documental de uma promessa quando a promessa foi
        extraída; não prova execução nem cumprimento. Evidências institucionais, legais ou
        orçamentais são tratadas separadamente.
      </p>

      <ul className="space-y-4">
        {PROMISES.map((promise) => {
          const party = PARTIES.find((item) => item.id === promise.partidoId);
          const hasExecutionEvidence = promise.evidencias.some(
            (evidence) =>
              evidence.tipo === "evidencia_execucao" ||
              evidence.tipo === "evidencia_institucional" ||
              evidence.tipo === "evidencia_legal" ||
              evidence.tipo === "evidencia_orcamental",
          );
          return (
            <li key={promise.id} className="border border-rule bg-card rounded-lg p-5">
              <div className="text-xs text-muted-foreground">
                <span style={{ color: party?.cor }}>● {party?.sigla ?? promise.partidoId}</span> ·{" "}
                {promise.area}
              </div>
              <h3 className="font-display text-lg font-semibold mt-1">{promise.titulo}</h3>
              {!hasExecutionEvidence && (
                <p className="text-sm text-muted-foreground mt-3 border border-rule bg-paper rounded p-3">
                  Esta promessa ainda só tem fonte de existência documental. Não há evidência de
                  execução ou cumprimento associada.
                </p>
              )}
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                {groupEvidence(promise.evidencias).map(({ type, items }) => (
                  <section key={type} className="border border-rule rounded p-3">
                    <h4 className="font-medium text-sm">{EVIDENCE_TYPE_LABEL[type]}</h4>
                    {items.length > 0 ? (
                      <ul className="mt-2 space-y-2 text-sm">
                        {items.map((evidence) => (
                          <li key={evidence.id}>
                            <div className="font-medium">{evidence.titulo}</div>
                            <div className="text-xs text-muted-foreground">
                              {evidence.entidade} · {evidence.data ?? "sem data"} · consulta{" "}
                              {evidence.dataConsulta}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{evidence.nota}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Sem registo desta função documental.
                      </p>
                    )}
                  </section>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mt-3 border-t border-rule pt-2">
                Nota metodológica: {promise.notasMetodologicas}
              </p>
            </li>
          );
        })}
        {PROMISES.length === 0 && (
          <li className="border border-rule bg-card rounded-lg p-5 text-sm text-muted-foreground">
            Ainda não há promessas extraídas com evidências associadas. As fontes eleitorais gerais
            abaixo estão registadas como base documental, mas não são tratadas como prova de
            cumprimento.
          </li>
        )}
      </ul>

      <section className="mt-8 border border-rule bg-card rounded-lg p-5">
        <h2 className="font-display text-xl font-semibold">Fontes documentais registadas</h2>
        <ul className="mt-4 space-y-3">
          {DOCUMENTS.map((document) => (
            <li key={document.id} className="border-b border-rule pb-3 last:border-0 last:pb-0">
              <div className="font-medium">{document.titulo}</div>
              <div className="text-xs text-muted-foreground">
                Função: {document.tipo} · data de consulta {document.dataConsulta}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{document.notasMetodologicas}</p>
              {document.url && (
                <a
                  href={document.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Abrir fonte
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
