import { createFileRoute } from "@tanstack/react-router";
import { PROMISES, PARTIES } from "@/lib/politrace-data";

export const Route = createFileRoute("/evidencias")({
  head: () => ({
    meta: [
      { title: "Evidências — Atlas" },
      {
        name: "description",
        content: "Fontes e evidências associadas a cada promessa catalogada.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const items = PROMISES.filter((p) => p.evidencias.length > 0);
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Evidências e fontes</h1>
      <p className="text-muted-foreground mt-2 mb-8">
        Documentação verificável que sustenta a classificação do estado de cumprimento.
      </p>
      <ul className="space-y-4">
        {items.map((p) => {
          const party = PARTIES.find((x) => x.id === p.partidoId)!;
          return (
            <li key={p.id} className="border border-rule bg-card rounded-lg p-5">
              <div className="text-xs text-muted-foreground">
                <span style={{ color: party.cor }}>● {party.sigla}</span> · {p.area}
              </div>
              <h3 className="font-display text-lg font-semibold mt-1">{p.titulo}</h3>
              <ul className="mt-3 space-y-1 text-sm">
                {p.evidencias.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span className="text-muted-foreground">→</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
              {p.notas && (
                <p className="text-xs text-muted-foreground italic mt-3 border-t border-rule pt-2">
                  Nota metodológica: {p.notas}
                </p>
              )}
            </li>
          );
        })}
        {items.length === 0 && (
          <li className="border border-rule bg-card rounded-lg p-5 text-sm text-muted-foreground">
            Ainda não há evidências associadas a promessas, porque o corpus de promessas está por
            validar. As fontes eleitorais gerais já estão registadas em Documentos.
          </li>
        )}
      </ul>
    </div>
  );
}
