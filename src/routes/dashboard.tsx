import { createFileRoute } from "@tanstack/react-router";
import {
  PROMISES,
  PARTIES,
  POLICY_AREAS,
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
        content:
          "Visão agregada de promessas, estados de cumprimento e distribuição por área política.",
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
  const byArea = POLICY_AREAS.map((a) => ({ a, n: PROMISES.filter((p) => p.area === a).length }))
    .filter((x) => x.n > 0)
    .sort((x, y) => y.n - x.n);
  const byParty = PARTIES.map((p) => ({
    ...p,
    n: PROMISES.filter((pr) => pr.partidoId === p.id).length,
  }));
  const avgMens = total
    ? (PROMISES.reduce((a, p) => a + p.mensurabilidade, 0) / total).toFixed(2)
    : "n/a";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Visão geral</div>
        <h1 className="font-display text-4xl font-semibold mt-2">Dashboard analítico</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Indicadores agregados sobre o universo de promessas catalogadas. Nesta versão Madeira,
          promessas só entram depois de existir documento de origem validado.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { l: "Promessas", v: total },
          { l: "Mensurabilidade média", v: avgMens },
          { l: "Cumpridas", v: PROMISES.filter((p) => p.status === "cumprida").length },
          { l: "Não cumpridas", v: PROMISES.filter((p) => p.status === "nao_cumprida").length },
        ].map((k) => (
          <div key={k.l} className="border border-rule bg-card p-5 rounded-lg">
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{k.l}</div>
            <div className="font-display text-3xl font-semibold mt-2 tabular-nums">{k.v}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {total === 0 && (
          <section className="border border-rule bg-card rounded-lg p-6 lg:col-span-2">
            <h2 className="font-display text-xl font-semibold mb-2">
              Corpus de promessas por validar
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A base já contém forças políticas, eleições e fontes eleitorais da Madeira. O catálogo
              de promessas está vazio de propósito: a próxima fase é recolher programas
              autárquicos/regionais, guardar URL e data de consulta, e só depois extrair
              compromissos.
            </p>
          </section>
        )}
        <section className="border border-rule bg-card rounded-lg p-6">
          <h2 className="font-display text-xl font-semibold mb-4">Distribuição por estado</h2>
          <ul className="space-y-2">
            {byStatus.map(({ s, n }) => (
              <li key={s} className="flex items-center gap-3">
                <div className="w-44">
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
          <h2 className="font-display text-xl font-semibold mb-4">
            Áreas políticas mais frequentes
          </h2>
          <ul className="space-y-2">
            {byArea.map(({ a, n }) => (
              <li key={a} className="flex items-center gap-3">
                <span className="w-44 text-sm">{a}</span>
                <div className="flex-1 h-2 bg-secondary rounded">
                  <div
                    className="h-2 rounded bg-primary"
                    style={{ width: `${(n / byArea[0].n) * 100}%` }}
                  />
                </div>
                <span className="text-sm tabular-nums w-8 text-right">{n}</span>
              </li>
            ))}
            {byArea.length === 0 && (
              <li className="text-sm text-muted-foreground">
                Sem promessas classificadas por área nesta fase.
              </li>
            )}
          </ul>
        </section>

        <section className="border border-rule bg-card rounded-lg p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-semibold mb-4">Promessas por força política</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {byParty.map((p) => (
              <div key={p.id} className="p-4 rounded border border-rule">
                <div className="w-3 h-3 rounded-full mb-2" style={{ background: p.cor }} />
                <div className="font-medium">{p.sigla}</div>
                <div className="text-xs text-muted-foreground">{p.nome}</div>
                <div className="font-display text-2xl mt-2 tabular-nums">{p.n}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
