# Tokens de marca — Rafaela Schumacher

Fonte real: `css/styles.css`, bloco `:root` (linhas 1–25) e o override de dark mode em
`@media (prefers-color-scheme: dark)` (linhas 27–36).

Estes são os únicos valores de cor/fonte/raio/sombra/espaçamento que devem ser usados.
Se uma necessidade não é coberta por nenhum destes, siga a regra "Realmente não existe
nada parecido?" em `SKILL.md` antes de inventar um valor novo.

## Cores

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--color-primary` | `#7c8f6a` | (igual) | Cor primária da marca (verde-sálvia). Botões primários, links de destaque, ícones. |
| `--color-primary-dark` | `#4f5d3f` | (igual) | Hover de botão primário, texto de destaque (`<em>`), fundos escuros de seção (`.who`). |
| `--color-primary-light` | `#eef1e6` | `#2b3324` | Hover de botão outline, fundos suaves. |
| `--color-accent` | `#c8a24d` | (igual) | Dourado — badges, sparkle (✦), estrelas, detalhes de destaque. Não é uma cor "livre" para qualquer destaque; é reservada para esse papel de acento pontual. |
| `--color-bg` | `#fdfbf6` | `#1c1b16` | Fundo padrão de página. |
| `--color-bg-alt` | `#f4f0e6` | `#26251d` | Fundo alternado de seção (zebra entre seções). |
| `--color-text` | `#33322c` | `#f1efe6` | Texto principal. |
| `--color-text-muted` | `#726d5f` | `#b8b2a0` | Texto secundário/legendas. |
| `--color-border` | `#e6e0d0` | `#37352a` | Bordas sutis (cards, divisores, header). |
| `--color-star` | `#c8a24d` | (igual) | Alias de `--color-accent` para contexto de avaliação/estrelas. |

O dark mode é acionado via `prefers-color-scheme: dark` — **não** por uma classe ou
atributo manual. Ele só redefine bg/bg-alt/text/text-muted/border/primary-light; as
demais cores (primary, primary-dark, accent) permanecem as mesmas nos dois modos.

### Exceções propositais (não são tokens de marca)

Alguns componentes usam cores fixas fora da paleta porque representam identidade de
terceiros, não a marca:
- `.whatsapp-float` e o ícone do WhatsApp: `#25d366` (verde oficial do WhatsApp).
- `.whatsapp-mock__body`: `#e5efdb` light / `#1f2a19` dark — simula o fundo de chat do
  WhatsApp, não é um token de marca reutilizável em outros contextos.

Não trate essas cores como precedente para "cores soltas são aceitáveis" — elas existem
porque replicam a UI de um produto externo (WhatsApp), não porque a marca tem uma
segunda paleta.

## Tipografia

- `--font-heading` e `--font-body`: **`'Plus Jakarta Sans'`**, com fallback
  `ui-sans-serif, system-ui, 'Segoe UI', sans-serif`. É a única família tipográfica da
  marca — usada tanto em títulos quanto em corpo de texto. Não introduza uma segunda
  fonte "só para títulos" ou "só para um destaque".
- Carregada via Google Fonts (pesos `400,500,600,700,800` normal + itálico
  `500,600,700`). Ao portar para outro projeto/stack, garanta que os mesmos pesos
  estejam disponíveis.
- `h1`, `h2`, `h3`: `font-family: var(--font-heading)`, `font-weight: 700`,
  `line-height: 1.2`, `letter-spacing: -0.01em`.
- `<em>` é usado como **grifo de marca**, não itálico genérico: `font-style: italic`,
  `font-weight: 600`, `color: var(--color-primary-dark)`. É o padrão usado para destacar
  uma palavra-chave dentro de um título (ex: "caiba na *sua vida*"). Reutilize esse
  padrão para dar ênfase em vez de inventar outra forma de destaque (negrito colorido,
  sublinhado, etc.).

## Raios de borda

| Token | Valor | Uso típico |
|---|---|---|
| `--radius-sm` | `10px` | Elementos pequenos. |
| `--radius-md` | `16px` | Cards médios (`.includes__item`, `.whatsapp-mock`). |
| `--radius-lg` | `22px` | Cards grandes/destacados (`.plan-card`, `.photo-placeholder`). |
| — | `999px` (pill) | Botões (`.btn`) e badges/tags — hardcoded como pill shape, não um token separado, mas é o padrão consistente para qualquer elemento "arredondado total". |

## Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 3px 14px rgba(60, 60, 40, 0.07)` | Estado padrão de cards/botões. |
| `--shadow-md` | `0 14px 34px rgba(60, 60, 40, 0.12)` | Estado hover/elevado. |

## Layout, espaçamento e breakpoints

- `--container-width: 1140px` — largura máxima do conteúdo (`.container`), com
  `padding: 0 24px`.
- Ritmo vertical de seção: `section { padding: 96px 0 }` no desktop,
  `64px 0` a partir de `768px`. Qualquer seção nova deve seguir esse ritmo, não um
  padding arbitrário.
- Breakpoints usados no site (mobile-first via `max-width`):
  `1080px` (menu de navegação vira mobile), `900px`, `768px`, `620px`, `600px`,
  `560px`, `480px`. Reutilize esses breakpoints em vez de criar um novo valor de
  quebra só para um componente.

## Nomenclatura

Todas as classes seguem BEM-like: `.bloco__elemento--modificador`
(ex: `.plan-card__badge`, `.btn--outline`). Componentes novos devem seguir o mesmo
padrão para manter o CSS legível e consistente com o resto do projeto.
