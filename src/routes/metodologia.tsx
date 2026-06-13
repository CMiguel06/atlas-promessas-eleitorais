import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia — Atlas" },
      {
        name: "description",
        content: "Metodologia de identificação, classificação e monitorização de promessas.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Documentação
        </div>
        <h1 className="font-display text-4xl font-semibold mt-2">Metodologia</h1>
      </header>

      {[
        {
          t: "1. Recolha",
          d: "Documentos políticos públicos: programas eleitorais, programas de governo, discursos, debates transcritos, comunicados, propostas legislativas, orçamentos e relatórios oficiais.",
        },
        {
          t: "2. Deteção de promessas",
          d: "Identificação heurística de excertos com estrutura compromissória (verbo de ação + objeto programático), seguida de normalização linguística.",
        },
        {
          t: "3. Classificação",
          d: "Cada promessa é etiquetada por área política, tipo (mensurável, com prazo, legislativa, orçamental, institucional, vaga, ideológica, retórica) e grau de mensurabilidade (1–5).",
        },
        {
          t: "4. Estado de cumprimento",
          d: "Atribuído com base em evidências documentais públicas e nível de confiança quantificado.",
        },
        {
          t: "5. Revisão humana",
          d: "Todas as classificações são revisíveis. O sistema apresenta sinais e excertos, nunca conclusões absolutas.",
        },
        {
          t: "6. Análise ideológica",
          d: "Leitura documental prudente em eixos programáticos, sempre acompanhada de excertos de suporte e aviso de limitação.",
        },
      ].map((s) => (
        <section key={s.t}>
          <h2 className="font-display text-xl font-semibold mb-2">{s.t}</h2>
          <p className="text-foreground/90 leading-relaxed">{s.d}</p>
        </section>
      ))}
    </div>
  );
}
