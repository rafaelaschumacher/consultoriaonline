# Padrões visuais — Rafaela Schumacher

Parte do design system oficial da marca (ver `SKILL.md`). Este arquivo documenta
**apenas padrões que já existem hoje** no código do site — regras de comportamento e
uso que aparecem de forma repetida em `css/styles.css`/`index.html`/`js/main.js`, mas
que não são um "token" (um valor único) nem um "componente" (uma peça de UI isolada).
Nenhum padrão novo foi inventado para este documento.

## Nomenclatura BEM — *Camada B*

Todas as classes seguem `.bloco__elemento--modificador` (ex: `.plan-card__badge`,
`.btn--outline`, `.whatsapp-mock__header`). Qualquer CSS novo deve seguir o mesmo
padrão — inclusive na plataforma de pacientes, se ela usar CSS por classe.

## Dark mode automático — *Camada A/B*

O modo escuro é acionado **apenas** por `prefers-color-scheme: dark` (preferência do
sistema operacional do visitante) — não existe toggle manual nem classe `.dark` no
código atual. Dentro do dark mode, só os tokens de **superfície** mudam:
`--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-text`, `--color-text-muted`,
`--color-border`, `--color-primary-light`. As cores de identidade (`--color-primary`,
`--color-primary-dark`, `--color-accent`, `--color-deep`) permanecem as mesmas nos dois
modos — é essa combinação (superfícies mudam, identidade não muda) que faz o dark mode
"continuar parecendo a marca". Qualquer novo componente/seção deve seguir essa mesma
regra: nunca redefinir a cor de identidade dentro de um bloco de dark mode.

Duas consequências práticas dessa regra, já aplicadas no CSS: o degradê bronze dos botões
e selos é o mesmo nos dois modos, então o texto sobre ele fica fixo em `#fff` (não
`var(--color-text)`); e as seções `.who`/`.final-cta` têm fundo escuro nos dois modos,
então o `outline` de foco dentro delas fica fixo em branco.

## Ritmo vertical de seção — *Camada B*

Toda `<section>` de conteúdo usa o mesmo padding vertical: `104px 0` no desktop,
reduzindo para `68px 0` a partir de `768px` (ver `tokens.md` → Layout). Nenhuma seção do
site foge desse ritmo. Uma seção nova deve usar o mesmo valor em vez de um padding
arbitrário — o respiro generoso é parte do que dá o tom premium à marca.

## Container e grid de página — *Camada B*

Todo o conteúdo de cada seção fica dentro de `.container` (`max-width: 1140px`,
`padding: 0 24px`, centralizado). Layouts internos usam CSS Grid com 2 a 6 colunas
dependendo da seção, sempre colapsando para menos colunas nos breakpoints já
documentados em `tokens.md` (nunca um breakpoint novo só para uma grade específica).

## Filete como marcador — *Camada A (o motivo) / B (a regra de uso)*

O motivo visual recorrente da marca é um **filete horizontal**: um retângulo de `1px` de
altura na cor `--color-accent`, desenhado com `::before` (ou, no eyebrow, pelo próprio
`.sparkle` esvaziado de texto). Ele aparece em três comprimentos, sempre pela mesma
lógica — quanto mais importante o rótulo, mais longo o filete:

| Onde | Comprimento | Observação |
|---|---|---|
| `.eyebrow` (rótulo de seção) | `30px` | Separado do texto por `gap: 14px`. |
| `.includes__item p::before` | `16px` | `top: 0.72em` para alinhar com a primeira linha. |
| `.plan-card__list li::before` | `14px` | `top: 0.85em`, `padding-left: 26px` no item. |

Este motivo **substituiu o glifo ✦ (sparkle)** da identidade anterior. A classe
`.sparkle` continua existindo no HTML por compatibilidade, mas hoje é estilizada como
filete (`font-size: 0`, dimensões fixas) — ela não deve voltar a renderizar um glifo. Ao
criar uma lista ou rótulo novo, use o filete em vez de introduzir um bullet redondo, um
ícone ou um glifo unicode.

## Ênfase com `<em>` — *Camada A*

`<em>` não é itálico genérico — é o "grifo de marca": `font-style: italic`,
`font-weight: 400`, `color: var(--color-primary)`. O peso **não** é maior que o do texto
ao redor: o destaque vem do itálico serifado e da cor bronze, não de negrito. Usado para
destacar uma palavra-chave dentro de um título ou frase (ex.: "caiba na *sua rotina*",
"Acompanhamento *Trimestral*"). É o único mecanismo de ênfase textual usado no site —
não existe, por exemplo, um padrão de texto em negrito colorido ou sublinhado para o
mesmo propósito. Reutilizar `<em>` para qualquer nova ênfase textual, nos dois projetos.

## Nenhuma linha termina com palavra solta — *Camada B*

Todo texto centralizado usa `text-wrap: balance`, que distribui as palavras para as
linhas ficarem de comprimento parecido em vez de deixar uma órfã na última linha. Já vale
para `h1`, `h2` e `h3` (regra global do reset) e para os parágrafos do `.final-cta`.

Ao criar um bloco de texto centralizado novo — um subtítulo, uma chamada, um card com
texto ao centro — aplique `text-wrap: balance` junto. Reduzir `max-width` não resolve:
sem `balance`, o texto continua preenchendo a linha até o limite e jogando o resto para
baixo (medido: `583px + 246px` vira `411px + 418px` com a propriedade ligada). Em
navegadores sem suporte, o texto simplesmente quebra como antes — não há prejuízo.

## Contraste por peso, não por engrossamento — *Camada A*

A hierarquia da página é construída com **tamanho, respiro e cor**, nunca engrossando a
fonte. Títulos ficam em `300`, corpo em `300`, e o único peso alto do site é o `600` do
nome na assinatura. Se um elemento novo parece "sumir", aumente o tamanho, o espaço em
volta ou troque para itálico bronze — não suba o `font-weight`.

## Hover / elevação — *Camada B*

Padrão recorrente em elementos interativos: no hover, o elemento sobe
(`transform: translateY(-2px)` em botões, `translateY(-6px)` em `.plan-card`) e a
sombra escala de `--shadow-sm` para `--shadow-md`. Links de texto simples (`.nav__link`,
`.footer__links a`) não sobem — só mudam de cor para `--color-primary`. Ou seja,
existem dois padrões de hover, aplicados por tipo de elemento:
- **Elementos "sólidos"** (botão, card): elevação (translateY + escala de sombra).
- **Links de texto simples**: só mudança de cor.

Ao criar um componente interativo novo, escolher entre esses dois padrões conforme o
elemento seja "sólido" (superfície com sombra) ou um link de texto simples — não
inventar um terceiro tipo de feedback de hover.

## Breakpoints compartilhados — *Camada B*

O site usa um conjunto fixo e já repetido de breakpoints (`max-width`):
`1080px`, `900px`, `768px`, `620px`, `600px`, `560px`, `480px` (lista completa e uso de
cada um em `tokens.md`). Um componente novo deve quebrar nesses mesmos valores sempre
que possível, em vez de introduzir um breakpoint específico só para ele.

## Réplica de UI de terceiros (exceção de cor) — *Camada C*

O botão flutuante (`.whatsapp-float`) e o fundo de chat do mockup (`.whatsapp-mock__body`)
usam cores fixas fora da paleta da marca (verde `#25d366`, chat `#f3efe7`/`#2a231c`)
porque replicam a identidade visual **do WhatsApp**, não da marca Rafaela Schumacher.
Repare que o resto do card de depoimento **é** da marca: a barra do cabeçalho usa o
degradê bronze oficial, não o verde do WhatsApp.

Há ainda uma segunda exceção do mesmo tipo: `.whatsapp-mock__body--photo` usa `#f6f2ea`
para casar com o papel de parede que já vem dentro dos prints de conversa, de modo que a
imagem se funda ao card em vez de aparecer colada sobre um branco.

Essas são as únicas situações no código atual em que uma cor fora do token é aceitável:
quando o elemento imita a UI de um produto externo reconhecível, ou quando precisa casar
com o conteúdo de uma imagem real. Isso não abre precedente geral para cores soltas —
qualquer novo caso desse tipo deve ser confirmado com o usuário antes de ser tratado como
uma exceção válida.

## Animação de entrada ao rolar a página — *Camada B*

Qualquer bloco de conteúdo relevante (mas não elementos pequenos isolados como um único
ícone) recebe o atributo `data-reveal`. O `IntersectionObserver` em `js/main.js` observa
esses blocos com `threshold: 0.15` e adiciona `.is-visible` na primeira vez que o bloco
entra na viewport, depois para de observar (`unobserve`) — ou seja, a animação acontece
uma única vez por elemento, nunca se repete ao rolar para cima e para baixo. Reaproveitar
esse comportamento exato (observar uma vez, `threshold: 0.15`) ao aplicar `data-reveal`
em conteúdo novo.

## O que não está aqui

Regras de motion tokens nomeados (durações/easings com nome), de espaçamento em escala,
de ícones e de estados de foco/erro/desabilitado **não são padrões existentes** — são
lacunas do design system, listadas em "Decisões em aberto" em `SKILL.md`. Não inferir um
padrão para essas áreas a partir do código atual além do que está descrito aqui.
