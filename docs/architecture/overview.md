# Arquitetura - Visao Geral

## Visao geral

O Atlas e uma aplicacao web TypeScript/React com renderizacao suportada por TanStack Start. A aplicacao apresenta um prototipo de observatorio de promessas eleitorais, usando dados estaticos versionados em codigo e rotas file-based para expor paginas de consulta, analise e metodologia.

## Estilo arquitetural

O projeto segue uma arquitetura frontend centrada em rotas, com separacao simples entre:

- apresentacao em `src/routes/` e `src/components/`;
- dominio e dados estaticos em `src/lib/politrace-data.ts`;
- bootstrap de router e servidor em `src/router.tsx`, `src/start.ts` e `src/server.ts`;
- estilos globais e tokens visuais em `src/styles.css`.

Nao existe, nesta versao, API propria, base de dados ou camada de autenticacao.

## Modulos principais

- `src/routes/`: paginas publicas da aplicacao.
- `src/components/Layout.tsx`: estrutura comum, navegacao principal e rodape.
- `src/components/StatusBadge.tsx`: componentes visuais para estados e areas.
- `src/lib/politrace-data.ts`: tipos de dominio e dados estaticos.
- `src/lib/error-capture.ts` e `src/lib/error-page.ts`: captura e apresentacao de erros SSR.
- `src/router.tsx`: criacao do router e do `QueryClient`.
- `src/server.ts`: adaptador SSR para Cloudflare/TanStack Start.

## Relacao entre componentes

As rotas importam dados de `politrace-data.ts` e componentes partilhados quando necessario. O `Layout` envolve o `Outlet` do TanStack Router e fornece navegacao consistente. O servidor carrega dinamicamente a entrada SSR de TanStack Start e normaliza respostas de erro criticas.

## Decisoes tecnicas relevantes

- Dados estaticos no repositorio para manter o prototipo auditavel e sem dependencias operacionais.
- TanStack Router/Start para routing tipado e suporte SSR.
- Tailwind CSS 4 com tokens semanticos para manter consistencia visual.
- Deploy preparado para Cloudflare Workers, embora sem variaveis de ambiente obrigatorias nesta fase.
