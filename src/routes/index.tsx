import { createFileRoute, Link } from "@tanstack/react-router";
import { PROMISES, PARTIES, DOCUMENTS, ELECTIONS, STATUS_LABEL } from "@/lib/politrace-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas — Observatório Digital de Promessas Eleitorais" },
      {
        name: "description",
        content:
          "Identifique, classifique e monitorize promessas eleitorais com transparência académica.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const stats = [
    { v: PROMISES.length, l: "Promessas catalogadas" },
    { v: PARTIES.length, l: "Forças políticas" },
    { v: DOCUMENTS.length, l: "Documentos analisados" },
    { v: ELECTIONS.length, l: "Eleições cobertas" },
  ];

  return (
    <div>
      <section className="border-b border-rule bg-paper">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6">
              Protótipo académico · Engenharia Informática
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-semibold leading-[1.02] tracking-tight">
              Observar promessas.
              <br />
              <span className="italic text-primary">Medir cumprimento.</span>
              <br />
              Documentar a democracia.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              O Atlas é uma plataforma cívica e académica para identificar, classificar e
              monitorizar promessas eleitorais e compromissos políticos presentes em documentos
              públicos — com fontes verificáveis, metodologia explícita e neutralidade
              institucional.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90"
              >
                Abrir Dashboard
              </Link>
              <Link
                to="/promessa-ou-fumo"
                className="px-5 py-3 rounded-md border border-border bg-card font-medium hover:bg-secondary"
              >
                Testar “Promessa ou Fumo?”
              </Link>
              <Link
                to="/metodologia"
                className="px-5 py-3 rounded-md text-foreground font-medium hover:underline"
              >
                Ler metodologia →
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="border border-rule bg-card p-6 rounded-lg">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                Resumo
              </div>
              <dl className="space-y-3">
                {stats.map((s) => (
                  <div
                    key={s.l}
                    className="flex items-baseline justify-between border-b border-rule pb-2 last:border-0"
                  >
                    <dt className="text-sm text-muted-foreground">{s.l}</dt>
                    <dd className="font-display text-2xl font-semibold tabular-nums">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              t: "Pesquisa estruturada",
              d: "Motor de busca por área, partido, eleição, mensurabilidade e estado de cumprimento.",
            },
            {
              t: "Classificação documental",
              d: "Deteção de promessas, tipo, prazo e métrica associada — sempre revisível por mão humana.",
            },
            {
              t: "Análise ideológica prudente",
              d: "Tendências documentais com excertos, nível de confiança e aviso explícito de limitação.",
            },
          ].map((c) => (
            <div key={c.t} className="border-l-2 border-primary pl-5">
              <h3 className="font-display text-xl font-semibold mb-2">{c.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-rule bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3">
              Estados de cumprimento
            </div>
            <h2 className="font-display text-3xl font-semibold mb-4">
              Oito estados, uma metodologia
            </h2>
            <p className="text-muted-foreground">
              Cada promessa percorre estados verificáveis, com evidências documentais e nível de
              confiança associado.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {Object.values(STATUS_LABEL).map((s) => (
              <li key={s} className="px-3 py-2 border border-rule rounded bg-paper">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
