import { createFileRoute } from "@tanstack/react-router";
import { ELECTIONS, PROMISES } from "@/lib/politrace-data";

export const Route = createFileRoute("/eleicoes")({
  head: () => ({
    meta: [
      { title: "Eleições — Atlas" },
      { name: "description", content: "Ato eleitoral, âmbito e número de promessas associadas." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Eleições</h1>
      <p className="text-muted-foreground mt-2 mb-8">Cobertura por ato eleitoral.</p>
      <div className="border border-rule rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              <th className="text-left p-3">Eleição</th>
              <th className="text-left p-3">Tipo</th>
              <th className="text-left p-3">Âmbito</th>
              <th className="text-left p-3">Data</th>
              <th className="text-right p-3">Promessas</th>
            </tr>
          </thead>
          <tbody>
            {ELECTIONS.map((e) => (
              <tr key={e.id} className="border-t border-rule bg-card">
                <td className="p-3 font-medium">{e.nome}</td>
                <td className="p-3">{e.tipo}</td>
                <td className="p-3">{e.ambito}</td>
                <td className="p-3 tabular-nums">{e.data}</td>
                <td className="p-3 text-right tabular-nums">
                  {PROMISES.filter((p) => p.eleicaoId === e.id).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
