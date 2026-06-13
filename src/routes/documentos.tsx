import { createFileRoute } from "@tanstack/react-router";
import { DOCUMENTS, PARTIES } from "@/lib/politrace-data";

export const Route = createFileRoute("/documentos")({
  head: () => ({
    meta: [
      { title: "Documentos — Atlas" },
      { name: "description", content: "Repositório de documentos políticos analisados." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Repositório documental</h1>
      <p className="text-muted-foreground mt-2 mb-8">
        Fontes eleitorais e documentos públicos usados para construir a base verificável.
      </p>
      <ul className="space-y-3">
        {DOCUMENTS.map((d) => {
          const party = PARTIES.find((p) => p.id === d.partidoId);
          return (
            <li
              key={d.id}
              className="border border-rule bg-card rounded-lg p-5 flex flex-wrap items-baseline gap-3"
            >
              <div className="flex-1 min-w-[260px]">
                <h3 className="font-display text-lg font-semibold">{d.titulo}</h3>
                <div className="text-xs text-muted-foreground mt-1">
                  {d.tipo} · {d.fonte} · {d.data} · {d.paginas} páginas · {d.estadoRecolha}
                </div>
              </div>
              {party && (
                <span
                  className="text-xs px-2 py-0.5 rounded border border-border"
                  style={{ color: party.cor }}
                >
                  {party.sigla}
                </span>
              )}
              {d.url && (
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Abrir fonte
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
