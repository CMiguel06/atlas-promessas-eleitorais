import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PARTIES, IDEOLOGICAL_AXES, DOCUMENTS } from "@/lib/politrace-data";

export const Route = createFileRoute("/analise-ideologica")({
  head: () => ({
    meta: [
      { title: "Análise ideológica - Atlas" },
      { name: "description", content: "Análise documental prudente de tendências programáticas." },
    ],
  }),
  component: Page,
});

const FORCE_TYPE_LABEL = {
  partido: "Partido",
  coligacao: "Coligação",
  grupo_cidadaos: "Grupo de cidadãos",
} as const;

function Page() {
  const [partyId, setPartyId] = useState(PARTIES[0].id);
  const party = PARTIES.find((p) => p.id === partyId)!;
  const docs = DOCUMENTS.filter((d) => d.partidoId === partyId || !d.partidoId);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        Análise documental
      </div>
      <h1 className="font-display text-4xl font-semibold mt-2">Tendências ideológicas</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Esta página não usa pontuações simuladas. Mostra apenas uma classificação prudente por
        família política e o nível de confiança, até existir corpus programático suficiente para
        medir eixos com evidências.
      </p>

      <div className="mt-6">
        <select
          value={partyId}
          onChange={(e) => setPartyId(e.target.value)}
          className="px-3 py-2 rounded border border-border bg-card"
        >
          {PARTIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.sigla} — {p.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 border border-rule bg-card rounded-lg p-6">
        <h2 className="font-display text-xl font-semibold mb-1">{party.nome}</h2>
        <div className="text-xs text-muted-foreground mb-6">{party.espectro}</div>

        <dl className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="border border-rule rounded p-4">
            <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Família</dt>
            <dd className="font-medium mt-1">{party.familiaIdeologica}</dd>
          </div>
          <div className="border border-rule rounded p-4">
            <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Tipo</dt>
            <dd className="font-medium mt-1">{FORCE_TYPE_LABEL[party.tipoForca]}</dd>
          </div>
          <div className="border border-rule rounded p-4">
            <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Confiança</dt>
            <dd className="font-medium mt-1">{(party.classificacaoConfianca * 100).toFixed(0)}%</dd>
          </div>
        </dl>

        <div className="mt-6 text-sm leading-relaxed">
          <h3 className="font-medium mb-2">Nota metodológica</h3>
          <p className="text-muted-foreground">{party.notas}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Eixos preparados para fase documental</h3>
          <ul className="flex flex-wrap gap-2">
            {IDEOLOGICAL_AXES.map((axis) => (
              <li key={axis} className="text-xs px-2 py-0.5 border border-border bg-paper rounded">
                {axis}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-xs text-muted-foreground border-t border-rule pt-4 leading-relaxed">
          <strong>Fontes da entidade:</strong> {party.fontes.map((f) => f.label).join("; ")}.<br />
          <strong>Documentos gerais carregados:</strong> {docs.map((d) => d.titulo).join("; ")}.
          <br />
          <strong>Limite:</strong> ainda não há pontuação por eixo porque isso exigiria programas e
          promessas extraídas por documento, com revisão humana.
        </div>
      </div>
    </div>
  );
}
