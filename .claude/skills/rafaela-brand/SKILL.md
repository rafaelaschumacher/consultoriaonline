---
name: rafaela-brand
description: Fonte oficial de verdade da identidade visual da marca Rafaela Schumacher (nutricionista) — cores, tipografia, espaçamento, raios, sombras, breakpoints e componentes reutilizáveis (botões, cards de plano, tags, cabeçalhos de seção, mockup de WhatsApp, accordion de FAQ, animação de scroll-reveal). Use esta skill SEMPRE que for criar, editar ou revisar qualquer peça visual/UI da marca — tanto neste site de consultoria quanto na plataforma de pacientes (mesmo em outra stack, como React ou Vue). Consulte ANTES de escolher uma cor, fonte, espaçamento, raio de borda ou sombra, e antes de construir qualquer botão, card, badge, formulário, seção ou tela nova — mesmo que o pedido pareça pequeno ("só precisa de um verde um pouco diferente", "cria um badge novo", "monta a tela de login do app de pacientes", "que cor fica bom nesse botão"). O objetivo é impedir a criação de cores/fontes/estilos ad-hoc e o retrabalho de componentes que já existem, mantendo os dois projetos visualmente consistentes.
---

# Identidade visual — Rafaela Schumacher

Esta skill é a fonte única de verdade da identidade visual da marca. Ela existe para
que a marca continue parecendo a mesma marca em qualquer lugar onde apareça — o site
de consultoria (este repositório) e a futura plataforma de pacientes (outro projeto,
possivelmente em outra stack) — mesmo sendo trabalhada por sessões diferentes, em
momentos diferentes, sem memória compartilhada entre elas. Os tokens e componentes
abaixo são o contrato que substitui essa memória.

## Regra central: reutilizar antes de criar

Antes de escrever qualquer CSS, HTML ou estilo inline novo, siga esta ordem:

1. **Existe um token que já resolve isso?** Consulte `references/tokens.md` (cores,
   fontes, raios, sombras, espaçamento, breakpoints). Se existe, use-o — nunca digite
   um valor hexadecimal, `px` ou nome de fonte novo "à mão" quando um token já cobre a
   necessidade.
2. **Existe um componente que já resolve isso?** Consulte `references/components.md`
   (botões, cards, tags, cabeçalho de seção, mockup de WhatsApp, FAQ, etc.). Adaptar um
   componente existente (nova variante de `.btn`, novo item em um grid de cards) é
   sempre preferível a desenhar algo do zero.
3. **Realmente não existe nada parecido?** Isso é legítimo — a marca vai crescer.
   Mas antes de introduzir um valor novo (uma cor, uma fonte, um raio diferente),
   **pergunte ao usuário** e proponha estender os tokens existentes (ex: adicionar
   `--color-info` ao invés de escrever `#3b82f6` solto num componente). Nunca decida
   sozinho que a marca precisa de uma cor ou fonte nova — isso é uma decisão de
   identidade visual, não uma decisão técnica.
4. **Nunca altere os valores dos tokens existentes** (ex: mudar o verde primário, trocar
   a fonte) sem o usuário pedir isso explicitamente. Um pedido de "deixa esse botão mais
   bonito" não é permissão para redefinir `--color-primary`.

Isso vale igualmente para o site atual e para a plataforma de pacientes — mudar um token
em um projeto sem replicar no outro é exatamente o tipo de "drift" visual que esta skill
existe para evitar.

## Fonte de verdade atual

Neste repositório, os tokens estão implementados como CSS custom properties no bloco
`:root` de `css/styles.css` (linhas 1–25, com overrides de dark mode nas linhas 27–36).
**Esse arquivo é a implementação de referência** — qualquer alteração de token deve
acontecer lá (com aprovação do usuário), e qualquer novo componente deve seguir o mesmo
padrão de nomenclatura BEM (`.bloco__elemento--modificador`) já usado nele.

`references/tokens.md` e `references/tokens.json` espelham esses valores de forma
estruturada e agnóstica de framework, para facilitar a leitura e a portabilidade.

## Portabilidade para a plataforma de pacientes

Quando esta skill for usada em um segundo projeto (a plataforma de pacientes), a stack
técnica pode ser diferente (React, Vue, um design system com Tailwind config, etc.).
Nesse caso:

- Os **valores** dos tokens (cores, fontes, raios, sombras, espaçamento, breakpoints)
  devem ser portados exatamente como estão em `references/tokens.json` — eles são o
  contrato de marca, independente de como são implementados tecnicamente.
- A **forma de implementação** deve se adaptar ao projeto novo (ex: CSS custom
  properties, tema do Tailwind, tokens do styled-components, variáveis do design system
  escolhido) — não é necessário copiar `styles.css` literalmente.
- Se o segundo projeto ainda não tem nenhuma definição de tokens, copie
  `references/tokens.json` para dentro dele como ponto de partida e adapte o formato.
- Se esta skill (a pasta `rafaela-brand` inteira) ainda não existir no segundo projeto,
  ela pode ser copiada para lá em `.claude/skills/rafaela-brand/` — o conteúdo já foi
  escrito para não depender de nada específico deste repositório.

## Inconsistência conhecida — não copiar

`assets/favicon.svg` usa uma paleta azul (`#2f6690` / `#4f9bd1`) e a fonte "Poppins",
que **não correspondem** aos tokens reais da marca (verde-sálvia/dourado, Plus Jakarta
Sans). Isso é um resíduo de uma versão anterior do site, não uma segunda fonte de
verdade. **Nunca use as cores ou a fonte do favicon como referência de marca** — nem
neste projeto, nem no novo. Se o usuário pedir para corrigir o favicon, isso é bem-vindo,
mas é uma correção pontual, não uma mudança de token.

## Referências

- `references/tokens.md` — tabela legível de cores (light/dark), tipografia, raios,
  sombras, espaçamento vertical de seção e breakpoints, com explicação de cada um.
- `references/tokens.json` — os mesmos tokens em formato estruturado, pensado para ser
  copiado/parseado ao configurar o segundo projeto.
- `references/components.md` — cada componente reutilizável, sua(s) classe(s) CSS,
  onde está definido em `css/styles.css`, e um trecho de exemplo real extraído de
  `index.html`, para copiar o padrão em vez de recriar do zero.

Leia o(s) arquivo(s) de referência relevante(s) antes de propor ou escrever qualquer
CSS/HTML novo — não confie apenas no resumo desta página para os valores exatos.
