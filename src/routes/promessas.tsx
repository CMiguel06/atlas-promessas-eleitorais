import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  COMPLIANCE_ASSESSMENT_LABEL,
  DOCUMENTS,
  PARTIES,
  POLICY_AREAS,
  PREPARED_AXES_NOTICE,
  PROMISES,
  STATUS_LABEL,
  TYPE_LABEL,
  VALIDATION_PHASE_LABEL,
  type PolicyArea,
  type PromiseStatus,
} from "@/lib/politrace-data";
import { AreaBadge, StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/promessas")({
  head: () => ({
    meta: [
      { title: "Promessas — Atlas" },
      {
        name: "description",
        content: "Catálogo de promessas eleitorais documentadas e metodologicamente validadas.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [area, setArea] = useState<PolicyArea | "">("");
  const [status, setStatus] = useState<PromiseStatus | "">("");
  const [partido, setPartido] = useState("");

  const filtered = PROMISES.filter(
    (promise) =>
      (!area || promise.area === area) &&
      (!status || promise.status === status) &&
      (!partido || promise.partidoId === partido),
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Catálogo</div>
        <h1 className="font-display text-4xl font-semibold mt-2">Promessas eleitorais</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          {filtered.length} de {PROMISES.length} promessas correspondem aos filtros activos. Cada
          entrada exige documento de origem, URL, data de consulta, excerto original e nota
          metodológica.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-8">
        <select
          value={area}
          onChange={(event) => setArea(event.target.value as PolicyArea | "")}
          className="px-3 py-2 rounded border border-border bg-card text-sm"
        >
          <option value="">Todas as áreas</option>
          {POLICY_AREAS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as PromiseStatus | "")}
          className="px-3 py-2 rounded border border-border bg-card text-sm"
        >
          <option value="">Todos os estados</option>
          {Object.entries(STATUS_LABEL).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <select
          value={partido}
          onChange={(event) => setPartido(event.target.value)}
          className="px-3 py-2 rounded border border-border bg-card text-sm"
        >
          <option value="">Todas as forças</option>
          {PARTIES.map((party) => (
            <option key={party.id} value={party.id}>
              {party.sigla} — {party.nome}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-4">
        {filtered.map((promise) => {
          const party = PARTIES.find((item) => item.id === promise.partidoId);
          const document = DOCUMENTS.find((item) => item.id === promise.documentoId);
          return (
            <li key={promise.id} className="border border-rule bg-card rounded-lg p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-display text-lg font-semibold">{promise.titulo}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {party?.sigla ?? promise.partidoId} · {document?.titulo ?? promise.documentoId}
                  </div>
                </div>
                <StatusBadge status={promise.status} />
              </div>
              <div className="grid lg:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">
                    Excerto original
                  </div>
                  <p className="italic text-muted-foreground">“{promise.textoOriginal}”</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">
                    Texto normalizado
                  </div>
                  <p>{promise.textoNormalizado}</p>
                </div>
              </div>
              <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mt-4">
                <div>
                  <dt className="text-muted-foreground">Área/eixo</dt>
                  <dd className="mt-1">
                    <AreaBadge area={promise.area} />
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Tipo</dt>
                  <dd className="font-medium mt-1">{TYPE_LABEL[promise.tipo]}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Validação</dt>
                  <dd className="font-medium mt-1">
                    {VALIDATION_PHASE_LABEL[promise.faseValidacao]}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Cumprimento</dt>
                  <dd className="font-medium mt-1">
                    {COMPLIANCE_ASSESSMENT_LABEL[promise.avaliacaoCumprimento]}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Data do documento</dt>
                  <dd className="font-medium mt-1">{promise.dataDocumento}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Data de consulta</dt>
                  <dd className="font-medium mt-1">{promise.dataConsulta}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Mensurabilidade</dt>
                  <dd className="font-medium mt-1">{promise.mensurabilidade}/5</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Fonte</dt>
                  <dd className="font-medium mt-1">
                    {promise.url ? (
                      <a
                        href={promise.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        Abrir URL
                      </a>
                    ) : (
                      "Sem URL"
                    )}
                  </dd>
                </div>
              </dl>
              <p className="text-xs text-muted-foreground border-t border-rule pt-3 mt-4">
                Nota metodológica: {promise.notasMetodologicas}
              </p>
              <Link
                to="/evidencias"
                className="inline-flex mt-3 text-sm text-primary hover:underline"
              >
                Ver evidências →
              </Link>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="border border-rule bg-card rounded-lg p-6 text-sm text-muted-foreground">
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Corpus em construção
            </h2>
            <p>
              Existem eixos preparados para recolha documental, mas ainda não há promessas extraídas
              de programas oficiais verificáveis. {PREPARED_AXES_NOTICE}
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}
