import { createFileRoute } from "@tanstack/react-router";
import { PARTIES, PREPARED_AXES_NOTICE, PROMISES } from "@/lib/politrace-data";

export const Route = createFileRoute("/partidos")({
  head: () => ({
    meta: [
      { title: "Partidos — Atlas" },
      { name: "description", content: "Forças políticas analisadas no observatório." },
    ],
  }),
  component: Page,
});

const FORCE_TYPE_LABEL = {
  partido: "Partido",
  coligacao: "Coligação",
  grupo_cidadaos: "Grupo de cidadãos",
} as const;

const MADEIRA_SCOPE_LABEL = {
  regional: "Regional",
  nacional_com_presenca_regional: "Nacional com presença regional",
  local: "Local",
} as const;

function formatVoteCount(votes: number) {
  return new Intl.NumberFormat("pt-PT").format(votes);
}

function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Base de dados
        </div>
        <h1 className="font-display text-4xl font-semibold mt-2">Forças políticas</h1>
        <p className="text-muted-foreground mt-2">
          Forças identificadas em fontes eleitorais da Madeira. A família ideológica é uma
          classificação analítica, não oficial, e deve ser cruzada com documentos programáticos.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {PARTIES.map((p) => {
          const n = PROMISES.filter((x) => x.partidoId === p.id).length;
          return (
            <article key={p.id} className="border border-rule bg-card rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full grid place-items-center text-white font-display font-semibold"
                  style={{ background: p.cor }}
                >
                  {p.sigla}
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">{p.nome}</h2>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {p.espectro}
                  </div>
                </div>
              </div>
              <dl className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground text-xs">Promessas</dt>
                  <dd className="font-display text-2xl tabular-nums">{n}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Sigla</dt>
                  <dd className="font-medium">{p.sigla}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Confiança</dt>
                  <dd className="text-xs">{(p.classificacaoConfianca * 100).toFixed(0)}%</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-foreground/90 leading-relaxed">{p.descricao}</p>
              <div className="mt-4">
                <h3 className="text-sm font-medium">Eixos preparados para fase documental</h3>
                <p className="text-xs text-muted-foreground mt-1">{PREPARED_AXES_NOTICE}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.preparedDocumentaryAxes.map((axis) => (
                    <li
                      key={axis}
                      className="text-xs px-2 py-0.5 border border-border bg-paper rounded"
                    >
                      {axis}
                    </li>
                  ))}
                </ul>
              </div>
              {p.resultadoAutarquicasMadeira2025 && (
                <dl className="mt-4 grid grid-cols-3 gap-3 rounded border border-rule bg-paper p-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground text-xs">Autárquicas 2025</dt>
                    <dd className="font-medium">
                      {p.resultadoAutarquicasMadeira2025.percentagem.toFixed(2)}%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Votos</dt>
                    <dd className="font-medium tabular-nums">
                      {formatVoteCount(p.resultadoAutarquicasMadeira2025.votos)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Presidências</dt>
                    <dd className="font-medium tabular-nums">
                      {p.resultadoAutarquicasMadeira2025.presidencias}
                    </dd>
                  </div>
                </dl>
              )}
              <div className="mt-4 border-t border-rule pt-3 text-xs text-muted-foreground leading-relaxed">
                <div>
                  <strong>Tipo:</strong> {FORCE_TYPE_LABEL[p.tipoForca]} · <strong>Âmbito:</strong>{" "}
                  {MADEIRA_SCOPE_LABEL[p.ambitoMadeira]}
                </div>
                <div>
                  <strong>Família:</strong> {p.familiaIdeologica}
                </div>
                <div className="mt-1">{p.destaqueMadeira}</div>
                <div className="mt-1">{p.notas}</div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
