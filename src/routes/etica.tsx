import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/etica")({
  head: () => ({
    meta: [
      { title: "Ética e Neutralidade — Atlas" },
      {
        name: "description",
        content: "Princípios éticos, neutralidade e limitações do observatório.",
      },
    ],
  }),
  component: Page,
});

const principles = [
  "Não recomendar em quem votar.",
  "Não criar propaganda.",
  "Não favorecer partido.",
  "Não classificar cidadãos por orientação política sem consentimento explícito.",
  "Não guardar preferências políticas pessoais do utilizador por defeito.",
  "Não usar microtargeting político.",
  "Não apresentar conclusões absolutas.",
  "Usar sempre fontes públicas e verificáveis.",
  "Permitir revisão humana das classificações.",
  "Explicar claramente a metodologia.",
];

function Page() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Princípios</div>
      <h1 className="font-display text-4xl font-semibold mt-2">Ética, neutralidade e limitações</h1>
      <p className="text-muted-foreground mt-3">
        O Atlas é um instrumento de literacia democrática. A sua utilidade depende da neutralidade
        institucional e da prudência analítica.
      </p>

      <ul className="mt-8 space-y-3">
        {principles.map((p) => (
          <li key={p} className="flex gap-3 border-l-2 border-primary pl-4 py-1">
            <span className="text-foreground/90">{p}</span>
          </li>
        ))}
      </ul>

      <section className="mt-10 border border-rule bg-card rounded-lg p-6">
        <h2 className="font-display text-xl font-semibold mb-2">Limitações</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Os resultados apresentados resultam de classificação automática combinada com revisão
          humana. Estão sujeitos a erro, à disponibilidade documental e à interpretação
          metodológica. Em caso algum substituem trabalho jornalístico, científico ou institucional
          especializado.
        </p>
      </section>
    </div>
  );
}
