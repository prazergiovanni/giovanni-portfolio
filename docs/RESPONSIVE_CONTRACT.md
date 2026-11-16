# Giovanni Barcelos | Contrato responsivo R12

**Versão canônica:** giovanni.sejasagaz.com, Worker Cloudflare giovanni-portfolio.
**Rollback:** R11, commit 597a4bc.

## Faixas de layout e imagens originais

Estas faixas são as decisões de arte do portfólio, não uma classificação universal de aparelhos.

| Condição CSS da viewport | Composição Hero | Imagem matriz |
| --- | --- | --- |
| largura até 720 px e proporção abaixo de 5:4 | Mobile retrato | HERO_STATIC_MOBILE_APPROVED_20261113.png, 941 × 1672 px |
| largura até 720 px e proporção a partir de 5:4 | Mobile paisagem, arte horizontal | HERO_STATIC_TABLET_PT/EN/ES_20261114.webp, 1280 × 720 px |
| largura de 721 a 1100 px | Tablet | HERO_STATIC_TABLET_PT/EN/ES_20261114.webp, 1280 × 720 px |
| largura de 1101 px em diante | Desktop | HERO_STATIC_DESKTOP_PT/EN/ES_20261113.webp, 1672 × 941 px |

- É a largura útil em **CSS pixels** que manda, não a resolução física do telefone. Zoom e barras do navegador afetam a área disponível.
- O artboard mobile tem proporção 941/1672, aproximadamente 0,563. Em telas altas prende-se à altura; em telas largas à largura, sem deformar a imagem.
- Até 340 px, a arte vertical recebe um deslocamento controlado que impede os 11 px de rolagem horizontal encontrados na auditoria.
- A Hero mantém altura de um viewport dinâmico e o ticker permanece na sua borda inferior.
- Em telas estreitas horizontais o sistema utiliza a imagem horizontal e diminui o texto para preservar a leitura.
- Remote Work possui **altura mínima de um viewport**, mas cresce quando o conteúdo não cabe. A fotografia ocupa o espaço restante. Não cortar texto para forçar exatamente 100vh.
- Breakpoints internos de tipografia, menu e demais seções podem existir, mas não devem contradizer a escolha dessas três composições.

## Autoridade da implementação

O arquivo **portfolio-responsive.css** é o ponto de manutenção das regras adaptativas da Hero e Remote Work, carregado por último após portfolio.css. O CSS anterior conserva demais estilos e regras históricas. Não criar novamente exceções de mesmo assunto em outros pontos do projeto.

O contrato exige medições de geometria, não só screenshots. Alterar arquivo da Hero, texto, idiomas ou o sistema de alturas exige repetir a matriz.

## Testes permanentes

Com Playwright instalado:

    python scripts/verify-responsive-layout.py --url http://127.0.0.1:4312/ --channel msedge

O fluxo de GitHub Actions instala Chromium e executa a mesma matriz antes do dry-run do Worker.

Cobertura: transições **620/621, 680/681, 720/721, 920/921, 980/981, 1023/1024, 1100/1101**, larguras de 320 a 1920, alturas normais e curtas, modos retrato/paisagem, PT, EN e ES.

Critérios de aceite:
1. Sem rolagem horizontal ou erros JavaScript.
2. Hero com imagem correta carregada, sem deformação e com o título acima do ticker.
3. SVGs dos painéis mobile preenchendo e respeitando os limites de seus contêineres.
4. Ticker fechando a Hero.
5. Remote Work com todo o texto visível e altura calculada pelo conteúdo.
6. Animações respeitando preferência de movimento reduzido.

A matriz valida os tamanhos amostrados; não é prova de todos os navegadores e formatos possíveis. Para novas combinações, prevalece o princípio: **priorizar legibilidade e não truncar conteúdo**.

## Relatório-base

Auditoria inicial R11: 90 cenários, 25 com problemas (corte do texto Remote Work e largura excessiva em 320 px).
Candidata R12: 90/90 cenários originais sem essas falhas, antes da promoção.
O arquivo de testes registra a verificação final do código efetivamente publicado.
