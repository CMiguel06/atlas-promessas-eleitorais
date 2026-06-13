import { Link, Outlet } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/promessas", label: "Promessas" },
  { to: "/partidos", label: "Partidos" },
  { to: "/eleicoes", label: "Eleições" },
  { to: "/documentos", label: "Documentos" },
  { to: "/busca", label: "Busca" },
  { to: "/comparador", label: "Comparador" },
  { to: "/promessa-ou-fumo", label: "Classificador" },
  { to: "/analise-ideologica", label: "Análise" },
  { to: "/evidencias", label: "Evidências" },
  { to: "/relatorios", label: "Relatórios" },
] as const;

const FOOTER_NAV = [
  { to: "/metodologia", label: "Metodologia" },
  { to: "/etica", label: "Ética e Neutralidade" },
  { to: "/sobre", label: "Sobre o Projeto" },
] as const;

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-rule bg-paper/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-primary text-primary-foreground grid place-items-center font-display font-bold">
              PT
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold tracking-tight">Atlas</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Observatório Digital
              </div>
            </div>
          </Link>
          <div className="hidden md:block text-xs text-muted-foreground italic">
            Plataforma cívica, académica e neutra
          </div>
        </div>
        <nav className="border-t border-rule bg-card">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
            <ul className="flex gap-1 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="inline-block px-3 py-3 text-muted-foreground hover:text-foreground border-b-2 border-transparent data-[status=active]:border-primary data-[status=active]:text-foreground whitespace-nowrap"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-rule bg-card mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-display text-base font-semibold mb-2">Atlas</div>
            <p className="text-muted-foreground leading-relaxed">
              Observatório digital de promessas eleitorais. Projeto académico orientado à
              transparência democrática, sem recomendação de voto e sem propaganda.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Documentação
            </div>
            <ul className="space-y-1.5">
              {FOOTER_NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Aviso
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Os conteúdos têm finalidade educativa. As classificações automáticas são revisíveis e
              acompanhadas por níveis de confiança e fontes públicas.
            </p>
          </div>
        </div>
        <div className="border-t border-rule">
          <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} Atlas — Caio Camacho</span>
            <span>v0.1 · protótipo académico</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
