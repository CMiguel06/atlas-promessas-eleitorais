import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  PROMISES,
  PARTIES,
  POLICY_AREAS,
  TYPE_LABEL,
  STATUS_LABEL,
  type PromiseStatus,
  type PolicyArea,
} from "@/lib/politrace-data";
import { StatusBadge, AreaBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/promessas")({
  head: () => ({
    meta: [
      { title: "Promessas — Atlas" },
      {
        name: "description",
        content: "Catálogo de promessas eleitorais classificadas por área, tipo e estado.",
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
    (p) =>
      (!area || p.area === area) &&
      (!status || p.status === status) &&
      (!partido || p.partidoId === partido),
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Catálogo</div>
        <h1 className="font-display text-4xl font-semibold mt-2">Promessas eleitorais</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {filtered.length} de {PROMISES.length} promessas correspondem aos filtros activos. Nesta
          versão, o catálogo só aceita promessas com documento de origem identificado.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-8">
        <select
          value={area}
          onChange={(e) => setArea(e.target.value as PolicyArea | "")}
          className="px-3 py-2 rounded border border-border bg-card text-sm"
        >
          <option value="">Todas as áreas</option>
          {POLICY_AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as PromiseStatus | "")}
          className="px-3 py-2 rounded border border-border bg-card text-sm"
        >
          <option value="">Todos os estados</option>
          {Object.entries(STATUS_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={partido}
          onChange={(e) => setPartido(e.target.value)}
          className="px-3 py-2 rounded border border-border bg-card text-sm"
        >
          <option value="">Todas as forças</option>
          {PARTIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.sigla} — {p.nome}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-4">
        {filtered.map((p) => {
          const party = PARTIES.find((x) => x.id === p.partidoId)!;
          return (
            <li key={p.id} className="border border-rule bg-card rounded-lg p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <h3 className="font-display text-lg font-semibold">{p.titulo}</h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="text-sm text-muted-foreground italic mb-3">“{p.textoOriginal}”</p>
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="font-medium" style={{ color: party.cor }}>
                  ● {party.sigla}
                </span>
                <AreaBadge area={p.area} />
                <span className="text-muted-foreground">{TYPE_LABEL[p.tipo]}</span>
                <span className="text-muted-foreground">
                  · mensurabilidade {p.mensurabilidade}/5
                </span>
                {p.prazo && <span className="text-muted-foreground">· prazo {p.prazo}</span>}
                <span className="text-muted-foreground">
                  · confiança {(p.confianca * 100).toFixed(0)}%
                </span>
                <Link to="/evidencias" className="ml-auto text-primary hover:underline">
                  Ver evidências →
                </Link>
              </div>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="text-center text-muted-foreground py-12">
            Ainda não há promessas validadas. A próxima etapa é recolher programas
            autárquicos/regionais e extrair compromissos com fonte, página e data.
          </li>
        )}
      </ul>
    </div>
  );
}
