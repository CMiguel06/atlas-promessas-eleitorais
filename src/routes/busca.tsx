import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PROMISES, PARTIES, TYPE_LABEL } from "@/lib/politrace-data";
import { StatusBadge, AreaBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/busca")({
  head: () => ({
    meta: [
      { title: "Motor de busca — Atlas" },
      { name: "description", content: "Pesquisa textual em promessas catalogadas." },
    ],
  }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const norm = q.trim().toLowerCase();
  const results = !norm
    ? []
    : PROMISES.filter((p) =>
        (p.titulo + " " + p.textoOriginal + " " + p.area).toLowerCase().includes(norm),
      );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Motor de busca</h1>
      <p className="text-muted-foreground mt-2 mb-6">
        Pesquisa textual em promessas catalogadas e validadas. O corpus de promessas da Madeira
        ainda está por recolher.
      </p>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ex.: habitação, IRC, transição energética…"
        className="w-full px-4 py-3 border border-border bg-card rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="mt-6 text-sm text-muted-foreground">
        {norm ? `${results.length} resultado(s)` : "Comece a escrever para pesquisar."}
      </div>
      <ul className="mt-4 space-y-3">
        {results.map((p) => {
          const party = PARTIES.find((x) => x.id === p.partidoId)!;
          return (
            <li key={p.id} className="border border-rule bg-card rounded-lg p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="font-medium">{p.titulo}</h3>
                <StatusBadge status={p.status} />
              </div>
              <div className="flex flex-wrap gap-2 text-xs mt-2 items-center">
                <span style={{ color: party.cor }}>● {party.sigla}</span>
                <AreaBadge area={p.area} />
                <span className="text-muted-foreground">{TYPE_LABEL[p.tipo]}</span>
              </div>
            </li>
          );
        })}
      </ul>
      {norm && results.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          Sem resultados no corpus validado. Isto não significa ausência de promessa; significa que
          ainda não foi recolhida e revista.
        </p>
      )}
    </div>
  );
}
