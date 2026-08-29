# Componentes reutilizáveis — Rafaela Schumacher

Todos definidos em `css/styles.css`, usados em `index.html`. Antes de criar HTML/CSS
novo para algo parecido, veja se um destes já resolve — adapte-o em vez de recriar.

## Botões — `.btn`

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

## Eyebrow (rótulo de categoria) — `.eyebrow`

Definição: linha ~109. Rótulo uppercase acima de um `h2`, com o glifo sparkle (✦,
`&#10022;` / `\2726`) à esquerda — é o motivo visual mais recorrente da marca.

```html
<span class="eyebrow"><span class="sparkle">&#10022;</span> Sobre mim</span>
```

Variante `.eyebrow--light` para uso sobre fundos escuros (ex: seção `.who`).

## Cabeçalho de seção — `.section-head`

Definição: linha ~350. Combina eyebrow + `h2` + parágrafo, centralizado, largura
máxima 640px. É o padrão de abertura de praticamente toda seção de conteúdo
(`.includes`, `.services`, `.testimonials`, `.instagram`, `.faq`).

```html
<div class="section-head" data-reveal>
  <span class="eyebrow"><span class="sparkle">&#10022;</span> Planos</span>
  <h2>Escolha o plano que faz sentido para você</h2>
</div>
```

## Tag — `.tag`

Definição: linha ~271. Pill pequena para característica/especialidade (usado em
`.about__tags`). Fundo `--color-bg`, borda `--color-border`, texto
`--color-primary-dark`.

```html
<span class="tag">Nutrição esportiva</span>
```

## Card de plano — `.plan-card`

Definição: linha ~367. Card usado na grade de planos/produtos, com estado de
destaque opcional.

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

Use este componente para qualquer grade de "opções para escolher" (planos, produtos,
pacotes) — inclusive na plataforma de pacientes, se ela tiver algo equivalente.

## Mockup de conversa WhatsApp — `.whatsapp-mock`

Definição: linha ~437. Simula um print de conversa de WhatsApp para depoimentos.
Usa cores fixas do WhatsApp (ver `tokens.md` → "Exceções propositais"), não os tokens
de marca — isso é intencional, não replicar esse padrão de cor em outro componente.

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

## FAQ accordion — `.faq__item`

Definição CSS: linha ~514. Comportamento (abrir/fechar, `aria-expanded`, animação de
`max-height`): `js/main.js`, bloco "FAQ accordion". Reutilize esse padrão (HTML +
comportamento) para qualquer lista de perguntas/respostas expansível.

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

## Avatar / placeholder de foto

- `.avatar-circle` (linha ~252) — círculo com iniciais sobre gradiente
  `linear-gradient(135deg, var(--color-primary), var(--color-accent))`. Usado em
  "Sobre mim".
- `.photo-placeholder` / `.photo-placeholder--hero` (linha ~194) — retângulo com o
  mesmo gradiente a 35% de opacidade, para onde fotos reais entrarão depois. Ao trocar
  por uma foto real, remover a classe `.photo-placeholder` e manter só o container.

## Animação de entrada — `[data-reveal]`

Definição CSS: linha ~100. Comportamento: `js/main.js`, bloco "Scroll reveal" (via
`IntersectionObserver`). Qualquer bloco de conteúdo que deva "aparecer" ao rolar a
página recebe o atributo `data-reveal`; a classe `.is-visible` é adicionada
automaticamente pelo JS quando o elemento entra na viewport.

```html
<div class="hero__content" data-reveal>...</div>
```

Reutilize este padrão em vez de escrever uma nova animação de scroll — inclusive ao
portar para a plataforma de pacientes, caso ela também use reveal-on-scroll.

## Motivo de bullets customizados

Duas marcas visuais recorrentes usadas em `::before` de itens de lista:
- Sparkle `\2726` (✦), cor `--color-accent` — usado em `.who__list li`,
  `.includes__item h3`, `.plan-card__list li`. É o "selo" visual da marca para
  destacar um item importante.
- Dash `\2013` (–), cor `--color-primary` — usado em `.includes__sublist li` para
  itens secundários/sub-lista.

Ao criar uma nova lista com bullet customizado, escolha entre esses dois padrões em
vez de inventar um terceiro glifo/estilo de marcador.
