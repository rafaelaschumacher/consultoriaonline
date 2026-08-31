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
| Wordmark/logo | `.logo` | A (identidade, não um componente de UI) |
| Eyebrow + sparkle | `.eyebrow`, `.eyebrow--light`, `.sparkle` | B |
| Cabeçalho de seção | `.section-head` | B |
| Tag | `.tag` | B |
| Card de plano | `.plan-card`, `.plan-card--highlight`, `.plan-card__badge` | B (padrão de card) / C (conteúdo "planos") |
| FAQ accordion | `.faq__item`, `.faq__question`, `.faq__answer` | B |
| Avatar com iniciais | `.avatar-circle` | B |
| Placeholder de mídia | `.photo-placeholder`, `.photo-placeholder--hero` | B |
| Animação de entrada | `[data-reveal]` | B |
| Header / navegação | `.header`, `.nav`, `.nav__link`, `.menu-toggle` | C |
| Mockup de conversa WhatsApp | `.whatsapp-mock` e subpartes | C |
| Botão flutuante de WhatsApp | `.whatsapp-float` | C |
| Composição de cada seção da home (hero, sobre, "para você", consulta, planos, depoimentos, CTA final, footer) | `.hero`, `.about`, `.who`, `.includes`, `.services`, `.testimonials`, `.final-cta`, `.footer` | C |

---

## Botões — `.btn` — *Camada B*

Definição: `css/styles.css` (bloco "Buttons", por volta da linha 66).

Variantes:
- `.btn--primary` — fundo `--color-primary`, texto branco, sombra `--shadow-sm`; hover
  escurece para `--color-primary-dark` e sobe (`translateY(-2px)`) com `--shadow-md`.
- `.btn--outline` — transparente, borda `1.5px solid var(--color-primary)`, texto
  `--color-primary-dark`; hover preenche com `--color-primary-light`.
- `.btn--sm` — padding reduzido, usado no CTA da navbar.

Formato sempre pill (`border-radius: 999px`), `font-weight: 700`.

```html
<a href="..." class="btn btn--primary">Quero começar agora</a>
<a href="..." class="btn btn--outline">Seguir @rafaschumacherr</a>
<a href="..." class="btn btn--primary btn--sm nav__cta">Quero começar</a>
```

Use `.btn--primary` para a ação principal de uma seção e `.btn--outline` para ações
secundárias — não crie uma terceira variante de cor sem necessidade real.

## Wordmark — `.logo` — *Camada A*

Definição: linha ~93. Não é um "componente" no sentido de peça de UI reaproveitável em
vários contextos — é a própria forma de escrever o nome da marca: `font-heading`
(Playfair Display), `font-weight: 600`, `letter-spacing: 0.01em`,
`color: var(--color-primary-dark)`. Tratar como parte da identidade (camada A):
reproduzir exatamente essa combinação sempre que o nome da marca aparecer como
wordmark, tanto no header quanto no footer.

```html
<a href="#topo" class="logo">Rafaela Schumacher</a>
```

## Eyebrow (rótulo de categoria) — `.eyebrow` — *Camada B*

Definição: linha ~109. Rótulo uppercase acima de um `h2`, com o glifo sparkle (✦,
`&#10022;` / `\2726`) à esquerda — é o motivo visual mais recorrente da marca (ver
também `patterns.md`).

```html
<span class="eyebrow"><span class="sparkle">&#10022;</span> Sobre mim</span>
```

Variante `.eyebrow--light` para uso sobre fundos escuros (ex: seção `.who`).

## Cabeçalho de seção — `.section-head` — *Camada B*

Definição: linha ~350. Combina eyebrow + `h2` + parágrafo, centralizado, largura
máxima 640px. É o padrão de abertura de praticamente toda seção de conteúdo
(`.includes`, `.services`, `.testimonials`, `.instagram`, `.faq`).

```html
<div class="section-head" data-reveal>
  <span class="eyebrow"><span class="sparkle">&#10022;</span> Planos</span>
  <h2>Escolha o plano que faz sentido para você</h2>
</div>
```

## Tag — `.tag` — *Camada B*

Definição: linha ~271. Pill pequena para característica/especialidade (usado em
`.about__tags`). Fundo `--color-bg`, borda `--color-border`, texto
`--color-primary-dark`.

```html
<span class="tag">Nutrição esportiva</span>
```

## Card de plano — `.plan-card` — *Camada B (padrão de card) / C (conteúdo "planos")*

Definição: linha ~367. O **padrão estrutural** (card com borda, sombra, estado de
destaque, badge, lista, CTA no rodapé) é um componente genérico de marca — reaproveitável
sempre que houver "opções para escolher" (planos, produtos, pacotes), inclusive na
plataforma de pacientes se ela tiver algo equivalente. O **conteúdo específico** (nomes
dos planos de nutrição, preços) é deste site.

- `.plan-card--highlight` — borda `--color-accent`, fundo `--color-bg` (ao invés de
  `--color-bg-alt`), usado para o plano "mais escolhido".
- `.plan-card__badge` — selo flutuante no topo do card (ex: "Mais escolhido"), fundo
  `--color-accent`.
- `.plan-card__list` — lista de itens do plano, com bullet sparkle (mesmo motivo do
  `.eyebrow`).
- `.plan-card__cta` — botão de ação do card, sempre `width: 100%`.

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

Definição CSS: linha ~514. Comportamento (abrir/fechar, `aria-expanded`, animação de
`max-height`): `js/main.js`, bloco "FAQ accordion". Reutilize esse padrão (HTML +
comportamento) para qualquer lista de perguntas/respostas expansível — inclusive uma
seção de ajuda/FAQ na plataforma de pacientes.

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

## Avatar / placeholder de foto — *Camada B*

- `.avatar-circle` (linha ~252) — círculo com iniciais sobre gradiente
  `linear-gradient(135deg, var(--color-primary), var(--color-accent))`. Usado em
  "Sobre mim", hoje fixo com o texto "RS". O padrão (círculo com gradiente de marca +
  iniciais) é reutilizável como avatar genérico.
- `.photo-placeholder` / `.photo-placeholder--hero` (linha ~194) — retângulo com o
  mesmo gradiente a 35% de opacidade, para onde fotos reais entrarão depois. Ao trocar
  por uma foto real, remover a classe `.photo-placeholder` e manter só o container.

## Monograma "RS" (favicon) — `assets/favicon.svg` — *Camada A*

Círculo sólido `--color-primary-dark` (`#4f5d3f`), iniciais "RS" em Playfair Display
peso 900 (black), cor `--color-bg` (`#fdfbf6`), sem gradiente e sem anel/borda. É uma
versão simplificada do monograma em anel fino de um sistema de marca mais amplo
(logo + paleta) fornecido pela usuária em 2026-08-31 — o anel de 1px e o peso regular
da Playfair não seguram a leitura em tamanho real de favicon (16–32px, testado);
peso 900 + sem anel continua legível nesse tamanho. Se um monograma "RS" for
necessário em outro contexto (não-favicon, com mais espaço), reavaliar se o anel fino
original do sistema de marca é aplicável ali, em vez de reusar esta versão simplificada.

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

Definição: linha ~123 (`css/styles.css`); comportamento do menu mobile em `js/main.js`.
Cabeçalho fixo (`position: sticky`) com blur de fundo, links de navegação específicos
deste site (Sobre, Para você, Consulta, Planos, Depoimentos, Contato) e um CTA de WhatsApp.
Construído com componentes da camada B (`.logo`, `.btn`), mas a composição/itens do menu
são deste site — não portar a lista de links, só o padrão de "header sticky com blur +
menu mobile", se fizer sentido no app de pacientes.

## Mockup de conversa WhatsApp — `.whatsapp-mock` — *Camada C*

Definição: linha ~437. Simula um print de conversa de WhatsApp para depoimentos. Usa
cores fixas do WhatsApp (ver `tokens.md` → "Exceções propositais"), não os tokens de
marca — específico deste formato de depoimento, não um componente de marca genérico.

```html
<article class="whatsapp-mock" data-reveal>
  <div class="whatsapp-mock__header">
    <div class="whatsapp-mock__avatar photo-placeholder"></div>
    <span class="whatsapp-mock__name">Paciente M.</span>
  </div>
  <div class="whatsapp-mock__body">
    <div class="whatsapp-mock__bubble">
      <p>Texto do depoimento...</p>
      <span class="whatsapp-mock__meta">09:42</span>
    </div>
  </div>
</article>
```

## Botão flutuante de WhatsApp — `.whatsapp-float` — *Camada C*

Definição: linha ~591. Botão fixo no canto inferior direito, cor fixa
`#25d366` (verde oficial do WhatsApp, não um token de marca). Específico do canal de
contato deste site.

## Composição das seções da home — *Camada C*

`.hero`, `.about`, `.who`, `.includes`, `.services`, `.final-cta`, `.footer` (e seus
respectivos `*__inner`/`*__content`) são o arranjo específico de layout de cada seção da
página inicial deste site — construídos combinando componentes B (botões, tags, cards,
section-head) com grids e larguras próprias de cada seção. Não são "componentes de
marca" no sentido de peças reutilizáveis; são decisões de composição desta página em
particular.
