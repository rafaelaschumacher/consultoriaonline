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
`--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-border`,
`--color-primary-light`. As cores de identidade (`--color-primary`, `--color-primary-dark`,
`--color-accent`) permanecem as mesmas nos dois modos — é essa combinação (superfícies
mudam, identidade não muda) que faz o dark mode "continuar parecendo a marca". Qualquer
novo componente/seção deve seguir essa mesma regra: nunca redefinir a cor de identidade
dentro de um bloco de dark mode.

## Ritmo vertical de seção — *Camada B*

Toda `<section>` de conteúdo usa o mesmo padding vertical: `96px 0` no desktop,
reduzindo para `64px 0` a partir de `768px` (ver `tokens.md` → Layout). Nenhuma seção do
site foge desse ritmo. Uma seção nova deve usar o mesmo valor em vez de um padding
arbitrário.

## Container e grid de página — *Camada B*

Todo o conteúdo de cada seção fica dentro de `.container` (`max-width: 1140px`,
`padding: 0 24px`, centralizado). Layouts internos usam CSS Grid com 2 a 6 colunas
dependendo da seção, sempre colapsando para menos colunas nos breakpoints já
documentados em `tokens.md` (nunca um breakpoint novo só para uma grade específica).

## Motivo de bullets customizados — *Camada A (o motivo) / B (a regra de uso)*

Duas marcas visuais recorrentes usadas em `::before` de itens de lista:
- **Sparkle** `\2726` (✦), cor `--color-accent` — usado em `.who__list li`,
  `.includes__item h3`, `.plan-card__list li`, e no próprio `.eyebrow`. É o "selo"
  visual da marca, reservado para destacar um item de primeiro nível/importante.
- **Dash** `\2013` (–), cor `--color-primary` — usado em `.includes__sublist li`,
  reservado para itens secundários/sub-lista, dentro de um item que já usa sparkle.

Regra de uso observada no código: sparkle marca o item principal de uma lista; dash
marca uma sub-lista dentro dele. Ao criar uma lista nova, escolher entre esses dois
padrões conforme o nível hierárquico do item — não introduzir um terceiro glifo/estilo
de marcador.

## Ênfase com `<em>` — *Camada A*

`<em>` não é itálico genérico — é o "grifo de marca": `font-style: italic`,
`font-weight: 600`, `color: var(--color-primary-dark)`. Usado para destacar uma
palavra-chave dentro de um título ou frase (ex.: "caiba na *sua vida*",
"Acompanhamento *Trimestral*"). É o único mecanismo de ênfase textual usado no site —
não existe, por exemplo, um padrão de texto em negrito colorido ou sublinhado para o
mesmo propósito. Reutilizar `<em>` para qualquer nova ênfase textual, nos dois projetos.

## Hover / elevação — *Camada B*

Padrão recorrente em elementos interativos: no hover, o elemento sobe
(`transform: translateY(-2px)` em botões, `translateY(-6px)` em `.plan-card`) e a
sombra escala de `--shadow-sm` para `--shadow-md`. Links de texto simples (`.nav__link`,
`.footer__links a`) não sobem — só mudam de cor para `--color-primary-dark`. Ou seja,
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

O mockup de WhatsApp (`.whatsapp-mock`) e o botão flutuante (`.whatsapp-float`) usam
cores fixas fora da paleta da marca (verde `#25d366`, fundo de chat `#e5efdb`/`#1f2a19`)
porque replicam a identidade visual **do WhatsApp**, não da marca Rafaela Schumacher.
Essa é a única situação no código atual em que uma cor fora do token é aceitável: quando
o elemento está deliberadamente imitando a UI de um produto externo reconhecível. Isso
não abre precedente geral para cores soltas — qualquer novo caso desse tipo deve ser
confirmado com o usuário antes de ser tratado como uma exceção válida.

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
