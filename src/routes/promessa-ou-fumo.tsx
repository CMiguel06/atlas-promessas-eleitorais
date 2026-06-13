import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/promessa-ou-fumo")({
  head: () => ({
    meta: [
      { title: "Promessa ou Fumo? — Atlas" },
      { name: "description", content: "Classificador documental de frases políticas." },
    ],
  }),
  component: Page,
});

interface Result {
  label: string;
  detail: string;
  confidence: number;
  signals: string[];
}

function classify(text: string): Result {
  const t = text.toLowerCase();
  const signals: string[] = [];

  const rawNumbers =
    /\b\d+([.,]\d+)?\s*(%|mil|milhões|milhoes|mil milhões|euros|€|fogos|profissionais|km|gw|mw|pontos)?\b/.test(
      t,
    );
  const decorativeNumber =
    /\b\d+\s+(razões para|razoes para|prioridades para|compromissos com|pilares de|eixos estratégicos|eixos estrategicos|áreas de intervenção|areas de intervencao)\b/.test(
      t,
    ) ||
    /\b\d+\s+medidas para um[a]?\s+\w+\s+(portugal|madeira|futuro)\b/.test(t) ||
    /\bmais de\s+\d+\s+anos de experiência\b/.test(t) ||
    /\bum dos\s+\d+\s+(países|paises|regiões|regioes)\s+mais\b/.test(t);
  const numbers = rawNumbers && !decorativeNumber;
  const deadline =
    /(até|antes de|durante|primeiro ano|primeiros? \w+ anos?|legislatura|mandato|202\d|203\d)/.test(
      t,
    );
  const legislative =
    /(lei|decreto|revisão|revisao|legislar|alterar|aprovar|projecto de lei|projeto de lei)/.test(t);
  const legalInstrumentNumbered =
    /\b(lei orgânica|lei organica|lei|decreto-lei|decreto lei|decreto legislativo regional|decreto regional|portaria|despacho|resolução do conselho de ministros|resolucao do conselho de ministros|resolução da assembleia da república|resolucao da assembleia da republica|resolução da assembleia legislativa da madeira|resolucao da assembleia legislativa da madeira)\s+n\.?\s*(º|o)?\s*\d+\/\d{4}(\/m)?\b/.test(
      t,
    );
  const legalActionInstrument =
    /\b(legislar|regulamentar|rever|alterar|aprovar|publicar|revogar|transpor|implementar|aplicar)\b.{0,80}\b(lei|decreto|portaria|despacho|regulamento|estatuto|código|codigo|regime jurídico|regime juridico|quadro legal)\b/.test(
      t,
    );
  const budget = /(orçamento|orcamento|investir|investimento|verba|dotação|dotacao|pib)/.test(t);
  const physicalAction =
    /\b(construir|edificar|reabilitar|requalificar)\s+(a|o|as|os|um|uma|novas?|novos?)?\s*(hospital|centro de saúde|centro de saude|escola|creche|habitação|habitacao|fogos|estrada|ponte|túnel|tunel|porto|aeroporto|linha|metro|ferrovia|infraestrutura|equipamento|bairro|edifício|edificio|residência|residencia)\b/.test(
      t,
    );
  const serviceAction =
    /\b(criar|lançar|lancar|abrir)\s+(o|a|um|uma|novo|nova)?\s*(programa|serviço|servico|gabinete|balcão|balcao|linha de apoio|plataforma|unidade|centro|escola|creche|hospital|posto|loja|fundo|agência|agencia)\s+[\wÀ-ÿ-]+/.test(
      t,
    );
  const indicatorAction =
    /\b(aumentar|reduzir|eliminar)\b.{0,60}(\d+([.,]\d+)?\s*(%|pontos|dias|meses|anos|euros|€)|taxa|tempo|prazo|listas? de espera|desemprego|emissões|emissoes|défice|defice|imposto|iva|irs|irc|renda|custo|dívida|divida)\b/.test(
      t,
    );
  const deliveryAction =
    /\b(concluir|terminar|entregar)\s+(a|o|as|os|um|uma)?\s*(obra|projecto|projeto|empreitada|hospital|escola|estrada|túnel|tunel|ponte|porto|aeroporto|metro|linha|infraestrutura)\b/.test(
      t,
    );
  const fundingAction =
    /\b(financiar|comparticipar|apoiar)\b.{0,60}((€|eur)\s*\d+|\d+([.,]\d+)?\s*(%|mil|milhões|milhoes|euros|€))\b/.test(
      t,
    );
  const guaranteeAction =
    /\bgarantir\b.{0,80}\b(direito|acesso|prestação|prestacao|licença|licenca)\b.{0,80}(\d+|lei|decreto|regime jurídico|regime juridico|quadro legal)\b/.test(
      t,
    );
  const concretePoliticalAction =
    physicalAction ||
    serviceAction ||
    indicatorAction ||
    deliveryAction ||
    fundingAction ||
    guaranteeAction;
  const vague =
    /(apostar|reforçar|reforcar|defender|promover|valorizar|melhorar|garantir uma|uma sociedade|um país|um pais)/.test(
      t,
    );
  const ideological =
    /(soberania|liberdade|justiça social|justica social|tradição|tradicao|identidade|patriotismo|igualdade)/.test(
      t,
    );
  const rhetoric =
    /(é tempo de|é hora de|hoje mais do que nunca|com coragem|de mãos dadas|virar a página)/.test(
      t,
    );

  if (rawNumbers) signals.push("contém número/quantificação");
  if (decorativeNumber) signals.push("número em enumeração retórica");
  if (deadline) signals.push("contém referência temporal/prazo");
  if (legislative) signals.push("vocabulário legislativo");
  if (legalInstrumentNumbered) signals.push("instrumento legal português identificável");
  if (legalActionInstrument) signals.push("verbo de ação combinado com instrumento legal");
  if (budget) signals.push("vocabulário orçamental");
  if (concretePoliticalAction) signals.push("verbo de ação com complemento concreto");
  if (vague) signals.push("verbo programático vago");
  if (ideological) signals.push("conteúdo ideológico");
  if (rhetoric) signals.push("estrutura retórica");

  if (decorativeNumber && !deadline && !legislative && !budget && !concretePoliticalAction)
    return {
      label: "Frase retórica",
      detail: "A enumeração numérica funciona como recurso discursivo, sem métrica operacional.",
      confidence: 0.74,
      signals,
    };
  if (legalInstrumentNumbered || legalActionInstrument)
    return {
      label: "Proposta mensurável com base legal",
      detail: "Refere instrumento legal português ou ação normativa verificável.",
      confidence: 0.84,
      signals,
    };
  if (numbers && deadline)
    return {
      label: "Proposta mensurável com prazo",
      detail: "Contém quantificação e janela temporal — promessa concreta e auditável.",
      confidence: 0.9,
      signals,
    };
  if (numbers)
    return {
      label: "Proposta mensurável",
      detail: "Contém quantificação mas não fixa prazo explícito.",
      confidence: 0.78,
      signals,
    };
  if (concretePoliticalAction)
    return {
      label: "Proposta mensurável",
      detail: "Usa verbo de ação política com complemento concreto verificável.",
      confidence: 0.8,
      signals,
    };
  if (deadline && (legislative || budget))
    return {
      label: "Compromisso com prazo",
      detail: "Compromisso institucional com janela temporal definida.",
      confidence: 0.74,
      signals,
    };
  if (legislative || budget)
    return {
      label: "Promessa institucional/legislativa",
      detail: "Compromisso de ação institucional sem métrica explícita.",
      confidence: 0.6,
      signals,
    };
  if (rhetoric && !vague && !ideological)
    return {
      label: "Frase retórica",
      detail: "Estrutura discursiva sem operacionalização.",
      confidence: 0.7,
      signals,
    };
  if (ideological)
    return {
      label: "Valor ideológico",
      detail: "Afirmação de valor — não operacionalizável como promessa concreta.",
      confidence: 0.72,
      signals,
    };
  if (vague)
    return {
      label: "Promessa vaga",
      detail: "Intenção programática sem métrica, prazo ou instrumento concreto.",
      confidence: 0.68,
      signals,
    };
  return {
    label: "Indeterminada",
    detail: "Sinais insuficientes para classificação automática.",
    confidence: 0.3,
    signals,
  };
}

const examples = [
  "Vamos contratar 5 000 profissionais de saúde até 2025.",
  "Apostar fortemente numa transição energética justa.",
  "É tempo de virar a página e construir um país melhor.",
  "Apresentaremos uma revisão da Lei de Bases da Educação.",
];

function Page() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  function run(t: string) {
    setText(t);
    setResult(t.trim().length > 4 ? classify(t) : null);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        Ferramenta heurística
      </div>
      <h1 className="font-display text-4xl font-semibold mt-2">Promessa ou Fumo?</h1>
      <p className="text-muted-foreground mt-2">
        Insira uma frase política. O sistema indica, de forma documental e prudente, se se trata de
        uma promessa concreta, vaga, ideológica, retórica, mensurável ou com prazo.
      </p>

      <textarea
        value={text}
        onChange={(e) => run(e.target.value)}
        rows={4}
        placeholder="Cole aqui uma frase de um programa, discurso ou comunicado…"
        className="mt-6 w-full px-4 py-3 border border-border bg-card rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="flex flex-wrap gap-2 mt-3">
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => run(ex)}
            className="text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:bg-secondary"
          >
            {ex.slice(0, 40)}…
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-8 border border-rule bg-card rounded-lg p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Classificação
          </div>
          <h2 className="font-display text-2xl font-semibold mt-1">{result.label}</h2>
          <p className="text-muted-foreground mt-2">{result.detail}</p>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-1">
              Confiança heurística: {(result.confidence * 100).toFixed(0)}%
            </div>
            <div className="h-2 bg-secondary rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
          </div>
          {result.signals.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {result.signals.map((s) => (
                <li key={s} className="text-xs px-2 py-0.5 border border-border bg-paper rounded">
                  {s}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 text-xs text-muted-foreground italic border-t border-rule pt-3">
            Esta classificação é heurística e documental. Não constitui juízo de valor sobre o
            emissor nem recomendação de voto. Revisão humana é sempre recomendada.
          </p>
        </div>
      )}
    </div>
  );
}
