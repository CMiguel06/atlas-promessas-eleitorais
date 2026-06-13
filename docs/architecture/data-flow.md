# Arquitetura - Fluxo de Dados

## Entrada de dados

Nesta versao, os dados entram por codigo versionado em `src/lib/politrace-data.ts`. As fontes documentais sao representadas por objetos com `label`, `url`, `checkedAt` e, quando necessario, `note`.

## Processamento

As paginas importam colecoes estaticas e calculam agregacoes em memoria:

- totais de partidos, documentos, eleicoes e promessas;
- distribuicao de promessas por estado, area e partido;
- filtros textuais locais;
- resultado heuristico do classificador documental.

## Validacao

Nao existe pipeline automatico de validacao de dados. A validacao atual e manual e documental: cada promessa futura deve estar associada a documento, fonte publica e data de consulta.

## Persistencia

Nao existe base de dados nesta versao. A persistencia e feita pelo proprio repositorio atraves de dados estaticos.

## Saida de dados

As saidas sao paginas React renderizadas pelo TanStack Router/Start. O build produz artefactos cliente e SSR em `dist/`, que nao devem ser versionados.

## Tratamento de erros

O servidor tenta capturar erros SSR e devolver uma pagina de erro HTML neutra. Erros criticos que sejam convertidos em respostas JSON 500 pelo runtime sao normalizados por `normalizeCatastrophicSsrResponse`.
