# Giovanni Portfolio — Fase 0 / Linha de base

Data do registro: 2026-10-19  
Documento governante: `docs/GIOVANNI_PORTFOLIO_DOCUMENTO_MAE_TRAVA_ESCOPO.docx`

## Autoridade protegida

- Checkout: `C:\Users\giova\Documents\Codex\work\giovanni-portfolio-production-recovered-20260921`
- Branch: `main`
- HEAD no início da execução: `b3f63cf74e05d3132daaa865115f436961c8963e`
- Site canônico: `giovannibarcelos`
- Domínio canônico: `https://giovanni.sejasagaz.com/`
- Deploy Production lido antes desta fase: `6ad6943afc8b4f2194048e10` (`ready`)
- Regra: nenhuma exclusão, limpeza de branches, remoção de worktree ou troca de provedor antes do read-back final.

## Estado do checkout

- Documento-mãe restaurado do commit `b3f63cf` após ser encontrado ausente no working tree.
- Working tree: limpo após a restauração do documento-mãe.
- Arquivos estruturais observados: `index.html` (141.914 bytes), `portfolio.css` (170.537 bytes), `portfolio-runtime.js` (87.896 bytes).
- O projeto é um site estático de página única, com conteúdo multilíngue aplicado por runtime/localização.

## Inventário de mídia

- Arquivos em `assets/`: 76.
- Tamanho total de `assets/`: 75.294.517 bytes.
- Formatos: 43 PNG, 28 WebP, 3 PDF, 2 JPG.
- Referências encontradas no HTML/CSS/runtime: 40 caminhos únicos após normalização.
- Imagens com `loading="eager"` no HTML: 8.
- Preloads no HTML: 12.
- A composição hero e Remote possui camadas rasterizadas e variantes localizadas; essas peças estão protegidas contra redesenho nesta execução.

## Fatos técnicos observados

- `index.html` inicia com `lang="en"`.
- Há uma única URL pública no sitemap: `/`, com `lastmod` anterior à data desta execução.
- `robots.txt` permite rastreamento e aponta para o sitemap canônico.
- Não há `netlify.toml` no checkout.
- Metadados, canonical e Open Graph estão concentrados na página raiz; não há rotas públicas independentes por idioma registradas no sitemap.
- O estado visual do painel Remote foi previamente congelado e publicado; a remoção dos gradientes/sombras finais consta nos commits `9517855` e `30f7759`.

## Riscos e pontos de controle

1. Não alterar ou substituir assets aprovados sem registro explícito de mudança.
2. Não transformar o layout multilíngue em três geometrias divergentes; EN/PT/ES devem compartilhar composição e variar apenas o texto localizado.
3. Validar desktop e mobile com evidência visual, incluindo overflow horizontal, cortes de painel, sujeito, textos e transições entre seções.
4. Validar SEO, acessibilidade, performance e integridade de referências após cada lote de mudança.
5. Production só pode ser atualizado depois de Preview local aprovado tecnicamente e visualmente.

## Desconhecido que precisa ser medido

- Matriz real de viewport e zoom em que o site quebra.
- Métricas atuais de LCP, CLS e INP em viewport móvel e desktop.
- Inventário de erros de console/rede em EN, PT e ES.
- Equivalência geométrica efetiva do painel Remote nos três idiomas.
- Estado atual de cache/CDN e headers públicos.

## Critério de saída da Fase 0

A fase só fecha quando este manifesto, o read-back do Production e a captura visual dos estados EN/PT/ES nos viewports definidos estiverem registrados. Sem esse conjunto, nenhuma limpeza ou publicação adicional é considerada autorizada pelo documento-mãe.
