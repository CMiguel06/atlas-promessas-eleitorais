import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o Projeto — Atlas" },
      {
        name: "description",
        content: "Atlas foi idealizado, concebido e produzido por Caio Camacho.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Sobre</div>
      <h1 className="font-display text-5xl font-semibold mt-2 leading-tight">Atlas</h1>
      <p className="font-display italic text-2xl text-muted-foreground mt-1">
        Observatório Digital de Promessas Eleitorais
      </p>

      <div className="mt-10 space-y-6 text-foreground/90 leading-relaxed">
        <p>
          O Atlas é um protótipo académico de Engenharia Informática, orientado à identificação,
          classificação, pesquisa e monitorização de promessas eleitorais e compromissos políticos
          presentes em documentos públicos.
        </p>
        <p>
          O projeto cruza áreas como Processamento de Linguagem Natural, Ciência de Dados, Sistemas
          de Informação, Ciência Política, verificação de factos, Ética Algorítmica e Visualização
          de Dados.
        </p>
        <p>
          Não recomenda voto, não produz propaganda e não substitui análise jornalística ou
          científica especializada.
        </p>
      </div>

      <div className="mt-12 border-t border-rule pt-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">
          Autoria
        </div>
        <p className="font-display text-xl">
          Projeto idealizado, concebido e produzido por{" "}
          <span className="font-semibold">Caio Camacho</span>.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Portfólio académico em Engenharia Informática, com enfoque em transparência democrática,
          NLP, ciência de dados e sistemas de informação.
        </p>
      </div>
    </div>
  );
}
