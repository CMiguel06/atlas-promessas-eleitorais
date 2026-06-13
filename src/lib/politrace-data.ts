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

export type ValidationPhase = "por_validar" | "fonte_identificada" | "em_revisao" | "validada";

export type ComplianceAssessment =
  | "nao_avaliada"
  | "em_analise_documental"
  | "evidencia_insuficiente"
  | "cumprimento_indeterminado"
  | "avaliada";

export type EvidenceType =
  | "fonte_promessa"
  | "evidencia_execucao"
  | "evidencia_institucional"
  | "evidencia_orcamental"
  | "evidencia_legal"
  | "nota_metodologica";

export type PolicyArea =
  | "Habitação"
  | "Saúde"
  | "Mobilidade"
  | "Ambiente"
  | "Educação"
  | "Fiscalidade"
  | "Economia"
  | "Administração Pública"
  | "Coesão Territorial"
  | "Ciência e Tecnologia"
  | "Juventude"
  | "Ação Social"
  | "Turismo"
  | "Cultura"
  | "Segurança"
  | "Digitalização"
  | "Transparência e Governo Aberto";

export const POLICY_AREAS: PolicyArea[] = [
  "Habitação",
  "Saúde",
  "Mobilidade",
  "Ambiente",
  "Educação",
  "Fiscalidade",
  "Economia",
  "Administração Pública",
  "Coesão Territorial",
  "Ciência e Tecnologia",
  "Juventude",
  "Ação Social",
  "Turismo",
  "Cultura",
  "Segurança",
  "Digitalização",
  "Transparência e Governo Aberto",
];

export const PREPARED_DOCUMENTARY_AXES = POLICY_AREAS;

export const PREPARED_AXES_NOTICE =
  "Estes eixos indicam áreas preparadas para recolha documental futura. Não representam, por si só, promessas validadas.";

export const CORPUS_METHODOLOGY_NOTICE =
  "Os dados apresentados correspondem apenas a promessas já extraídas de documentos públicos identificados. O corpus ainda não representa o universo completo de promessas eleitorais.";

export const STATUS_LABEL: Record<PromiseStatus, string> = {
  nao_iniciada: "Por validar",
  em_curso: "Em análise documental",
  parcial: "Parcial, sujeito a revisão",
  cumprida: "Cumprida com evidência",
  nao_cumprida: "Sem evidência de cumprimento",
  alterada: "Alterada",
  indeterminada: "Cumprimento indeterminado",
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

export const VALIDATION_PHASE_LABEL: Record<ValidationPhase, string> = {
  por_validar: "Por validar",
  fonte_identificada: "Fonte da promessa identificada",
  em_revisao: "Em revisão documental",
  validada: "Validada",
};

export const COMPLIANCE_ASSESSMENT_LABEL: Record<ComplianceAssessment, string> = {
  nao_avaliada: "Não avaliada",
  em_analise_documental: "Em análise documental",
  evidencia_insuficiente: "Evidência insuficiente",
  cumprimento_indeterminado: "Cumprimento indeterminado",
  avaliada: "Avaliada",
};

export const EVIDENCE_TYPE_LABEL: Record<EvidenceType, string> = {
  fonte_promessa: "Fonte da promessa",
  evidencia_execucao: "Evidência de execução",
  evidencia_institucional: "Evidência institucional",
  evidencia_orcamental: "Evidência legal/orçamental",
  evidencia_legal: "Evidência legal/orçamental",
  nota_metodologica: "Nota metodológica",
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
    checkedAt: "2026-06-13",
    note: "Página oficial da CNE para a eleição regional de 23 de março de 2025.",
  },
  cneAlram2025Candidates: {
    label: "CNE - Listas definitivamente admitidas ALRAM 2025",
    url: "https://www.cne.pt/sites/default/files/dl/eleicoes/2025_alram/lista_candidatos/2025_alram_lista_candidatos.pdf",
    checkedAt: "2026-06-13",
    note: "Documento oficial com listas de candidatos. Prova existência de candidaturas, não promessas.",
  },
  cneAutarquicas2025: {
    label: "CNE - Eleições Autárquicas 2025",
    url: "https://www.cne.pt/content/eleicoes-autarquicas-2025",
    checkedAt: "2026-06-13",
    note: "Página oficial da CNE para as eleições autárquicas de 12 de outubro de 2025.",
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
  preparedDocumentaryAxes: PolicyArea[];
  resultadoAutarquicasMadeira2025?: MadeiraAutarquicasResult;
  notas: string;
  fontes: SourceReference[];
}

const DEFAULT_AXES: PolicyArea[] = [...PREPARED_DOCUMENTARY_AXES];

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
    descricao: "Partido nacional com implantação regional consolidada na Madeira.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 11.64, votos: 16179, presidencias: 2 },
    notas: "Classificação ideológica analítica, não oficial.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "psd-cds",
    sigla: "PPD/PSD.CDS-PP",
    nome: "Coligação PSD/CDS-PP",
    cor: "oklch(0.6 0.15 235)",
    espectro: "Centro-direita / direita democrata-cristã",
    familiaIdeologica: "centro-direita",
    tipoForca: "coligacao",
    ambitoMadeira: "regional",
    classificacaoConfianca: 0.84,
    descricao: "Coligação eleitoral entre PSD e CDS-PP usada em disputas autárquicas na Madeira.",
    destaqueMadeira: "Identificada nos resultados autárquicos agregados de 2025.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 32.64, votos: 45353, presidencias: 4 },
    notas: "Coligação local; não deve ser confundida com promessas autónomas sem documento.",
    fontes: [SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "cds",
    sigla: "CDS-PP",
    nome: "CDS - Partido Popular",
    cor: "oklch(0.62 0.14 250)",
    espectro: "Direita democrata-cristã",
    familiaIdeologica: "direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.86,
    descricao: "Partido nacional de matriz democrata-cristã e conservadora.",
    destaqueMadeira: "Identificado em fontes eleitorais regionais e autárquicas.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 2.83, votos: 3931, presidencias: 1 },
    notas: "Classificação deve ser cruzada com documentos programáticos.",
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
    descricao: "Partido nacional de centro-esquerda com presença regional na Madeira.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 13.37, votos: 18577, presidencias: 2 },
    notas: "Classificação convencional; promessas concretas exigem documento de origem.",
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
    descricao: "Partido de origem madeirense, marcado por temas regionais e locais.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 18.09, votos: 25144, presidencias: 1 },
    notas: "Evitar enquadramento rígido esquerda/direita sem análise documental.",
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
    descricao: "Partido nacional com representação eleitoral na Madeira.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 11.32, votos: 15725, presidencias: 1 },
    notas: "Classificação analítica; relatórios devem apoiar-se em documentos específicos.",
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
    descricao: "Partido liberal com presença nas fontes eleitorais da Madeira.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 1.41, votos: 1956, presidencias: 0 },
    notas: "Classificação baseada em posicionamento económico liberal.",
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
    descricao: "Coligação que agrega PCP e PEV.",
    destaqueMadeira: "Identificada nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 1.38, votos: 1921, presidencias: 0 },
    notas:
      "Coligação identificada como candidatura eleitoral; propostas exigem programa ou documento.",
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
    descricao: "Partido de esquerda com presença eleitoral na Madeira.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.51, votos: 707, presidencias: 0 },
    notas: "Classificação convencional, sem inferência sobre promessas sem corpus.",
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
    descricao: "Partido de esquerda verde e progressista.",
    destaqueMadeira: "Identificado no universo eleitoral analisado para a Madeira.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.22, votos: 309, presidencias: 0 },
    notas: "Classificação requer confirmação documental por proposta.",
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
    descricao: "Partido com matriz animalista, ambientalista e de causas cívicas.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.57, votos: 797, presidencias: 0 },
    notas: "Usar eixo ecologista e propostas concretas, não rótulo partidário isolado.",
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
    descricao: "Partido de direita tratado com classificação prudente nesta base.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.25, votos: 342, presidencias: 0 },
    notas: "Classificação analítica a rever contra documentos programáticos.",
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
    descricao: "Partido nacional com presença em fontes eleitorais regionais.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025 e em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.19, votos: 263, presidencias: 0 },
    notas: "Classificação de baixa confiança; precisa de corpus programático.",
    fontes: [SOURCES.cneAlram2025Candidates, SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "ptp-mpt-rir",
    sigla: "PTP.MPT.RIR",
    nome: "Força Madeira",
    cor: "oklch(0.66 0.14 85)",
    espectro: "Regional/local, heterogéneo",
    familiaIdeologica: "regional-local",
    tipoForca: "coligacao",
    ambitoMadeira: "regional",
    classificacaoConfianca: 0.58,
    descricao: "Coligação regional identificada nas listas da ALRAM 2025.",
    destaqueMadeira: "Deve ser tratada como candidatura regional específica.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    notas: "Não colocar rigidamente em esquerda/direita sem programa.",
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
    descricao: "Partido com presença regional/local na Madeira.",
    destaqueMadeira: "Identificado em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.52, votos: 719, presidencias: 0 },
    notas: "Classificar por propostas documentadas, não apenas por sigla.",
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
    descricao: "Partido com matriz ecologista/local.",
    destaqueMadeira: "Identificado em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.13, votos: 179, presidencias: 0 },
    notas: "Presença residual em 2025; precisa de documentos locais.",
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
    descricao: "Partido nacional com presença eleitoral pontual.",
    destaqueMadeira: "Identificado em resultados autárquicos agregados.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 0.14, votos: 190, presidencias: 0 },
    notas: "Não classificar sem corpus documental.",
    fontes: [SOURCES.rtpAutarquicasMadeira2025],
  },
  {
    id: "ppm",
    sigla: "PPM",
    nome: "Partido Popular Monárquico",
    cor: "oklch(0.56 0.11 270)",
    espectro: "Direita monárquica/conservadora",
    familiaIdeologica: "direita",
    tipoForca: "partido",
    ambitoMadeira: "nacional_com_presenca_regional",
    classificacaoConfianca: 0.76,
    descricao: "Partido monárquico e conservador incluído nas fontes eleitorais regionais.",
    destaqueMadeira: "Identificado nas listas da ALRAM 2025.",
    preparedDocumentaryAxes: DEFAULT_AXES,
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
    descricao: "Categoria agregada de candidaturas independentes locais.",
    destaqueMadeira: "Identificada no agregado autárquico da Madeira em 2025.",
    preparedDocumentaryAxes: DEFAULT_AXES,
    resultadoAutarquicasMadeira2025: { percentagem: 2.43, votos: 3378, presidencias: 0 },
    notas: "Cada grupo deve ser analisado separadamente.",
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
  dataConsulta: string;
  paginas: number;
  fonte: string;
  fonteId?: keyof typeof SOURCES;
  url?: string;
  estadoRecolha: "verificado" | "por_recolher" | "em_validacao";
  notasMetodologicas: string;
}

export const DOCUMENTS: PoliticalDocument[] = [
  {
    id: "doc-cne-alram-2025",
    titulo: "Página CNE - ALRAM 2025",
    tipo: "Fonte eleitoral oficial",
    eleicaoId: "alram-2025",
    data: "2025-03-23",
    dataConsulta: SOURCES.cneAlram2025.checkedAt,
    paginas: 1,
    fonte: SOURCES.cneAlram2025.label,
    fonteId: "cneAlram2025",
    url: SOURCES.cneAlram2025.url,
    estadoRecolha: "verificado",
    notasMetodologicas:
      "Identifica o ato eleitoral e documentos oficiais associados. Não contém, por si só, promessas eleitorais.",
  },
  {
    id: "doc-cne-alram-2025-listas",
    titulo: "Listas definitivamente admitidas - ALRAM 2025",
    tipo: "Lista de candidatos",
    eleicaoId: "alram-2025",
    data: "2025-03-23",
    dataConsulta: SOURCES.cneAlram2025Candidates.checkedAt,
    paginas: 44,
    fonte: SOURCES.cneAlram2025Candidates.label,
    fonteId: "cneAlram2025Candidates",
    url: SOURCES.cneAlram2025Candidates.url,
    estadoRecolha: "verificado",
    notasMetodologicas:
      "Prova documental da admissão de candidaturas. Não deve ser usada como prova de cumprimento de promessas.",
  },
  {
    id: "doc-cne-aut-2025",
    titulo: "Página CNE - Eleições Autárquicas 2025",
    tipo: "Fonte eleitoral oficial",
    eleicaoId: "aut-madeira-2025",
    data: "2025-10-12",
    dataConsulta: SOURCES.cneAutarquicas2025.checkedAt,
    paginas: 1,
    fonte: SOURCES.cneAutarquicas2025.label,
    fonteId: "cneAutarquicas2025",
    url: SOURCES.cneAutarquicas2025.url,
    estadoRecolha: "verificado",
    notasMetodologicas: "Identifica o ato eleitoral autárquico. Não contém extração de promessas.",
  },
  {
    id: "doc-rtp-madeira-aut-2025",
    titulo: "Resultados Autárquicas 2025 - Madeira",
    tipo: "Resultados eleitorais agregados",
    eleicaoId: "aut-madeira-2025",
    data: "2025-11-03",
    dataConsulta: SOURCES.rtpAutarquicasMadeira2025.checkedAt,
    paginas: 1,
    fonte: SOURCES.rtpAutarquicasMadeira2025.label,
    fonteId: "rtpAutarquicasMadeira2025",
    url: SOURCES.rtpAutarquicasMadeira2025.url,
    estadoRecolha: "verificado",
    notasMetodologicas:
      "Fonte para resultados agregados. Não é fonte de promessas nem de cumprimento.",
  },
  {
    id: "todo-programas-eleitorais-madeira-2025",
    titulo: "Programas eleitorais oficiais Madeira 2025",
    tipo: "TODO técnico de recolha",
    eleicaoId: "alram-2025",
    data: "2025-03-23",
    dataConsulta: "2026-06-13",
    paginas: 0,
    fonte: "Programas oficiais de partidos ou candidaturas",
    estadoRecolha: "por_recolher",
    notasMetodologicas:
      "Recolher apenas documentos oficiais acessíveis e verificáveis antes de extrair promessas. Até lá, o catálogo de promessas permanece sem entradas inventadas.",
  },
];

export interface PromiseEvidence {
  id: string;
  tipo: EvidenceType;
  titulo: string;
  descricao: string;
  url?: string;
  entidade: string;
  data?: string;
  dataConsulta: string;
  fiabilidade: "alta" | "media" | "baixa";
  nota: string;
}

export interface PoliticalPromise {
  id: string;
  titulo: string;
  textoOriginal: string;
  textoNormalizado: string;
  partidoId: string;
  eleicaoId: string;
  documentoId: string;
  fonteId: keyof typeof SOURCES | string;
  area: PolicyArea;
  eixo: PolicyArea;
  tipo: PromiseType;
  mensurabilidade: 1 | 2 | 3 | 4 | 5;
  ambito: string;
  status: PromiseStatus;
  faseValidacao: ValidationPhase;
  avaliacaoCumprimento: ComplianceAssessment;
  confianca: number;
  url?: string;
  dataDocumento: string;
  dataConsulta: string;
  prazo?: string;
  metrica?: string;
  notasMetodologicas: string;
  evidencias: PromiseEvidence[];
}

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
