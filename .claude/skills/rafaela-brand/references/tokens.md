# Tokens de marca — Rafaela Schumacher

Parte do design system oficial da marca (ver `SKILL.md`). Estes valores documentam a
identidade **atual** da marca, redefinida pela usuária numa direção mais premium: paleta
em família quente única (creme → bronze → espresso), tipografia serifada de traço fino e
muito respiro.

> **Nota de versão.** Esta identidade substitui integralmente a anterior (verde-sálvia
> `#7c8f6a` + dourado `#c8a24d`, Playfair Display + Plus Jakarta Sans, motivo ✦). Nada
> daquela paleta continua válido — se você encontrar um verde-sálvia ou um glifo ✦ em
> algum lugar do código ou de outro projeto da marca, é resíduo da identidade antiga e
> deve ser migrado para os valores desta página.

Fonte real: `css/styles.css`, bloco `:root` e o override de dark mode em
`@media (prefers-color-scheme: dark)`. **`styles.css` é a implementação de referência,
não a identidade em si** — os valores abaixo são a identidade, independente de
tecnologia (ver "Identidade vs. implementação de referência" em `SKILL.md`).

Estes são os únicos valores de cor/fonte/raio/sombra/espaçamento que devem ser usados.
Se uma necessidade não é coberta por nenhum destes, siga a regra "Realmente não existe
nada parecido?" em `SKILL.md` antes de inventar um valor novo.

## Cores

*Camada A — identidade da marca.*

Toda a paleta pertence a **uma única família quente**. Não introduza uma cor de outra
família (verde, azul, rosa) — nem "só para um badge".

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--color-primary` | `#9c8362` | (igual) | Bronze da marca. Links, palavras em itálico de destaque, sobrenome da assinatura, extremo claro do degradê de botão. |
| `--color-primary-dark` | `#6d5940` | (igual) | Extremo escuro do degradê de botão e estado hover. |
| `--color-primary-light` | `#f3ece1` | `#2e261d` | Preenchimento suave (hover do botão outline, fita de exemplo). |
| `--color-accent` | `#b49a78` | (igual) | Bronze claro — filetes, bullets, ícone do FAQ, borda do plano em destaque. É o acento **decorativo**; nunca uma segunda cor de ação. |
| `--color-deep` | `#241d17` | (igual) | Espresso. Fundo das seções escuras (`.who`, `.final-cta`), sempre com texto branco. |
| `--color-bg` | `#fefcf9` | `#1a1611` | Fundo padrão de página. |
| `--color-bg-alt` | `#faf6f0` | `#221d17` | Fundo alternado de seção (zebra entre seções). |
| `--color-surface` | `#ffffff` | `#262019` | Fundo de card, sobre `bg` ou `bg-alt`. |
| `--color-text` | `#322c25` | `#f2ece2` | Texto principal e títulos. |
| `--color-text-muted` | `#6e6459` | `#b9ae9e` | Corpo de texto, legendas, links do menu. |
| `--color-border` | `#ece5da` | `#362e25` | Bordas de 1px (cards, divisores, header). |
| `--color-star` | `#b49a78` | (igual) | Alias de `--color-accent` para contexto de avaliação/estrelas. |

O dark mode é acionado via `prefers-color-scheme: dark` — **não** por uma classe ou
atributo manual. Ele só redefine as superfícies (`bg`, `bg-alt`, `surface`, `text`,
`text-muted`, `border`, `primary-light`); as cores de identidade (`primary`,
`primary-dark`, `accent`, `deep`) permanecem as mesmas nos dois modos.

### Degradês oficiais

Dois degradês fazem parte da identidade — não são decoração livre, reproduza os valores:

- **Botão primário**: `linear-gradient(135deg, #b09775 0%, #8a7050 100%)`; hover
  `linear-gradient(135deg, #9c8362 0%, #6d5940 100%)`. O mesmo degradê veste o selo
  "Mais escolhido", a barra do card de depoimento e o avatar circular.
- **Seções escuras**: um radial sutil sobre `--color-deep`, para o fundo não ficar
  chapado — `.who`: `radial-gradient(120% 130% at 50% 0%, #2f261e 0%, #241d17 70%)`;
  `.final-cta`: `radial-gradient(110% 130% at 50% 0%, #33291f 0%, #241d17 68%)`.

### Exceções propositais (não são tokens de marca)

Alguns pontos usam cores fixas fora da paleta porque representam identidade de terceiros
ou porque precisam casar com o conteúdo de uma imagem:

- `.whatsapp-float` e o ícone do WhatsApp: `#25d366` (verde oficial do WhatsApp).
- `.whatsapp-mock__body`: `#f3efe7` light / `#2a231c` dark — fundo de chat.
- `.whatsapp-mock__body--photo`: `#f6f2ea` — escolhido para casar com o papel de parede
  que já vem dentro dos prints de depoimento, para o print se fundir ao card.

Não trate essas cores como precedente para "cores soltas são aceitáveis".

## Tipografia

*Camada A — identidade da marca. (A escala completa de tamanhos por nível ainda não é
oficial — ver "Decisões em aberto" em `SKILL.md`.)*

- `--font-heading`: **`'Cormorant Garamond'`**, fallback
  `'Playfair Display', Georgia, 'Times New Roman', serif`. Serifada de alto contraste e
  traço fino.
- `--font-body`: **`'Jost'`**, fallback `ui-sans-serif, system-ui, 'Segoe UI', sans-serif`.
  Sans geométrica leve.
- Carregadas via Google Fonts — Cormorant Garamond `300,400,500` normal e itálico;
  Jost `300,400,500,600`.
- **O peso leve é identidade.** Corpo de texto em `300` com `line-height: 1.8`;
  `h1`,`h2`,`h3` em `font-weight: 300`, `line-height: 1.14`, `text-wrap: balance`. Não
  engrosse um título para "dar destaque" — destaque se faz com tamanho, respiro ou
  itálico bronze.
- `<em>` é o **grifo de marca**, não itálico genérico: `font-style: italic`,
  `font-weight: 400`, `color: var(--color-primary)`. Usado para destacar uma
  palavra-chave dentro de um título (ex: "caiba na *sua rotina*",
  "Acompanhamento *Trimestral*").

### Assinatura do nome — duas tipografias

O nome da marca é escrito com **duas tipografias na mesma linha**: nome em sans
encorpada, sobrenome em serifada itálica bronze. Isso exige envolver o sobrenome num
`<span class="logo__last">`.

```html
<a href="#topo" class="logo">Rafaela <span class="logo__last">Schumacher</span></a>
```

| Parte | Fonte | Peso | Cor | Observação |
|---|---|---|---|---|
| Nome | `--font-body` | 600 | `--color-text` | `letter-spacing: 0.005em` |
| Sobrenome | `--font-heading` itálico | 500 | `--color-primary` | `font-size: 1.14em` |

Tamanho `1.42rem` no header e `1.32rem` no rodapé; `white-space: nowrap` para a
assinatura nunca quebrar em duas linhas. Reproduza essa composição sempre que o nome
aparecer como marca — inclusive na plataforma de pacientes.

### Rótulo em caixa alta

Tratamento único para todo rótulo curto — eyebrow, links do menu, botões, tags, nome no
card de depoimento, links e assinatura do rodapé:

- `text-transform: uppercase`
- `letter-spacing` entre `0.12em` e `0.22em` (quanto menor o texto, maior a entreletra)
- `font-weight` entre `400` e `500`
- `font-size` entre `0.62rem` e `0.74rem`

É esse tratamento, e não uma cor, que dá o tom editorial da marca. Um rótulo novo deve
segui-lo em vez de usar texto em caixa baixa e peso normal.

## Raios de borda

*Camada B — token de suporte, reutilizável.*

| Token | Valor | Uso típico |
|---|---|---|
| `--radius-sm` | `10px` | Elementos pequenos. |
| `--radius-md` | `16px` | Cards médios (`.includes__item`, `.whatsapp-mock`). |
| `--radius-lg` | `20px` | Cards grandes/destacados (`.plan-card`, `.about-photo`). |
| — | `999px` (pill) | Botões, tags e badges — hardcoded como pill shape, é o padrão consistente para qualquer elemento "arredondado total". |

## Sombras

*Camada B — token de suporte, reutilizável.*

Sombras difusas, de baixa opacidade e com tinta quente — nunca cinza neutro.

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 2px 18px rgba(58, 44, 30, 0.05)` | Estado padrão de cards/botões. |
| `--shadow-md` | `0 18px 46px rgba(58, 44, 30, 0.10)` | Estado hover/elevado, foto da seção Sobre, plano em destaque. |

## Layout, espaçamento e breakpoints

*Camada B — tokens de suporte, reutilizáveis. (Uma escala geral de espaçamento além
destes valores ainda não existe — ver "Decisões em aberto" em `SKILL.md`.)*

- `--container-width: 1140px` — largura máxima do conteúdo (`.container`), com
  `padding: 0 24px`.
- Ritmo vertical de seção: `section { padding: 104px 0 }` no desktop, `68px 0` a partir
  de `768px`. O respiro generoso é parte da identidade premium — qualquer seção nova deve
  seguir esse ritmo, não um padding arbitrário.
- Breakpoints usados no site (mobile-first via `max-width`):
  `1080px` (menu de navegação vira mobile), `900px`, `768px`, `760px`, `620px`, `600px`,
  `560px`, `480px`. Reutilize esses breakpoints em vez de criar um novo valor de quebra
  só para um componente.

## Nomenclatura

*Camada B — convenção reutilizável.*

Todas as classes seguem BEM-like: `.bloco__elemento--modificador`
(ex: `.plan-card__badge`, `.btn--outline`, `.logo__last`). Componentes novos devem seguir
o mesmo padrão para manter o CSS legível e consistente com o resto do projeto.

## O que não está nesta página

Esta página só documenta o que já é oficial. Escala tipográfica completa, escala de
espaçamento, motion tokens, z-index, sistema de ícones e estados de erro/desabilitado
**ainda não existem como decisão de marca** — estão listados em "Decisões em aberto" em
`SKILL.md`. Para padrões de uso (ritmo de seção, filetes, ênfase, hover, dark mode), veja
`references/patterns.md`.
