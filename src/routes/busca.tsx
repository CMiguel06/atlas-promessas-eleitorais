import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  DOCUMENTS,
  PARTIES,
  PREPARED_AXES_NOTICE,
  PREPARED_DOCUMENTARY_AXES,
  PROMISES,
  TYPE_LABEL,
} from "@/lib/politrace-data";
import { AreaBadge, StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/busca")({
  head: () => ({
    meta: [
      { title: "Motor de busca — Atlas" },
      { name: "description", content: "Pesquisa em promessas, documentos, fontes e eixos." },
    ],
  }),
  component: Page,
});

const SEARCH_SUGGESTIONS = [
  "habitação",
  "saúde",
  "mobilidade",
  "ambiente",
  "educação",
  "fiscalidade",
  "administração pública",
  "transparência",
  "juventude",
  "turismo",
  "ciência",
  "tecnologia",
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function Page() {
  const [q, setQ] = useState("");
  const norm = normalize(q.trim());

  const promiseResults = !norm
    ? []
    : PROMISES.filter((promise) => {
        const party = PARTIES.find((item) => item.id === promise.partidoId);
        const document = DOCUMENTS.find((item) => item.id === promise.documentoId);
        const evidenceText = promise.evidencias
          .map((evidence) =>
            [
              evidence.tipo,
              evidence.titulo,
              evidence.descricao,
              evidence.entidade,
              evidence.data,
              evidence.nota,
            ].join(" "),
          )
          .join(" ");
        return normalize(
          [
            promise.titulo,
            promise.textoNormalizado,
            promise.textoOriginal,
            promise.area,
            promise.eixo,
            promise.status,
            promise.faseValidacao,
            promise.avaliacaoCumprimento,
            promise.dataDocumento,
            promise.dataConsulta,
            promise.notasMetodologicas,
            party?.sigla,
            party?.nome,
            document?.titulo,
            document?.fonte,
            evidenceText,
          ].join(" "),
        ).includes(norm);
      });

  const documentResults = !norm
    ? []
    : DOCUMENTS.filter((document) =>
        normalize(
          [
            document.titulo,
            document.tipo,
            document.fonte,
            document.data,
            document.dataConsulta,
            document.estadoRecolha,
            document.notasMetodologicas,
          ].join(" "),
        ).includes(norm),
      );

  const axisResults = !norm
    ? []
    : PREPARED_DOCUMENTARY_AXES.filter((axis) => normalize(axis).includes(norm));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Motor de busca</h1>
      <p className="text-muted-foreground mt-2 mb-6">
        Pesquisa em promessas, documentos, fontes, notas metodológicas, evidências e eixos
        preparados. Resultados de eixos não são promessas validadas.
      </p>
      <input
        autoFocus
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Ex.: habitação, saúde, mobilidade, transparência"
        className="w-full px-4 py-3 border border-border bg-card rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {SEARCH_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setQ(suggestion)}
            className="text-xs px-2 py-1 rounded border border-border bg-card hover:bg-secondary"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        {norm
          ? `${promiseResults.length} promessa(s), ${documentResults.length} documento(s), ${axisResults.length} eixo(s)`
          : "Comece a escrever para pesquisar."}
      </div>

      {promiseResults.length > 0 && (
        <section className="mt-6">
          <h2 className="font-display text-xl font-semibold mb-3">Promessas validadas</h2>
          <ul className="space-y-3">
            {promiseResults.map((promise) => {
              const party = PARTIES.find((item) => item.id === promise.partidoId);
              return (
                <li key={promise.id} className="border border-rule bg-card rounded-lg p-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-medium">{promise.titulo}</h3>
                    <StatusBadge status={promise.status} />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs mt-2 items-center">
                    <span style={{ color: party?.cor }}>● {party?.sigla ?? promise.partidoId}</span>
                    <AreaBadge area={promise.area} />
                    <span className="text-muted-foreground">{TYPE_LABEL[promise.tipo]}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {documentResults.length > 0 && (
        <section className="mt-6">
          <h2 className="font-display text-xl font-semibold mb-3">Documentos e fontes</h2>
          <ul className="space-y-3">
            {documentResults.map((document) => (
              <li key={document.id} className="border border-rule bg-card rounded-lg p-4">
                <h3 className="font-medium">{document.titulo}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {document.tipo} · {document.fonte} · consulta {document.dataConsulta}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{document.notasMetodologicas}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {axisResults.length > 0 && (
        <section className="mt-6 border border-rule bg-card rounded-lg p-4">
          <h2 className="font-display text-xl font-semibold mb-2">
            Eixos preparados para fase documental
          </h2>
          <p className="text-sm text-muted-foreground mb-3">{PREPARED_AXES_NOTICE}</p>
          <ul className="flex flex-wrap gap-2">
            {axisResults.map((axis) => (
              <li key={axis} className="text-xs px-2 py-1 border border-border bg-paper rounded">
                {axis}
              </li>
            ))}
          </ul>
        </section>
      )}

      {norm &&
        promiseResults.length === 0 &&
        documentResults.length === 0 &&
        axisResults.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            Sem resultados no corpus validado. Isto não significa ausência de promessa; significa
            que ainda não foi recolhida e revista.
          </p>
        )}
    </div>
  );
}
