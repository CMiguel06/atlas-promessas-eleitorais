import { createFileRoute } from "@tanstack/react-router";
import {
  CORPUS_METHODOLOGY_NOTICE,
  DOCUMENTS,
  ELECTIONS,
  PARTIES,
  POLICY_AREAS,
  PREPARED_AXES_NOTICE,
  PREPARED_DOCUMENTARY_AXES,
  PROMISES,
  SOURCES,
  STATUS_LABEL,
  STATUS_TOKEN,
  type PromiseStatus,
} from "@/lib/politrace-data";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Atlas" },
      {
        name: "description",
        content: "Visão agregada do corpus documental validado e da preparação metodológica.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const total = PROMISES.length;
  const byStatus = Object.keys(STATUS_LABEL).map((s) => ({
    s: s as PromiseStatus,
    n: PROMISES.filter((p) => p.status === s).length,
  }));
  const byArea = POLICY_AREAS.map((area) => ({
    area,
    n: PROMISES.filter((p) => p.area === area).length,
  })).filter((item) => item.n > 0);
  const verifiedDocuments = DOCUMENTS.filter((document) => document.estadoRecolha === "verificado");

  const summary = [
    { label: "Promessas no corpus inicial validado", value: total },
    { label: "Fontes documentais registadas", value: Object.keys(SOURCES).length },
    { label: "Partidos/candidaturas registadas", value: PARTIES.length },
    { label: "Eleições registadas", value: ELECTIONS.length },
    { label: "Áreas/eixos preparados", value: PREPARED_DOCUMENTARY_AXES.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Visão geral documental
        </div>
        <h1 className="font-display text-4xl font-semibold mt-2">Dashboard analítico</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">{CORPUS_METHODOLOGY_NOTICE}</p>
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {summary.map((item) => (
          <div key={item.label} className="border border-rule bg-card p-5 rounded-lg">
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {item.label}
            </div>
            <div className="font-display text-3xl font-semibold mt-2 tabular-nums">
              {item.value}
            </div>
          </div>
        ))}
      </section>

      <section className="border border-rule bg-card rounded-lg p-6 mb-8">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Amostra inicial validada
        </div>
        <h2 className="font-display text-2xl font-semibold mt-2">Corpus documental em validação</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-4xl">
          O projecto já contém atos eleitorais, forças políticas, fontes eleitorais e documentos
          registados. Nenhuma promessa é adicionada sem documento oficial verificável, URL, data de
          consulta e nota metodológica. A ausência de promessas neste momento reflecte contenção
          metodológica, não ausência de compromissos políticos.
        </p>
        {total < 5 && (
          <p className="mt-4 text-sm border border-rule bg-paper rounded p-3 text-muted-foreground">
            Aviso metodológico: o número de promessas validadas é baixo ou nulo. Não devem ser
            retiradas conclusões globais sobre cumprimento, distribuição temática ou comparação
            partidária.
          </p>
        )}
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="border border-rule bg-card rounded-lg p-6">
          <h2 className="font-display text-xl font-semibold mb-4">Distribuição por estado</h2>
          <ul className="space-y-2">
            {byStatus.map(({ s, n }) => (
              <li key={s} className="flex items-center gap-3">
                <div className="w-52">
                  <StatusBadge status={s} />
                </div>
                <div className="flex-1 h-2 bg-secondary rounded">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: total ? `${(n / total) * 100}%` : "0%",
                      background: `var(--${STATUS_TOKEN[s]})`,
                    }}
                  />
                </div>
                <span className="text-sm tabular-nums w-8 text-right">{n}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-rule bg-card rounded-lg p-6">
          <h2 className="font-display text-xl font-semibold mb-4">Documentos verificados</h2>
          <ul className="space-y-3 text-sm">
            {verifiedDocuments.map((document) => (
              <li key={document.id} className="border-b border-rule pb-3 last:border-0 last:pb-0">
                <div className="font-medium">{document.titulo}</div>
                <div className="text-xs text-muted-foreground">
                  {document.tipo} · consulta {document.dataConsulta}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-rule bg-card rounded-lg p-6 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-xl font-semibold">
                Eixos preparados para fase documental
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{PREPARED_AXES_NOTICE}</p>
            </div>
            <span className="text-sm tabular-nums text-muted-foreground">
              {PREPARED_DOCUMENTARY_AXES.length} eixos
            </span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {PREPARED_DOCUMENTARY_AXES.map((axis) => (
              <li key={axis} className="text-xs px-2 py-1 border border-border bg-paper rounded">
                {axis}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-rule bg-card rounded-lg p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-semibold mb-4">Promessas por força política</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PARTIES.map((party) => {
              const count = PROMISES.filter((promise) => promise.partidoId === party.id).length;
              return (
                <div key={party.id} className="p-4 rounded border border-rule">
                  <div className="w-3 h-3 rounded-full mb-2" style={{ background: party.cor }} />
                  <div className="font-medium">{party.sigla}</div>
                  <div className="text-xs text-muted-foreground">{party.nome}</div>
                  <div className="font-display text-2xl mt-2 tabular-nums">{count}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {party.preparedDocumentaryAxes.length} eixos preparados
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border border-rule bg-card rounded-lg p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-semibold mb-4">Áreas com promessas extraídas</h2>
          {byArea.length > 0 ? (
            <ul className="space-y-2">
              {byArea.map(({ area, n }) => (
                <li key={area} className="flex items-center gap-3">
                  <span className="w-56 text-sm">{area}</span>
                  <div className="flex-1 h-2 bg-secondary rounded">
                    <div className="h-2 rounded bg-primary" style={{ width: `${n * 100}%` }} />
                  </div>
                  <span className="text-sm tabular-nums w-8 text-right">{n}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sem promessas classificadas por área nesta fase. Os eixos acima são apenas estrutura
              de preparação documental.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
