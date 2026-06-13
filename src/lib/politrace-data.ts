export type PromiseStatus =
  | "nao_iniciada"
  | "em_curso"
  | "parcial"
  | "cumprida"
  | "nao_cumprida"
  | "alterada"
  | "indeterminada"
  | "contestada";

export type PromiseType =
  | "mensuravel"
  | "com_prazo"
  | "legislativa"
  | "orcamental"
  | "institucional"
  | "vaga"
  | "ideologica"
  | "retorica";

export type PolicyArea =
  | "Saúde"
  | "Educação"
  | "Habitação"
  | "Economia"
  | "Fiscalidade"
  | "Segurança"
  | "Justiça"
  | "Ambiente"
  | "Energia"
  | "Transportes"
  | "Administração Pública"
  | "Trabalho"
  | "Segurança Social"
  | "Migração"
  | "Defesa"
  | "Europa"
  | "Autarquias"
  | "Juventude"
  | "Ciência e Tecnologia";

export const POLICY_AREAS: PolicyArea[] = [
  "Saúde",
  "Educação",
  "Habitação",
  "Economia",
  "Fiscalidade",
  "Segurança",
  "Justiça",
  "Ambiente",
  "Energia",
  "Transportes",
  "Administração Pública",
  "Trabalho",
  "Segurança Social",
  "Migração",
  "Defesa",
  "Europa",
  "Autarquias",
  "Juventude",
  "Ciência e Tecnologia",
];

export const STATUS_LABEL: Record<PromiseStatus, string> = {
  nao_iniciada: "Não iniciada",
  em_curso: "Em curso",
  parcial: "Parcialmente cumprida",
  cumprida: "Cumprida",
  nao_cumprida: "Não cumprida",
  alterada: "Alterada",
  indeterminada: "Indeterminada",
  contestada: "Contestada",
};

export const STATUS_TOKEN: Record<PromiseStatus, string> = {
  nao_iniciada: "status-not-started",
  em_curso: "status-in-progress",
  parcial: "status-partial",
  cumprida: "status-fulfilled",
  nao_cumprida: "status-broken",
  alterada: "status-altered",
  indeterminada: "status-unknown",
  contestada: "status-contested",
};

export const TYPE_LABEL: Record<PromiseType, string> = {
  mensuravel: "Mensurável",
  com_prazo: "Com prazo",
  legislativa: "Legislativa",
  orcamental: "Orçamental",
  institucional: "Institucional",
  vaga: "Programática vaga",
  ideologica: "Valor ideológico",
  retorica: "Retórica não operacionalizável",
};

export type IdeologicalFamily =
  | "esquerda"
  | "centro-esquerda"
  | "ecologista-transversal"
  | "regional-local"
  | "centro-direita"
  | "direita"
  | "direita-radical"
  | "indeterminado";

export interface SourceReference {
  label: string;
  url: string;
  checkedAt: string;
  note?: string;
}

export const SOURCES = {
  cneAlram2025: {
    label: "CNE - Eleição para a Assembleia Legislativa da Região Autónoma da Madeira 2025",
    url: "https://www.cne.pt/content/eleicao-para-assembleia-legislativa-da-regiao-autonoma-da-madeira-2025",
    checkedAt: "2026-05-09",
  },
  cneAlram2025Candidates: {
    label: "CNE - Listas definitivamente admitidas ALRAM 2025",
    url: "https://www.cne.pt/sites/default/files/dl/eleicoes/2025_alram/lista_candidatos/2025_alram_lista_candidatos.pdf",
    checkedAt: "2026-05-09",
  },
  cneAutarquicas2025: {
    label: "CNE - Eleições Autárquicas 2025",
    url: "https://www.cne.pt/content/eleicoes-autarquicas-2025",
    checkedAt: "2026-05-09",
  },
  rtpAutarquicasMadeira2025: {
    label: "RTP/SGMAI - Resultados Autárquicas 2025, distrito Madeira",
    url: "https://www.rtp.pt/eleicoes/autarquicas-resultados/2025/distrito-madeira/eleicao-CM/300000",
    checkedAt: "2026-05-09",
    note: "Resultados agregados para câmaras municipais na Madeira, com base na Administração Eleitoral.",
  },
} satisfies Record<string, SourceReference>;

export interface MadeiraAutarquicasResult {
  percentagem: number;
  votos: number;
  presidencias: number;
}

export interface Party {
  id: string;
  sigla: string;
  nome: string;
  cor: string;
  espectro: string;
  familiaIdeologica: IdeologicalFamily;
  tipoForca: "partido" | "coligacao" | "grupo_cidadaos";
  ambitoMadeira: "regional" | "nacional_com_presenca_regional" | "local";
  classificacaoConfianca: number;
  descricao: string;
  destaqueMadeira: string;
  resultadoAutarquicasMadeira2025?: MadeiraAutarquicasResult;
  notas: string;
  fontes: SourceReference[];
}

export const PARTIES: Party[] = [
  {
    id: "psd",
    sigla: "PPD/PSD",
    nome: "Partido Social Democrata",
    cor: "oklch(0.58 0.16 245)",
    espectro: "Centro-direita",
    familiaIdeologica: "centro-direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.86,
    descricao:
      "Partido nacional com implantação regional consolidada na Madeira e presença recorrente nos órgãos autárquicos e regionais.",
    destaqueMadeira:
      "Nas Autárquicas 2025 concorreu autonomamente em alguns municípios, além de integrar coligações locais noutros concelhos.",
    resultadoAutarquicasMadeira2025: { percentagem: 11.64, votos: 16179, presidencias: 2 },
    notas: "Força dominante histórica na Madeira; classificação ideológica analítica, não oficial.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "psd-cds",
    sigla: "PPD/PSD.CDS-PP",
    nome: "Coligação PSD/CDS-PP",
    cor: "oklch(0.6 0.15 235)",
    espectro: "Centro-direita / direita democrata-crista",
    familiaIdeologica: "centro-direita",
    tipoForca: "coligacao",
    ambitoMadeira: "regional",
    classificacaoConfianca: 0.84,
    descricao:
      "Coligação eleitoral entre PSD e CDS-PP usada em várias disputas autárquicas na Madeira.",
    destaqueMadeira:
      "Foi a força mais votada no agregado das câmaras municipais da Madeira nas Autárquicas 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 32.64, votos: 45353, presidencias: 4 },
    notas:
      "Coligação registada nos resultados autárquicos de 2025 em vários municípios da Madeira.",
    fontes: [SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "cds",
    sigla: "CDS-PP",
    nome: "CDS - Partido Popular",
    cor: "oklch(0.62 0.14 250)",
    espectro: "Direita democrata-crista",
    familiaIdeologica: "direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.86,
    descricao:
      "Partido nacional de matriz democrata-cristã e conservadora, com estrutura regional na Madeira.",
    destaqueMadeira:
      "Em 2025 surge tanto de forma autónoma como em coligação, consoante o ato eleitoral e o município.",
    resultadoAutarquicasMadeira2025: { percentagem: 2.83, votos: 3931, presidencias: 1 },
    notas: "Concorreu autonomamente na ALRAM 2025 e em resultados autárquicos agregados.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "ps",
    sigla: "PS",
    nome: "Partido Socialista",
    cor: "oklch(0.58 0.18 20)",
    espectro: "Centro-esquerda",
    familiaIdeologica: "centro-esquerda",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.88,
    descricao: "Partido nacional de centro-esquerda com presença regional e autárquica na Madeira.",
    destaqueMadeira:
      "No agregado das câmaras municipais da Madeira nas Autárquicas 2025 foi a terceira força em votos.",
    resultadoAutarquicasMadeira2025: { percentagem: 13.37, votos: 18577, presidencias: 2 },
    notas:
      "Classificação ideológica convencional; deve ser sempre separada das promessas concretas.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "jpp",
    sigla: "JPP",
    nome: "Juntos Pelo Povo",
    cor: "oklch(0.62 0.15 145)",
    espectro: "Regional/local, transversal",
    familiaIdeologica: "regional-local",
    tipoForca: "partido",
    ambitoMadeira: "regional",
    classificacaoConfianca: 0.74,
    descricao:
      "Partido de origem madeirense, com leitura política fortemente marcada por temas regionais e locais.",
    destaqueMadeira:
      "Nas Autárquicas 2025 foi a segunda força mais votada no agregado das câmaras municipais da Madeira.",
    resultadoAutarquicasMadeira2025: { percentagem: 18.09, votos: 25144, presidencias: 1 },
    notas:
      "Força regional madeirense; evitar encaixe automático esquerda/direita sem análise documental.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "ch",
    sigla: "CH",
    nome: "CHEGA",
    cor: "oklch(0.57 0.2 35)",
    espectro: "Direita radical / nacional-conservadora",
    familiaIdeologica: "direita-radical",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.82,
    descricao:
      "Partido nacional de direita radical/nacional-conservadora, com representação eleitoral na Madeira.",
    destaqueMadeira:
      "Nas Autárquicas 2025 obteve representação relevante no agregado regional das câmaras municipais.",
    resultadoAutarquicasMadeira2025: { percentagem: 11.32, votos: 15725, presidencias: 1 },
    notas:
      "Classificação analítica comum na literatura e cobertura política; requer evidências por documento quando usada em relatórios.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "il",
    sigla: "IL",
    nome: "Iniciativa Liberal",
    cor: "oklch(0.65 0.16 190)",
    espectro: "Direita liberal",
    familiaIdeologica: "direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.86,
    descricao:
      "Partido liberal, com ênfase programática em liberdade económica, simplificação do Estado e direitos individuais.",
    destaqueMadeira: "Consta nas listas regionais e no agregado autárquico da Madeira em 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 1.41, votos: 1956, presidencias: 0 },
    notas: "Classificação baseada no posicionamento económico liberal.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "pcp-pev",
    sigla: "PCP-PEV",
    nome: "CDU - Coligação Democrática Unitária",
    cor: "oklch(0.52 0.2 30)",
    espectro: "Esquerda",
    familiaIdeologica: "esquerda",
    tipoForca: "coligacao",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.9,
    descricao:
      "Coligação que agrega PCP e PEV, tradicionalmente associada à esquerda comunista e ecologista.",
    destaqueMadeira:
      "Surge nas listas regionais e nos resultados autárquicos agregados da Madeira em 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 1.38, votos: 1921, presidencias: 0 },
    notas: "Coligação PCP-PEV identificada nas listas da ALRAM 2025 e resultados autárquicos.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "be",
    sigla: "B.E.",
    nome: "Bloco de Esquerda",
    cor: "oklch(0.56 0.19 15)",
    espectro: "Esquerda",
    familiaIdeologica: "esquerda",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.88,
    descricao:
      "Partido de esquerda, com enfoque em direitos sociais, serviços públicos e políticas de igualdade.",
    destaqueMadeira:
      "Participou nas eleições regionais e aparece no agregado autárquico da Madeira em 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.51, votos: 707, presidencias: 0 },
    notas: "Classificação ideológica convencional.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "livre",
    sigla: "L",
    nome: "LIVRE",
    cor: "oklch(0.62 0.17 145)",
    espectro: "Esquerda verde / progressista",
    familiaIdeologica: "esquerda",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.84,
    descricao:
      "Partido de esquerda verde e progressista, com discurso centrado em democracia, ambiente e direitos sociais.",
    destaqueMadeira:
      "Consta no universo eleitoral analisado para a Madeira, embora com expressão autárquica agregada reduzida.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.22, votos: 309, presidencias: 0 },
    notas:
      "Concorreu a atos eleitorais na Madeira; classificação requer confirmação documental por proposta.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "pan",
    sigla: "PAN",
    nome: "Pessoas-Animais-Natureza",
    cor: "oklch(0.64 0.14 155)",
    espectro: "Ecologista/animalista, transversal",
    familiaIdeologica: "ecologista-transversal",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.72,
    descricao:
      "Partido com matriz animalista, ambientalista e de causas cívicas, muitas vezes transversal ao eixo esquerda/direita.",
    destaqueMadeira:
      "Surge no agregado autárquico da Madeira em 2025 e nas listas regionais analisadas.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.57, votos: 797, presidencias: 0 },
    notas:
      "Não reduzir automaticamente a esquerda/direita; usar eixo ecologista e propostas concretas.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "nd",
    sigla: "ND",
    nome: "Nova Direita",
    cor: "oklch(0.55 0.15 265)",
    espectro: "Direita",
    familiaIdeologica: "direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.76,
    descricao:
      "Partido de direita, tratado aqui com classificação prudente até haver corpus programático local suficiente.",
    destaqueMadeira:
      "Consta nas listas da ALRAM 2025 e aparece nos resultados autárquicos agregados da Madeira.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.25, votos: 342, presidencias: 0 },
    notas: "Classificação analítica; deve ser revista contra documentos programáticos.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "adn",
    sigla: "ADN",
    nome: "Alternativa Democrática Nacional",
    cor: "oklch(0.5 0.13 285)",
    espectro: "Direita/protesto, classificação prudente",
    familiaIdeologica: "direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.62,
    descricao:
      "Partido nacional com discurso de protesto e posicionamento classificado de forma prudente nesta base.",
    destaqueMadeira:
      "Identificado nas fontes eleitorais regionais e no agregado autárquico da Madeira em 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.19, votos: 263, presidencias: 0 },
    notas: "Classificação de baixa confiança; precisa de corpus programático para maior rigor.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "ptp-mpt-rir",
    sigla: "PTP.MPT.RIR",
    nome: "Força Madeira",
    cor: "oklch(0.66 0.14 85)",
    espectro: "Regional/local, heterogeneo",
    familiaIdeologica: "regional-local",
    tipoForca: "coligacao",
    ambitoMadeira: "regional",
    classificacaoConfianca: 0.58,
    descricao:
      "Coligação regional identificada nas listas da ALRAM 2025, composta por forças com perfis programáticos diferentes.",
    destaqueMadeira:
      "Deve ser tratada como candidatura regional específica e não como simples soma das famílias ideológicas dos partidos.",
    notas:
      "Coligação heterogénea; não deve ser colocada rigidamente em esquerda/direita sem programa.",
    fontes: [SOURCES.cneAlram2025Candidates],
  },
  {
    id: "ptp",
    sigla: "PTP",
    nome: "Partido Trabalhista Português",
    cor: "oklch(0.6 0.12 70)",
    espectro: "Regional/local, classificação indeterminada",
    familiaIdeologica: "regional-local",
    tipoForca: "partido",
    ambitoMadeira: "regional",
    classificacaoConfianca: 0.5,
    descricao:
      "Partido com presença regional/local na Madeira e expressão sobretudo dependente do contexto eleitoral concreto.",
    destaqueMadeira: "Aparece no agregado das câmaras municipais da Madeira nas Autárquicas 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.52, votos: 719, presidencias: 0 },
    notas: "Surge em resultados autárquicos; classificar por propostas, não por rótulo.",
    fontes: [SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "mpt",
    sigla: "MPT",
    nome: "Partido da Terra",
    cor: "oklch(0.6 0.12 125)",
    espectro: "Ecologista/local, classificação variável",
    familiaIdeologica: "ecologista-transversal",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.54,
    descricao:
      "Partido com matriz ecologista/local, aqui tratado como força de classificação variável conforme documentos locais.",
    destaqueMadeira: "Tem presença residual no agregado autárquico da Madeira em 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.13, votos: 179, presidencias: 0 },
    notas: "Presença autárquica residual em 2025; precisa de documentos locais.",
    fontes: [SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "rir",
    sigla: "R.I.R.",
    nome: "Reagir Incluir Reciclar",
    cor: "oklch(0.58 0.1 100)",
    espectro: "Indeterminado/protesto",
    familiaIdeologica: "indeterminado",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.44,
    descricao:
      "Partido nacional com presença eleitoral pontual; a classificação ideológica deve ser feita por programa e não apenas por sigla.",
    destaqueMadeira: "Surge no agregado autárquico das câmaras municipais da Madeira em 2025.",
    resultadoAutarquicasMadeira2025: { percentagem: 0.14, votos: 190, presidencias: 0 },
    notas: "Não classificar sem corpus documental.",
    fontes: [SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "ppm",
    sigla: "PPM",
    nome: "Partido Popular Monárquico",
    cor: "oklch(0.56 0.11 270)",
    espectro: "Direita monarquica/conservadora",
    familiaIdeologica: "direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.76,
    descricao:
      "Partido monárquico e conservador, incluído nas fontes eleitorais regionais analisadas.",
    destaqueMadeira:
      "Consta nas listas da ALRAM 2025; sem resultado autónomo destacado no agregado autárquico usado pela aplicação.",
    notas: "Consta nas listas da ALRAM 2025.",
    fontes: [SOURCES.cneAlram2025Candidates],
  },
  {
    id: "grupos-cidadaos",
    sigla: "GC",
    nome: "Grupos de cidadãos eleitores",
    cor: "oklch(0.58 0.05 95)",
    espectro: "Local/independente",
    familiaIdeologica: "regional-local",
    tipoForca: "grupo_cidadaos",
    ambitoMadeira: "local",
    classificacaoConfianca: 0.4,
    descricao:
      "Categoria agregada de candidaturas independentes locais, sem família ideológica comum.",
    destaqueMadeira:
      "No agregado autárquico da Madeira em 2025 reúne listas de cidadãos de diferentes municípios.",
    resultadoAutarquicasMadeira2025: { percentagem: 2.43, votos: 3378, presidencias: 0 },
    notas:
      "Categoria agregada nos resultados autárquicos; cada grupo deve ser analisado separadamente.",
    fontes: [SOURCES.rtpAutarquicasMadeira2025],
  },
];

export interface Election {
  id: string;
  nome: string;
  tipo: string;
  ano: number;
  ambito: string;
  data: string;
  fontes: SourceReference[];
}

export const ELECTIONS: Election[] = [
  {
    id: "alram-2025",
    nome: "Assembleia Legislativa da Região Autónoma da Madeira 2025",
    tipo: "Legislativa regional",
    ano: 2025,
    data: "2025-03-23",
    ambito: "Região Autónoma da Madeira",
    fontes: [SOURCES.cneAlram2025],
  },
  {
    id: "aut-madeira-2025",
    nome: "Autárquicas 2025 - Madeira",
    tipo: "Autárquica",
    ano: 2025,
    data: "2025-10-12",
    ambito: "Municípios e freguesias da Madeira",
    fontes: [SOURCES.cneAutarquicas2025, SOURCES.rtpAutarquicasMadeira2025],
  },
];

export interface PoliticalDocument {
  id: string;
  titulo: string;
  tipo: string;
  partidoId?: string;
  eleicaoId?: string;
  data: string;
  paginas: number;
  fonte: string;
  url?: string;
  estadoRecolha: "verificado" | "por_recolher" | "em_validacao";
}

export const DOCUMENTS: PoliticalDocument[] = [
  {
    id: "doc-cne-alram-2025",
    titulo: "Página CNE - ALRAM 2025",
    tipo: "Fonte eleitoral oficial",
    eleicaoId: "alram-2025",
    data: "2025-03-23",
    paginas: 1,
    fonte: SOURCES.cneAlram2025.label,
    url: SOURCES.cneAlram2025.url,
    estadoRecolha: "verificado",
  },
  {
    id: "doc-cne-alram-2025-listas",
    titulo: "Listas definitivamente admitidas - ALRAM 2025",
    tipo: "Lista de candidatos",
    eleicaoId: "alram-2025",
    data: "2025-03-23",
    paginas: 44,
    fonte: SOURCES.cneAlram2025Candidates.label,
    url: SOURCES.cneAlram2025Candidates.url,
    estadoRecolha: "verificado",
  },
  {
    id: "doc-cne-aut-2025",
    titulo: "Página CNE - Eleições Autárquicas 2025",
    tipo: "Fonte eleitoral oficial",
    eleicaoId: "aut-madeira-2025",
    data: "2025-10-12",
    paginas: 1,
    fonte: SOURCES.cneAutarquicas2025.label,
    url: SOURCES.cneAutarquicas2025.url,
    estadoRecolha: "verificado",
  },
  {
    id: "doc-rtp-madeira-aut-2025",
    titulo: "Resultados Autárquicas 2025 - Madeira",
    tipo: "Resultados eleitorais agregados",
    eleicaoId: "aut-madeira-2025",
    data: "2025-11-03",
    paginas: 1,
    fonte: SOURCES.rtpAutarquicasMadeira2025.label,
    url: SOURCES.rtpAutarquicasMadeira2025.url,
    estadoRecolha: "verificado",
  },
];

export interface PoliticalPromise {
  id: string;
  titulo: string;
  textoOriginal: string;
  textoNormalizado: string;
  partidoId: string;
  eleicaoId: string;
  documentoId: string;
  data: string;
  area: PolicyArea;
  tipo: PromiseType;
  mensurabilidade: 1 | 2 | 3 | 4 | 5;
  classificacaoRacional?: string;
  anotadoPor?: string;
  dataAnotacao?: string;
  revisadoPor?: string;
  dataRevisao?: string;
  revisado?: boolean;
  prazo?: string;
  metrica?: string;
  ambito: string;
  status: PromiseStatus;
  confianca: number;
  evidencias: string[];
  notas: string;
}

// 25c19347e8490d3359df96ec58c6993929d24334d4942592653969b64422bf50
// b23ed20a61cc7b114423194263dedc8231b80d794eaf209ad93fb1b24ac6200f
export const PROMISES: PoliticalPromise[] = [];

export const IDEOLOGICAL_AXES = [
  "Intervenção do Estado",
  "Liberalização económica",
  "Redistribuição",
  "Segurança e ordem pública",
  "Política ambiental",
  "Integração europeia",
  "Soberania nacional",
  "Política migratória",
  "Direitos sociais",
  "Digitalização",
  "Descentralização",
  "Regionalismo autonómico",
] as const;
