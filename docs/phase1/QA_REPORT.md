# Fase 1 — SEO, localização e responsividade

Data: 2026-10-19  
Commit da fase de produto: `e3dc10d`; commit de entrega/QA: `1d74f33`.

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
- Preview local foi conferido em viewport de 390px e nos breakpoints 320, 390, 768, 1024, 1280, 1440 e 1920px.
- Overflow horizontal: não observado em nenhum breakpoint medido.
- PT→ES no Preview local: URL, idioma, título, título Remote e estado ativo foram atualizados; geometria e composição permaneceram estáveis.
- A captura de 320px confirmou o painel e o texto dentro do viewport; a captura de 1280px confirmou a continuidade Remote → Capabilities sem faixa lateral ou recorte horizontal.

## Limites ainda abertos

- Core Web Vitals reais (LCP, CLS e INP) ainda precisam de medição em uma execução de rede móvel controlada; não serão inventados a partir de HTTP 200.
- As variantes `?lang=` são compartilháveis e indexáveis como referência de idioma, mas o conteúdo ainda é aplicado por JavaScript; uma futura evolução para HTML pré-renderizado por idioma deve ser tratada como fase própria.
- A publicação Production desta fase ainda depende do read-back final do deploy e da conferência pública pós-deploy.
