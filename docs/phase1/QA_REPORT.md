# Fase 1 — SEO, localização e responsividade

Data: 2026-10-19  
Commit da fase de produto: `e3dc10d`; commit de entrega/QA: `1d74f33`. Revisões finais: `7793466` (carregamento localizado) e `ad2292d` (cache-bust do runtime).

## Alterações executadas

- Idioma passou a aceitar `?lang=en`, `?lang=pt` e `?lang=es` como estado compartilhável.
- A troca de idioma atualiza `document.lang`, título, description, Open Graph locale e URL sem recarregar a página.
- Foram adicionados `hreflang` para os três idiomas e `x-default`, sem criar rotas fictícias.
- Foi adicionado JSON-LD de `Person` usando somente identidade, cargo, domínio e LinkedIn já presentes no produto.
- Sitemap atualizado para `lastmod` de 2026-10-19.
- Foram adicionados headers de segurança e cache previsível em `_headers`: assets versionados podem ser imutáveis; HTML revalida sempre.

## Validação automatizada

- `node --check portfolio-runtime.js`: OK.
- `git diff --check`: OK; apenas aviso de normalização CRLF do sitemap.
- 40 referências de assets normalizadas: 40/40 HTTP 200 no Preview local.
- Imagens sem `alt`: 0/32.
- Título EN: 52 caracteres.
- Description EN: 157 caracteres.
- JSON-LD: válido.
- Hreflang: 4 declarações.
- Console no navegador em EN/PT/ES: nenhum erro ou aviso capturado na amostra.

## Validação visual e de comportamento

- Production foi conferido em EN, PT e ES no Edge existente; o painel Remote manteve a mesma composição, sujeito e mapa, alterando apenas o idioma.
- Preview local foi conferido novamente em EN, PT e ES após a correção de carregamento localizado: o raster ativo apresentou largura natural de 1550px, o raster inativo permaneceu oculto e não houve texto alternativo exposto.
- Preview local foi conferido em viewport de 390px e nos breakpoints 320, 390, 768, 1024, 1280, 1440 e 1920px.
- Overflow horizontal: não observado em nenhum breakpoint medido.
- PT→ES no Preview local: URL, idioma, título, título Remote e estado ativo foram atualizados; geometria e composição permaneceram estáveis.
- A captura de 320px confirmou o painel e o texto dentro do viewport; a captura de 1280px confirmou a continuidade Remote → Capabilities sem faixa lateral ou recorte horizontal.

## Limites ainda abertos

## Auditoria de performance

- Execução Lighthouse local final: `docs/phase1/lighthouse-local-final.json`, Edge headless, categorias Performance/Accessibility/SEO.
- Resultado: Performance 63, Accessibility 90, SEO 100; FCP 2,27 s; TBT 27 ms; CLS 0; transferência total 13.494 KiB.
- A alteração desta rodada não redesenha nem substitui assets: PT/ES deixam de baixar os rasters completos enquanto estão inativos. O relatório final ainda estima 5.401 KiB de oportunidade de entrega de imagens (`image-delivery-insight`), portanto a otimização de peso dos arquivos permanece uma fase separada e não foi simulada.
- O valor bruto de LCP retornado pelo Lighthouse variou de forma anômala entre execuções (76,2 s nesta coleta), enquanto o detalhamento do próprio relatório aponta aproximadamente 1,3 s de atraso de renderização e 78 ms de recurso/TTFB. Esse valor não é tratado como aprovado; requer medição móvel controlada antes de fechar o gate de Core Web Vitals.

- Core Web Vitals reais (LCP, CLS e INP) ainda precisam de medição em uma execução de rede móvel controlada; não serão inventados a partir de HTTP 200.
- As variantes `?lang=` são compartilháveis e indexáveis como referência de idioma, mas o conteúdo ainda é aplicado por JavaScript; uma futura evolução para HTML pré-renderizado por idioma deve ser tratada como fase própria.
- Read-back final desta rodada: deploy Production Netlify `6ad6a22dc88c4207b320e741`, estado `ready`, domínio `giovanni.sejasagaz.com`, branch `main`.
