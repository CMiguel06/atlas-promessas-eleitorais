import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PARTIES, PROMISES, POLICY_AREAS } from "@/lib/politrace-data";

export const Route = createFileRoute("/comparador")({
  head: () => ({
    meta: [
      { title: "Comparador — Atlas" },
      { name: "description", content: "Comparação documental entre forças políticas." },
    ],
  }),
  component: Page,
});

function Page() {
  const [a, setA] = useState(PARTIES[0].id);
  const [b, setB] = useState(PARTIES[1].id);

  const distA = POLICY_AREAS.map(
    (area) => PROMISES.filter((p) => p.partidoId === a && p.area === area).length,
  );
  const distB = POLICY_AREAS.map(
    (area) => PROMISES.filter((p) => p.partidoId === b && p.area === area).length,
  );
  const max = Math.max(1, ...distA, ...distB);
  const pa = PARTIES.find((p) => p.id === a)!;
  const pb = PARTIES.find((p) => p.id === b)!;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Comparador documental</h1>
      <p className="text-muted-foreground mt-2 mb-8">
        Distribuição de promessas por área, sem juízo de valor.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <select
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="px-3 py-2 rounded border border-border bg-card"
        >
          {PARTIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.sigla} — {p.nome}
            </option>
          ))}
        </select>
        <select
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="px-3 py-2 rounded border border-border bg-card"
        >
          {PARTIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.sigla} — {p.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-rule bg-card rounded-lg p-6">
        <div className="flex justify-between text-xs font-medium mb-4">
          <span style={{ color: pa.cor }}>● {pa.sigla}</span>
          <span style={{ color: pb.cor }}>{pb.sigla} ●</span>
        </div>
        <ul className="space-y-1.5">
          {POLICY_AREAS.map((area, i) => (
            <li key={area} className="grid grid-cols-[1fr_180px_1fr] items-center gap-3 text-sm">
              <div className="flex items-center gap-2 justify-end">
                <span className="tabular-nums text-xs text-muted-foreground w-4 text-right">
                  {distA[i]}
                </span>
                <div
                  className="h-3 rounded-l"
                  style={{
                    width: `${(distA[i] / max) * 100}%`,
                    background: pa.cor,
                    minWidth: distA[i] ? 4 : 0,
                  }}
                />
              </div>
              <div className="text-center text-xs text-muted-foreground">{area}</div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 rounded-r"
                  style={{
                    width: `${(distB[i] / max) * 100}%`,
                    background: pb.cor,
                    minWidth: distB[i] ? 4 : 0,
                  }}
                />
                <span className="tabular-nums text-xs text-muted-foreground w-4">{distB[i]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
