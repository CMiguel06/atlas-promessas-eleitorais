import { createFileRoute } from "@tanstack/react-router";
import { PROMISES, PARTIES, POLICY_AREAS, STATUS_LABEL, ELECTIONS } from "@/lib/politrace-data";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — Atlas" },
      { name: "description", content: "Relatório académico exportável das promessas catalogadas." },
    ],
  }),
  component: Page,
});

function Page() {
  const today = new Date().toLocaleDateString("pt-PT");

  function exportTxt() {
    const lines: string[] = [];
    lines.push("Atlas — Relatório académico");
    lines.push(`Data: ${today}`);
    lines.push("");
    PROMISES.forEach((p) => {
      const party = PARTIES.find((x) => x.id === p.partidoId)!;
      lines.push(`• ${p.titulo}`);
      lines.push(
        `  ${party.sigla} | ${p.area} | ${STATUS_LABEL[p.status]} | mens. ${p.mensurabilidade}/5`,
      );
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "atlas-relatorio.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const sections = [
    [
      "1. Introdução",
      "O presente relatório consolida a análise documental conduzida pelo Atlas, observatório académico de promessas eleitorais.",
    ],
    [
      "2. Objetivo",
      "Promover transparência democrática através da identificação, classificação e monitorização de compromissos políticos públicos.",
    ],
    [
      "3. Fontes analisadas",
      `${ELECTIONS.length} atos eleitorais; corpus documental composto por programas eleitorais, programas de governo, debates, comunicados e orçamentos.`,
    ],
    [
      "4. Metodologia",
      "Deteção heurística de promessas, classificação por área temática, avaliação de mensurabilidade (1–5) e atribuição de estado de cumprimento com nível de confiança documental.",
    ],
    ["5. Promessas identificadas", `Total: ${PROMISES.length}.`],
    [
      "6. Classificação por área política",
      POLICY_AREAS.filter((a) => PROMISES.some((p) => p.area === a))
        .map((a) => `${a}: ${PROMISES.filter((p) => p.area === a).length}`)
        .join(" · "),
    ],
    [
      "7. Mensurabilidade",
      `Média: ${(PROMISES.reduce((a, p) => a + p.mensurabilidade, 0) / PROMISES.length).toFixed(2)} em 5.`,
    ],
    [
      "8. Estado de cumprimento",
      Object.entries(STATUS_LABEL)
        .map(([k, v]) => `${v}: ${PROMISES.filter((p) => p.status === k).length}`)
        .join(" · "),
    ],
    [
      "9. Evidências consultadas",
      `${PROMISES.reduce((a, p) => a + p.evidencias.length, 0)} referências documentais associadas.`,
    ],
    [
      "10. Análise ideológica documental",
      "Leitura prudente apresentada na secção “Análise Ideológica”, com excertos, confiança e limitação.",
    ],
    [
      "11. Limitações",
      "Corpus documental finito; classificação heurística sujeita a revisão humana; nenhum juízo de valor é emitido sobre atores políticos.",
    ],
    [
      "12. Conclusões",
      "O relatório fornece um instantâneo verificável do estado das promessas, fomentando literacia democrática e investigação académica.",
    ],
  ] as const;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Relatório técnico
          </div>
          <h1 className="font-display text-4xl font-semibold mt-2">Relatório académico</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerado em {today}</p>
        </div>
        <button
          onClick={exportTxt}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          Exportar (.txt)
        </button>
      </div>

      <article className="prose-academic space-y-6">
        {sections.map(([t, d]) => (
          <section key={t}>
            <h2 className="font-display text-xl font-semibold border-b border-rule pb-1 mb-2">
              {t}
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90">{d}</p>
          </section>
        ))}
      </article>
    </div>
  );
}
