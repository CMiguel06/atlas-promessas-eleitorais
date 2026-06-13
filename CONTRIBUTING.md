# Contribuir


Críticas, sugestões e olhares de fora são bem-vindos. Este tipo de trabalho beneficia exactamente disso.
Obrigado pelo interesse em contribuir para o Atlas.

## Requisitos locais

- Node.js 22 ou superior
- npm

## Preparar ambiente

```bash
npm ci
```

## Validacão antes de submeter alteracoes

```bash
npm run typecheck
npm run lint
npm run build
```

## Regras para dados

- Não adicionar promessas sem documento de origem.
- Incluir URL, data de consulta e evidencia quando existirem novas fontes.
- Separar observacao factual de interpretacao politica.
- Evitar classificacoes ideologicas sem nota de confianca ou justificacao documen

## Estilo de codigo

- Manter TypeScript estrito.
- Evitar dependencias novas sem necessidade demonstravel.
- Preferir componentes especificos e pequenos a abstracoes prematuras.
- Nao versionar artefactos gerados como `dist/`, `.output/`, `.vinxi/` ou `node_modules/`.

## Pull requests

Cada pull request deve explicar:

- o problema resolvido;
- as alteracoes principais;
- comandos de validacao executados;
- riscos ou limitacoes conhecidos.
