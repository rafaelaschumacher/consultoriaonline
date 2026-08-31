# Componentes visuais — Rafaela Schumacher

Parte do design system oficial da marca (ver `SKILL.md`). Todos os componentes abaixo
já existem hoje em `css/styles.css` e `index.html` — nada aqui foi criado ou modificado
para esta documentação, apenas catalogado e classificado.

Cada componente está marcado com sua camada, conforme `SKILL.md` >
"Como o design system está organizado":

- **Camada B — componente de marca reutilizável**: peça de UI genérica, construída com
  os tokens da identidade (camada A). Deve ser levada para a plataforma de pacientes
  (reimplementada na stack nova, preservando estrutura/variantes/comportamento).
- **Camada C — padrão específico deste site**: composição ligada ao conteúdo/produto do
  site de consultoria. Não deve ser portada automaticamente — avaliar caso a caso com o
  usuário se algo equivalente faz sentido na plataforma de pacientes.

Antes de criar HTML/CSS novo para algo parecido com o que está aqui, reutilize o
componente existente em vez de recriar.

## Resumo

| Componente | Classe(s) | Camada |
|---|---|---|
| Botão | `.btn`, `.btn--primary`, `.btn--outline`, `.btn--sm` | B |
| Assinatura do nome | `.logo`, `.logo__last` | A (identidade, não um componente de UI) |
| Eyebrow + filete | `.eyebrow`, `.eyebrow--light`, `.sparkle` | B |
| Cabeçalho de seção | `.section-head` | B |
| Tag | `.tag` | B |
| Card de plano | `.plan-card`, `.plan-card--highlight`, `.plan-card__badge` | B (padrão de card) / C (conteúdo "planos") |
| FAQ accordion | `.faq__item`, `.faq__question`, `.faq__answer` | B |
| Retrato em painel | `.about-photo` | B |
| Avatar com iniciais | `.avatar-circle` | B |
| Placeholder de mídia | `.photo-placeholder`, `.photo-placeholder--hero` | B |
| Animação de entrada | `[data-reveal]` | B |
| Header / navegação | `.header`, `.nav`, `.nav__link`, `.menu-toggle` | C |
| Mockup de conversa WhatsApp | `.whatsapp-mock` e subpartes | C |
| Botão flutuante de WhatsApp | `.whatsapp-float` | C |
| Composição de cada seção da home (hero, sobre, "para você", consulta, planos, depoimentos, CTA final, footer) | `.hero`, `.about`, `.who`, `.includes`, `.services`, `.testimonials`, `.final-cta`, `.footer` | C |

---

## Botões — `.btn` — *Camada B*

Definição: `css/styles.css` (bloco "Buttons").

Todo botão é pill (`border-radius: 999px`) e usa o **rótulo em caixa alta** da marca:
`text-transform: uppercase`, `letter-spacing: 0.14em`, `font-size: 0.74rem`,
`font-weight: 500` (ver `tokens.md` → "Rótulo em caixa alta"). O texto do botão nunca é
caixa baixa.

Variantes:
- `.btn--primary` — **degradê bronze** `linear-gradient(135deg, #b09775 0%, #8a7050 100%)`,
  texto `#fff` (fixo, porque o degradê não muda no dark mode), sombra `--shadow-sm`; no
  hover o degradê escurece e o botão sobe (`translateY(-2px)`) com `--shadow-md`.
- `.btn--outline` — transparente, borda `1px solid var(--color-accent)`, texto
  `--color-text`; hover preenche com `--color-primary-light` e a borda passa a
  `--color-primary`.
- `.btn--sm` — padding e corpo reduzidos (`0.68rem`), usado no CTA da navbar.

```html
<a href="..." class="btn btn--primary">Quero começar agora</a>
<a href="..." class="btn btn--outline">Quero essa consulta</a>
<a href="..." class="btn btn--primary btn--sm nav__cta">Quero começar</a>
```

Use `.btn--primary` para a ação principal de uma seção e `.btn--outline` para ações
secundárias — não crie uma terceira variante de cor sem necessidade real. Sobre fundo
escuro (`.final-cta`), o `.btn--primary` inverte para fundo branco com texto
`--color-deep`.

## Assinatura do nome — `.logo` + `.logo__last` — *Camada A*

Não é um "componente" no sentido de peça de UI reaproveitável — é a própria forma de
escrever o nome da marca, composta por **duas tipografias na mesma linha**: nome em sans
encorpada, sobrenome em serifada itálica bronze. Por isso o sobrenome precisa vir dentro
de um `<span class="logo__last">` (ver `tokens.md` → "Assinatura do nome").

```html
<a href="#topo" class="logo">Rafaela <span class="logo__last">Schumacher</span></a>
<span class="logo">Rafaela <span class="logo__last">Schumacher</span></span>
```

`1.42rem` no header, `1.32rem` no rodapé, `white-space: nowrap` nos dois. Reproduzir
exatamente essa composição sempre que o nome aparecer como marca — inclusive na
plataforma de pacientes.

## Eyebrow (rótulo de categoria) — `.eyebrow` — *Camada B*

Rótulo uppercase acima de um `h2`, com um **filete horizontal** de `30px × 1px` na cor
`--color-accent` à esquerda, separado por `gap: 14px`. O filete é o motivo visual mais
recorrente da marca (ver `patterns.md`).

O filete é desenhado pela própria classe `.sparkle`: o glifo ✦ que ela continha na
identidade anterior foi aposentado, e a classe hoje zera o texto (`font-size: 0`) e vira
um retângulo. O `<span class="sparkle">` no HTML é mantido só como suporte do filete —
não voltar a renderizar um glifo dentro dele.

```html
<span class="eyebrow"><span class="sparkle" aria-hidden="true">&#10022;</span> Planos</span>
```

Variante `.eyebrow--light` para uso sobre fundos escuros (ex: seção `.who`).

## Cabeçalho de seção — `.section-head` — *Camada B*

Combina eyebrow + `h2` + parágrafo opcional, centralizado, largura máxima `680px` e
`margin-bottom: 64px`. É o padrão de abertura de praticamente toda seção de conteúdo
(`.includes`, `.services`, `.testimonials`, `.faq`).

```html
<div class="section-head" data-reveal>
  <span class="eyebrow"><span class="sparkle" aria-hidden="true">&#10022;</span> Planos</span>
  <h2>Escolha o plano que faz sentido para você</h2>
</div>
```

## Tag — `.tag` — *Camada B*

Pill pequena para característica/especialidade (usada em `.about__tags`). Fundo
transparente, borda `1px solid var(--color-border)`, texto `--color-text-muted` no
tratamento de rótulo em caixa alta (`0.68rem`, `letter-spacing: 0.12em`). Sem
preenchimento sólido — o contorno fino é que dá o tom.

```html
<span class="tag">Nutrição esportiva</span>
```

## Card de plano — `.plan-card` — *Camada B (padrão de card) / C (conteúdo "planos")*

O **padrão estrutural** (card com borda, sombra, estado de destaque, badge, lista, CTA no
rodapé) é um componente genérico de marca — reaproveitável sempre que houver "opções para
escolher" (planos, produtos, pacotes), inclusive na plataforma de pacientes se ela tiver
algo equivalente. O **conteúdo específico** (nomes dos planos de nutrição) é deste site.

Base: fundo `--color-surface`, borda `1px solid var(--color-border)`,
`border-radius: var(--radius-lg)`, `padding: 44px 34px`, `--shadow-sm`.

- `.plan-card--highlight` — borda `1px solid var(--color-accent)` e `--shadow-md` (em vez
  de `--shadow-sm`), usado para o plano "mais escolhido". O destaque vem da borda bronze e
  da sombra mais presente, não de um fundo diferente.
- `.plan-card__badge` — selo flutuante no topo do card (ex: "Mais escolhido"), com o
  degradê bronze oficial e texto `#fff` em caixa alta (`0.64rem`, `letter-spacing: 0.16em`).
- `.plan-card__list` — lista de itens do plano, com bullet em filete de `14px × 1px`
  (mesmo motivo do `.eyebrow`).
- `.plan-card__cta` — botão de ação do card, sempre `width: 100%`, com entreletra
  levemente reduzida (`0.1em`) para o rótulo caber numa linha só.

```html
<article class="plan-card plan-card--highlight" data-reveal>
  <span class="plan-card__badge">Mais escolhido</span>
  <h3>Acompanhamento <em>Trimestral</em></h3>
  <ul class="plan-card__list">
    <li>3 consultas</li>
  </ul>
  <a href="..." class="btn btn--primary plan-card__cta">Quero esse plano</a>
</article>
```

## FAQ accordion — `.faq__item` — *Camada B*

Comportamento (abrir/fechar, `aria-expanded`, animação de `max-height`): `js/main.js`,
bloco "FAQ accordion". A pergunta usa `--font-heading` em `400`/`1.3rem` — serifada e
leve, como os títulos; o ícone `+` é `--color-accent` e gira 45° quando aberto. Os itens
são separados só por uma linha de `1px` (`--color-border`), sem card nem fundo.
Reutilize esse padrão (HTML + comportamento) para qualquer lista de perguntas/respostas
expansível — inclusive uma seção de ajuda/FAQ na plataforma de pacientes.

```html
<div class="faq__item">
  <button class="faq__question" aria-expanded="false">
    Pergunta?
    <span class="faq__icon">+</span>
  </button>
  <div class="faq__answer">
    <p>Resposta.</p>
  </div>
</div>
```

## Retrato em painel — `.about-photo` — *Camada B*

Foto real num painel retangular vertical: `aspect-ratio: 2 / 3`, `object-fit: cover`,
`border-radius: var(--radius-lg)` e `--shadow-md`, numa coluna de `0.85fr` contra `1fr`
do texto. É o formato oficial para foto de pessoa na marca — retangular alto com cantos
arredondados, nunca recortada em círculo.

A proporção `2 / 3` é deliberada: é a da própria foto, então **nada é cortado**. Ao
trocar a imagem, prefira outra na mesma proporção vertical; se ela vier em outro formato,
ajuste `object-position` para manter o rosto na parte alta do painel em vez de aceitar o
corte no centro geométrico.

```html
<img class="about-photo" src="assets/sobre-mim.jpg" alt="Rafaela Schumacher treinando na academia">
```

## Avatar / placeholder de foto — *Camada B*

- `.avatar-circle` — círculo com iniciais sobre o degradê bronze oficial
  (`#b09775 → #8a7050`), `--font-heading` peso 300. Não está em uso na home hoje (a seção
  Sobre passou a usar `.about-photo`), mas continua sendo o padrão de avatar genérico
  para quando fizer falta — por exemplo, o avatar de um paciente na plataforma.
- `.photo-placeholder` / `.photo-placeholder--hero` — retângulo com o mesmo degradê a 30%
  de opacidade, para onde fotos reais entrarão depois. Ao trocar por uma foto real,
  remover a classe `.photo-placeholder` e manter só o container.

## Monograma "RS" (favicon) — `assets/favicon.svg` — *Camada A*

Círculo sólido `--color-deep` (`#241d17`), iniciais "RS" em serifada peso 900 (black),
cor `--color-bg` (`#fefcf9`), sem gradiente e sem anel/borda. O peso 900 é deliberado e
é a única exceção à regra de "traço fino" da marca: em tamanho real de favicon (16–32px,
testado) o traço leve da serifada não sustenta a leitura, e o anel fino do monograma
original desaparece. Se um monograma "RS" for necessário em outro contexto (não-favicon,
com mais espaço), reavaliar se o anel fino original do sistema de marca é aplicável ali,
em vez de reusar esta versão simplificada.

## Animação de entrada — `[data-reveal]` — *Camada B*

Definição CSS: linha ~100. Comportamento: `js/main.js`, bloco "Scroll reveal" (via
`IntersectionObserver`). Qualquer bloco de conteúdo que deva "aparecer" ao rolar a
página recebe o atributo `data-reveal`; a classe `.is-visible` é adicionada
automaticamente pelo JS quando o elemento entra na viewport.

```html
<div class="hero__content" data-reveal>...</div>
```

Reutilize este padrão em vez de escrever uma nova animação de scroll — inclusive ao
portar para a plataforma de pacientes, caso ela também use reveal-on-scroll.

---

## Header / navegação — `.header`, `.nav` — *Camada C*

Comportamento do menu mobile em `js/main.js`. Cabeçalho fixo (`position: sticky`) com
blur de fundo, links de navegação específicos deste site (Sobre, Para você, O que inclui,
Planos, Depoimentos, Contato) e um CTA de WhatsApp. Os links usam o rótulo em caixa alta
(`0.72rem`, `letter-spacing: 0.16em`) e `white-space: nowrap`; a assinatura tem
`flex-shrink: 0` — sem esses dois, o header quebra em duas linhas em telas médias.
Construído com componentes da camada B (`.logo`, `.btn`), mas a composição/itens do menu
são deste site — não portar a lista de links, só o padrão de "header sticky com blur +
menu mobile", se fizer sentido no app de pacientes.

## Card de depoimento (print de WhatsApp) — `.whatsapp-mock` — *Camada C*

Card que exibe um print real de conversa de WhatsApp como depoimento. Diferente da
identidade anterior (que simulava a UI do WhatsApp inteira), hoje o card é **da marca**:
a barra do cabeçalho usa o degradê bronze oficial, com o nome em rótulo caixa alta
(`0.68rem`, `letter-spacing: 0.18em`) e um ponto translúcido no lugar do avatar.

- `.whatsapp-mock__body--photo` — painel do print: altura fixa de `340px` no desktop
  (`auto` abaixo de `900px`), fundo `#f6f2ea` e a imagem em `object-fit: contain` com
  `object-position: top`. É isso que deixa todos os cards do mesmo tamanho e alinhados
  sem cortar o texto do print.
- `.whatsapp-mock__body` — variante de bolha de texto, com o fundo de chat do WhatsApp
  (ver `tokens.md` → "Exceções propositais"). Não está em uso hoje.

```html
<article class="whatsapp-mock" data-reveal>
  <div class="whatsapp-mock__header">
    <div class="whatsapp-mock__avatar photo-placeholder"></div>
    <span class="whatsapp-mock__name">Paciente.</span>
  </div>
  <div class="whatsapp-mock__body whatsapp-mock__body--photo">
    <img src="assets/testimonials/depoimento-1.jpg" alt="Print de conversa no WhatsApp: ..." class="whatsapp-mock__screenshot" loading="lazy">
  </div>
</article>
```

## Botão flutuante de WhatsApp — `.whatsapp-float` — *Camada C*

Botão fixo no canto inferior direito, cor fixa `#25d366` (verde oficial do WhatsApp, não
um token de marca). Específico do canal de contato deste site.

## Composição das seções da home — *Camada C*

`.hero`, `.about`, `.who`, `.includes`, `.services`, `.final-cta`, `.footer` (e seus
respectivos `*__inner`/`*__content`) são o arranjo específico de layout de cada seção da
página inicial deste site — construídos combinando componentes B (botões, tags, cards,
section-head) com grids e larguras próprias de cada seção. Não são "componentes de
marca" no sentido de peças reutilizáveis; são decisões de composição desta página em
particular.
