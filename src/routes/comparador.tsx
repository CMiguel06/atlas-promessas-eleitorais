import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DOCUMENTS, PARTIES, POLICY_AREAS, PROMISES } from "@/lib/politrace-data";

export const Route = createFileRoute("/comparador")({
  head: () => ({
    meta: [
      { title: "Comparador — Atlas" },
      { name: "description", content: "Comparação documental limitada ao corpus validado." },
    ],
  }),
  component: Page,
});

function getPartySnapshot(partyId: string) {
  const promises = PROMISES.filter((promise) => promise.partidoId === partyId);
  const documents = DOCUMENTS.filter((document) => document.partidoId === partyId);
  const areas = new Set(promises.map((promise) => promise.area));
  const validationPhases = new Set(promises.map((promise) => promise.faseValidacao));
  const measurablePromises = promises.filter((promise) => promise.mensurabilidade > 0);
  const averageMensurability =
    measurablePromises.length > 0
      ? (
          measurablePromises.reduce((total, promise) => total + promise.mensurabilidade, 0) /
          measurablePromises.length
        ).toFixed(2)
      : "n/a";

  return {
    promises,
    documentCount: documents.length,
    areaCount: areas.size,
    validationPhaseCount: validationPhases.size,
    averageMensurability,
  };
}

function Page() {
  const [a, setA] = useState(PARTIES[0].id);
  const [b, setB] = useState(PARTIES[1].id);

  const pa = PARTIES.find((party) => party.id === a)!;
  const pb = PARTIES.find((party) => party.id === b)!;
  const snapshotA = getPartySnapshot(a);
  const snapshotB = getPartySnapshot(b);
  const max = Math.max(1, snapshotA.promises.length, snapshotB.promises.length);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Comparador documental</h1>
      <p className="text-muted-foreground mt-2 mb-4">
        Compara apenas a amostra validada, sem sugerir rankings partidários ou conclusões globais.
      </p>
      <p className="border border-rule bg-card rounded-lg p-4 text-sm text-muted-foreground mb-8">
        Comparação limitada ao corpus actualmente validado. A ausência de promessas numa área pode
        reflectir falta de recolha documental, não ausência de compromisso político.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <select
          value={a}
          onChange={(event) => setA(event.target.value)}
          className="px-3 py-2 rounded border border-border bg-card"
        >
          {PARTIES.map((party) => (
            <option key={party.id} value={party.id}>
              {party.sigla} — {party.nome}
            </option>
          ))}
        </select>
        <select
          value={b}
          onChange={(event) => setB(event.target.value)}
          className="px-3 py-2 rounded border border-border bg-card"
        >
          {PARTIES.map((party) => (
            <option key={party.id} value={party.id}>
              {party.sigla} — {party.nome}
            </option>
          ))}
        </select>
      </div>

      <section className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { party: pa, snapshot: snapshotA },
          { party: pb, snapshot: snapshotB },
        ].map(({ party, snapshot }) => (
          <article key={party.id} className="border border-rule bg-card rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full" style={{ background: party.cor }} />
              <h2 className="font-display text-xl font-semibold">{party.sigla}</h2>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs">Promessas recolhidas</dt>
                <dd className="font-display text-2xl tabular-nums">{snapshot.promises.length}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Áreas cobertas</dt>
                <dd className="font-display text-2xl tabular-nums">{snapshot.areaCount}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Documentos da força</dt>
                <dd className="font-display text-2xl tabular-nums">{snapshot.documentCount}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Eixos preparados</dt>
                <dd className="font-display text-2xl tabular-nums">
                  {party.preparedDocumentaryAxes.length}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Estados de validação</dt>
                <dd className="font-display text-2xl tabular-nums">
                  {snapshot.validationPhaseCount}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Mensurabilidade média</dt>
                <dd className="font-display text-2xl tabular-nums">
                  {snapshot.averageMensurability}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <section className="border border-rule bg-card rounded-lg p-6">
        <div className="flex justify-between text-xs font-medium mb-4">
          <span style={{ color: pa.cor }}>● {pa.sigla}</span>
          <span style={{ color: pb.cor }}>{pb.sigla} ●</span>
        </div>
        <ul className="space-y-1.5">
          {POLICY_AREAS.map((area) => {
            const countA = snapshotA.promises.filter((promise) => promise.area === area).length;
            const countB = snapshotB.promises.filter((promise) => promise.area === area).length;
            return (
              <li key={area} className="grid grid-cols-[1fr_180px_1fr] items-center gap-3 text-sm">
                <div className="flex items-center gap-2 justify-end">
                  <span className="tabular-nums text-xs text-muted-foreground w-4 text-right">
                    {countA}
                  </span>
                  <div
                    className="h-3 rounded-l"
                    style={{
                      width: `${(countA / max) * 100}%`,
                      background: pa.cor,
                      minWidth: countA ? 4 : 0,
                    }}
                  />
                </div>
                <div className="text-center text-xs text-muted-foreground">{area}</div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 rounded-r"
                    style={{
                      width: `${(countB / max) * 100}%`,
                      background: pb.cor,
                      minWidth: countB ? 4 : 0,
                    }}
                  />
                  <span className="tabular-nums text-xs text-muted-foreground w-4">{countB}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
