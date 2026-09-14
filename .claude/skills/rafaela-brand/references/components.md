# Componentes visuais — Rafaela Schumacher

Parte do design system oficial da marca (ver `SKILL.md`). Todos os componentes abaixo já
existem em `css/styles.css` e `index.html` — nada aqui foi criado para esta documentação,
apenas catalogado e classificado.

Cada componente está marcado com sua camada, conforme `SKILL.md` >
"Como o design system está organizado":

- **Camada B — componente de marca reutilizável**: peça de UI genérica, construída com os
  tokens da identidade (camada A). Deve ser levada para a plataforma de pacientes
  (reimplementada na stack nova, preservando estrutura/variantes/comportamento).
- **Camada C — padrão específico deste site**: composição ligada ao conteúdo/produto do
  site de consultoria. Não portar automaticamente — avaliar caso a caso com a usuária.

Antes de criar HTML/CSS novo para algo parecido com o que está aqui, reutilize o
componente existente em vez de recriar.

## Resumo

| Componente | Classe(s) | Camada |
|---|---|---|
| Botão | `.btn`, `.btn--primary`, `.btn--outline`, `.btn--sm` | B |
| Assinatura da marca | `.brand`, `.brand__mark`, `.brand__name`, `.brand__role` | A (identidade, não uma peça de UI) |
| Eyebrow + filete | `.eyebrow` | B |
| Cabeçalho de seção | `.section-head` | B |
| Tag | `.tag` | B |
| Passo numerado | `.step`, `.steps__grid` | B |
| Card de plano | `.plan-card`, `.plan-card--highlight`, `.plan-card__badge` | B (padrão de card) / C (conteúdo "planos") |
| FAQ accordion | `.faq__item`, `.faq__question`, `.faq__answer` | B |
| Painel escuro | `.panel` | B |
| Retrato em painel | `.about-photo`, `.about__credential` | B |
| Lightbox de imagem | `.lightbox` | B |
| Botão de tema | `.theme-toggle` | B |
| Link "pular para o conteúdo" | `.skip-link` | B |
| Animação de entrada | `[data-reveal]`, `[data-reveal-stagger]` | B |
| Header / navegação | `.header`, `.nav`, `.nav__link`, `.menu-toggle`, `.nav-scrim` | C |
| Card de depoimento | `.testimonial` e subpartes | C |
| Botão flutuante de WhatsApp | `.whatsapp-float` | C |
| Composição de cada seção da home | `.hero`, `.about`, `.who`, `.steps`, `.includes`, `.services`, `.testimonials`, `.final-cta`, `.footer` | C |

---

## Botões — `.btn` — *Camada B*

Todo botão é pill (`border-radius: 999px`), tem `min-height: 48px` e usa o **rótulo em
caixa alta** da marca: `text-transform: uppercase`, `letter-spacing: .15em`,
`font-size: clamp(.7rem, .68rem + .1vw, .75rem)`, `font-weight: 500`. O texto do botão
nunca é caixa baixa.

Variantes:

- `.btn--primary` — **degradê dourado** (`--gold-grad`), texto `var(--on-gold)` e
  `--shadow-sm`. No hover sobe 2px, ganha `--shadow-gold` e `filter: brightness(1.06)` —
  o degradê em si não muda.
- `.btn--outline` — transparente, borda `1px solid var(--border-strong)`, texto `--text`;
  no hover a borda vira `--gold` e o fundo recebe `--gold-wash`.
- `.btn--sm` — `min-height: 44px`, `padding: 11px 20px`, `font-size: .66rem`. Usado no CTA
  da navbar, onde o espaço é medido (ver `patterns.md` → "O header tem um limite de
  largura real").

```html
<a href="..." class="btn btn--primary">Quero começar agora</a>
<a href="#planos" class="btn btn--outline">Conhecer os planos</a>
<a href="..." class="btn btn--primary btn--sm nav__cta">Quero começar</a>
```

Sobre `.panel` (fundo escuro nos dois temas), o `.btn--primary` inverte para fundo
`--panel-text` com texto `#14120F`, e o `.btn--outline` passa a usar borda e texto marfim
translúcidos.

## Assinatura da marca — `.brand` — *Camada A*

Não é um componente reaproveitável no sentido de peça de UI — é a própria forma de
escrever o nome da marca: **selo + nome + cargo**. Ver `tokens.md` → "Assinatura do nome"
para os valores exatos.

```html
<a href="#topo" class="brand" aria-label="Rafaela Schumacher, nutricionista — início">
  <span class="brand__mark" aria-hidden="true"><!-- SVG do monograma RS --></span>
  <span class="brand__text">
    <span class="brand__name">Rafaela <em>Schumacher</em></span>
    <span class="brand__role">Nutricionista</span>
  </span>
</a>
```

O selo é o mesmo SVG dos arquivos em `assets/logo/`, inline e em `currentColor`, para
herdar `--gold` e acompanhar o tema. `.brand` tem `flex-shrink: 0` — sem isso o header
quebra em duas linhas em telas médias.

## Eyebrow (rótulo de categoria) — `.eyebrow` — *Camada B*

Rótulo uppercase acima de um `h2`, em `--gold`, com `letter-spacing: .24em` e um **filete
horizontal** de `clamp(20px, 4vw, 34px) × 1px` à esquerda (`::before`, `opacity: .7`),
separado por `gap: 14px`.

Dentro de um `.section-head` (centralizado), ganha um **segundo filete** depois do texto
via `::after`, formando uma composição simétrica. Dentro de `.panel`, a cor passa a
`--gold-on-panel`.

```html
<span class="eyebrow">Planos</span>
```

O filete é desenhado inteiramente por pseudo-elementos — **não** existe mais um
`<span class="sparkle">` nem um glifo ✦ no HTML.

## Cabeçalho de seção — `.section-head` — *Camada B*

Combina eyebrow + `h2` + parágrafo opcional, centralizado. É o padrão de abertura de
praticamente toda seção de conteúdo (`.steps`, `.includes`, `.services`, `.testimonials`,
`.faq`).

```html
<div class="section-head" data-reveal>
  <span class="eyebrow">Planos</span>
  <h2>Escolha o plano que faz sentido para você</h2>
</div>
```

## Tag — `.tag` — *Camada B*

Pill pequena para característica/especialidade (usada em `.about__tags`). Fundo
transparente, borda `1px solid var(--border)`, texto `--text-muted` no tratamento de
rótulo em caixa alta (`.66rem`, `letter-spacing: .12em`). Sem preenchimento sólido — o
contorno fino é que dá o tom.

```html
<li class="tag">Nutrição esportiva</li>
```

## Passo numerado — `.step` — *Camada B*

Item de um processo sequencial, usado na seção "Como funciona". O numeral vem de um
`counter` CSS (`content: "0" counter(step)`) em `--font-display`, `1.55rem`, cor `--gold`,
sob um filete de topo (`border-top: 1px solid var(--border)`).

```html
<div class="steps__grid" data-reveal data-reveal-stagger>
  <article class="step" style="--i:0">
    <h3>Conversa</h3>
    <p>Você me chama no WhatsApp…</p>
  </article>
</div>
```

**Use numeração só quando a ordem for informação de verdade** (um processo, uma
cronologia). Para uma lista de itens sem sequência, o componente certo é
`.includes__item`, que usa filete no lugar do numeral.

## Card de plano — `.plan-card` — *Camada B (padrão de card) / C (conteúdo "planos")*

O **padrão estrutural** (card com borda, sombra, estado de destaque, badge, lista, CTA no
rodapé) é genérico e reaproveitável sempre que houver "opções para escolher". O
**conteúdo específico** (nomes dos planos de nutrição) é deste site.

Base: fundo `--surface`, borda `1px solid var(--border)`,
`border-radius: var(--radius-lg)`, `--shadow-sm`.

- `.plan-card--highlight` — borda `--gold-dim`, `--shadow-md` e um degradê vertical sutil
  de `--gold-wash` para `--surface` no topo. O destaque vem da borda e da sombra, não de
  um fundo chapado diferente.
- `.plan-card__badge` — selo flutuante no topo (ex: "Mais escolhido"), com o degradê
  dourado oficial e texto `--on-gold` em caixa alta.
- `.plan-card__list` — itens com bullet em filete (mesmo motivo do `.eyebrow`).
- `.plan-card__cta` — `width: 100%`, com `padding-inline: 18px`, `letter-spacing: .1em` e
  `white-space: nowrap`, para o rótulo caber em **uma linha só**. Sem isso, "Quero essa
  consulta" quebra em duas linhas e desalinha a altura dos três cards.

```html
<article class="plan-card plan-card--highlight" style="--i:1">
  <span class="plan-card__badge">Mais escolhido</span>
  <h3>Acompanhamento <em>Trimestral</em></h3>
  <ul class="plan-card__list"><li>3 consultas</li></ul>
  <a href="..." class="btn btn--primary plan-card__cta">Quero esse plano</a>
</article>
```

## FAQ accordion — `.faq__item` — *Camada B*

Comportamento em `js/main.js`. A pergunta usa `--font-display` — serifada e leve, como os
títulos; o ícone `+` é `--gold` e gira 45° quando aberto. Os itens são separados só por
uma linha de `1px`, sem card nem fundo. O botão carrega `aria-expanded` e `aria-controls`.

```html
<div class="faq__item">
  <button class="faq__question" aria-expanded="false" aria-controls="faq-1">
    Pergunta? <span class="faq__icon" aria-hidden="true">+</span>
  </button>
  <div class="faq__answer" id="faq-1"><p>Resposta.</p></div>
</div>
```

## Painel escuro — `.panel` — *Camada B*

Seção de fundo escuro que marca uma virada na página. Usa `--panel-grad` (radial sutil) e
é escura **nos dois temas** — por isso tudo dentro dela usa os tokens próprios
`--panel-text`, `--panel-muted` e `--gold-on-panel`, e o anel de foco vira `#F4EFE6`.

No site é usado em `.who` ("Para você") e `.final-cta`. Basta somar a classe:
`<section class="who panel">`.

## Retrato em painel — `.about-photo` + `.about__credential` — *Camada B*

Foto real num painel retangular vertical: `aspect-ratio: 2 / 3`, `object-fit: cover`,
`border-radius: var(--radius-lg)` e `--shadow-md`, numa coluna de `.85fr` contra `1fr` do
texto. É o formato oficial para foto de pessoa na marca — retangular alto com cantos
arredondados, **nunca recortada em círculo**.

A proporção `2 / 3` é deliberada. **Corte a imagem nessa proporção antes de subir**, num
editor, decidindo onde o corte cai — não deixe o `object-fit: cover` cortar pelo centro
geométrico, que quase nunca é onde está o rosto. O retrato atual veio em 1792×2400 (3:4),
foi cortado para 1407×2110 a partir de (233, 150) — centrado no sujeito, terminando na
cintura — e reduzido para 1020×1530 na entrega. O respiro acima da cabeça é de 90px, ~4%
da altura do quadro: **fechar o topo obriga a estreitar as laterais junto**, senão a
proporção 2:3 quebra, então cada corte de respiro vem com um pouco de aproximação. `object-position` é o último
recurso, para quando não dá para recortar o arquivo.

**Corte fechado custa resolução.** O painel exibe `470×704` no desktop e `340×510` no
celular, então o alvo de entrega é o maior dos dois em pixels físicos: `940` para cobrir um
desktop 2× e `1020` para cobrir um celular 3×. Acima disso o arquivo pesa sem que tela
nenhuma consiga mostrar a diferença. Meça a densidade antes de fechar o enquadramento:
`largura do recorte ÷ 470` no desktop, `÷ 340` no celular. O retrato atual entrega 2,17× e
3,00×.

**Peça o original na maior resolução disponível.** Um corte de busto num arquivo de
896×1200 sobra `533×800` (1,13×) e um de peito para cima sobra `440×660` (0,94×) —
visivelmente macios em tela retina. O mesmo enquadramento num arquivo 2× nasce com folga.

`.about__credential` é uma legenda **opcional**: rótulo em caixa alta dourado (`.64rem`,
`letter-spacing: .22em`) precedido de um filete de 24px. Use quando a foto puder ser lida
como *exemplo de resultado* — uma imagem de palco ou de físico precisa da legenda para ler
como credencial em vez de "é assim que você tem que ficar". Um retrato de estúdio não
carrega esse risco e dispensa a legenda; é por isso que ela não aparece na home hoje.

```html
<figure class="about__figure" data-reveal>
  <picture>
    <source srcset="assets/retrato.webp" type="image/webp">
    <img class="about-photo" src="assets/retrato.jpg" width="740" height="1110"
         alt="…" loading="lazy" decoding="async">
  </picture>
  <!-- <figcaption class="about__credential">Olympia Amateur Brasil · 2025</figcaption> -->
</figure>
```

## Lightbox de imagem — `.lightbox` — *Camada B*

`<dialog>` nativo para ampliar uma imagem. `max-width: min(92vw, 700px)`,
`max-height: 92dvh`, fundo transparente e `::backdrop` escuro com `blur(4px)`. Fecha no
`Esc` e no clique fora, e devolve o foco ao botão que o abriu.

Qualquer imagem ampliável usa este componente — não escreva um modal novo.

```html
<button class="testimonial__btn" type="button" data-lightbox>…</button>
<dialog class="lightbox" id="lightbox" aria-label="Depoimento ampliado">
  <button class="lightbox__close" type="button" id="lightboxClose" aria-label="Fechar">&times;</button>
  <img id="lightboxImg" src="" alt="">
</dialog>
```

## Botão de tema — `.theme-toggle` — *Camada B*

Botão circular de `44×44` (alvo de toque mínimo) com borda de 1px, contendo dois SVGs —
lua e sol — dos quais só um é exibido por vez, conforme o `data-theme`. Precisa de
`aria-label`, porque não tem texto.

É o único controle que muda a aparência do site inteiro; ver `patterns.md` → "Os dois
temas são um só desenho" e "O header tem um limite de largura real".

## Link "pular para o conteúdo" — `.skip-link` — *Camada B*

Primeiro elemento focável da página, escondido acima da tela
(`transform: translate(-50%, -120%)`) até receber foco. Fundo `--gold`, texto `--on-gold`.
Obrigatório em qualquer página nova.

## Animação de entrada — `[data-reveal]` — *Camada B*

Ver `patterns.md` → "Entrada ao rolar". Qualquer bloco que deva aparecer ao rolar recebe
`data-reveal`; para cascata, o container recebe `data-reveal-stagger` e cada filho um
`style="--i:N"`.

---

## Header / navegação — `.header`, `.nav` — *Camada C*

Cabeçalho `position: sticky` com `backdrop-filter: blur`, links específicos deste site e um
CTA de WhatsApp. Ganha borda e sombra ao rolar, via classe `.is-stuck`. Abaixo de 1180px a
`.nav` vira gaveta lateral com véu (`.nav-scrim`), trava de rolagem, `Esc` e foco preso.

**Este componente tem um limite de largura calculado** — leia `patterns.md` → "O header
tem um limite de largura real" antes de adicionar ou remover qualquer item do menu.

Construído com componentes da camada B (`.brand`, `.btn`, `.theme-toggle`), mas a
composição e a lista de links são deste site.

## Card de depoimento — `.testimonial` — *Camada C*

Card que exibe um print real de conversa de WhatsApp. A barra do cabeçalho usa o degradê
dourado oficial, com o nome em rótulo caixa alta e um avatar com a inicial.

Os cards vivem numa grade **masonry por colunas CSS** (`.testimonials__grid { columns: 3 }`,
caindo para 2 e 1), com `break-inside: avoid` em cada card. É isso que permite cada print
aparecer inteiro, na proporção real — em vez de espremido numa caixa de altura fixa. Cada
print é um `<button data-lightbox>` que abre o `.lightbox`.

## Botão flutuante de WhatsApp — `.whatsapp-float` — *Camada C*

Botão fixo no canto inferior direito, cor fixa `#25d366` (verde oficial do WhatsApp, não um
token de marca). Some ao chegar no rodapé.

## Composição das seções da home — *Camada C*

`.hero`, `.about`, `.who`, `.steps`, `.includes`, `.services`, `.testimonials`,
`.final-cta` e `.footer` (com seus `*__inner`/`*__content`) são o arranjo específico de
layout de cada seção desta página — combinações de componentes B com grades e larguras
próprias. Não são "componentes de marca" reutilizáveis; são decisões de composição desta
página.

As grades usam `repeat(auto-fit, minmax(min(Xpx, 100%), 1fr))`, degradando de 3 → 2 → 1
coluna sozinhas, em vez de saltar de 3 direto para 1 num breakpoint.
