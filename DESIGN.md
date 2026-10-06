---
name: Marlon de la Vega Portfolio
description: A personal portfolio for a full-stack developer and graphic designer, built on the stock daisyUI cupcake theme.
colors:
  primary: "oklch(85% 0.138 181.071)"
  primary-content: "oklch(43% 0.078 188.216)"
  base-100: "oklch(97.788% 0.004 56.375)"
  base-200: "oklch(93.982% 0.007 61.449)"
  base-300: "oklch(91.586% 0.006 53.44)"
  base-content: "oklch(23.574% 0.066 313.189)"
typography:
  body:
    fontFamily: "'Courier New', Courier, monospace"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Courier New', Courier, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  field: "2rem"
  card: "1.5rem"
  panel: "2rem"
  tile: "1rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-content}"
    rounded: "{rounded.field}"
    padding: "0.25rem 0.75rem"
  button-default:
    backgroundColor: "{colors.base-200}"
    textColor: "{colors.base-content}"
    rounded: "{rounded.field}"
    padding: "0.25rem 0.75rem"
  card:
    backgroundColor: "{colors.base-100}"
    textColor: "{colors.base-content}"
    rounded: "{rounded.card}"
    padding: "1rem"
---

# Design System: Marlon de la Vega Portfolio

## Overview

**Creative North Star: "The Working Drafting Table"**

The page reads like a drafting table: calm, precise, and tool-like, with the work and the making of it visible. Everything sits on a warm cream surface in soft, rounded cards, so the page feels handmade rather than corporate. The character is quiet and friendly rather than loud, and it must never look like a generic portfolio template.

The mint primary is the single signal color. It marks what can be pressed, not decoration. Structure comes from consistent rounded containers, not from hairlines or heavy shadows.

**Key Characteristics:**
- Warm cream and neutral surfaces with a single mint accent
- Soft, rounded cards and controls with gentle layering
- Monospace typography throughout, carrying a technical, drafting-table voice
- Tactile, friendly controls that respond to hover and press
- Left column for identity and skills, right panel for the work

## Colors

A stock daisyUI cupcake palette: warm cream neutrals, a mint primary, and a pink secondary. The palette is kept as-is; the values in the frontmatter are normative.

### Primary
- **Mint Action** (`oklch(85% 0.138 181.071)`): The one accent. Used on the active skill toggle, the Info button, the "Know more about me" link, and the modal primary action.
- **Mint Ink** (`oklch(43% 0.078 188.216)`): Text and icons that sit on mint fills. Also the foreground of the primary button.

### Neutral
- **Cream Canvas** (`oklch(91.586% 0.006 53.44)`): The page background behind the cards.
- **Warm Card** (`oklch(97.788% 0.004 56.375)`): The main card surface, the skill list, and the header.
- **Soft Well** (`oklch(93.982% 0.007 61.449)`): Inset surfaces such as skill tiles, the contact field, and inactive toggle state.
- **Plum Ink** (`oklch(23.574% 0.066 313.189)`): Body text and headings.

### Named Rules
**The One Signal Rule.** Mint is reserved for things a visitor can press or follow. Its rarity on the page is what makes it read as an action.

## Typography

**Display Font:** Courier New (with Courier, monospace)
**Body Font:** Courier New (with Courier, monospace)

**Character:** A single monospace voice for everything. It reads as technical and deliberate, matching the drafting-table idea, and it keeps the hierarchy to weight and size rather than a second typeface.

### Hierarchy
- **Display** (bold, browser default size): Name in the bio and dialog headings.
- **Headline** (bold, `text-lg`, 1.125rem): Dialog titles.
- **Title** (medium, 1rem): Skill names and the "Know more" link.
- **Body** (regular, 16px, line-height 1.5 with the bio at a tighter 1.125rem): Bio and dialog paragraphs. Keep the measure inside the narrow column.
- **Label** (regular, `text-sm`, 0.875rem): Skill descriptions and secondary text, at 70% of the base content color.

### Named Rules
**The Weight Not Color Rule.** Hierarchy comes from weight and size in the single monospace face. Gradient text and extra typefaces are not used.

## Layout

A two-column layout on large screens: a fixed-width left column (`max-width` 28rem) with identity, skills, and contact, and a flexible main panel for the work. On small screens the columns stack and the main panel is hidden behind the "My works" button.

The canvas carries a faint 24px drafting grid (6% of the base content color), the one place the North Star shows directly. Motion respects reduced-motion preferences: entrances and skill swaps drop their slide and duration.

The rhythm is 1rem (`gap-4`) between major blocks and 0.5rem (`gap-2`) inside a block. Cards use 1rem padding. The left column fills the viewport height and the skill list scrolls inside its own card.

## Elevation & Depth

Depth is conveyed mainly by tonal layering: cream cards sit on a slightly darker canvas, and inset tiles sit on the card. Shadows are used sparingly, only on the logo tile and the main panel, and are never the primary way a surface is separated.

### Shadow Vocabulary
- **Tile lift** (`box-shadow: var(--shadow-sm)`): Logo tile inside the header card, and skill logo tiles at rest.
- **Panel lift** (`box-shadow: var(--shadow-lg)`): Main work panel.

### Named Rules
**The Tonal First Rule.** Separate surfaces by tone before reaching for a shadow. Shadows appear on a single tile or panel at a time, never stacked on every card.

## Shapes

Soft and generously rounded. Cards use a 1.5rem radius, the main panel 2rem, the skill logo tile 1rem, and buttons follow the daisyUI field radius (2rem, fully pill-shaped). Borders are minimal; containers are defined by tone and radius.

## Components

### Buttons
- **Shape:** Pill-shaped (`border-radius: 2rem`), compact (`btn-sm`).
- **Primary:** Mint fill with Mint Ink text, used for the active toggle and the most important action in a dialog.
- **Default:** Soft-well fill with plum text, used for the header "Contact me" button and the inactive toggle.
- **Hover / Focus:** Daisy default transitions. Focus uses a 2px mint outline with a 2px offset.

### Toggle (Development / Design)
- **Style:** A joined pair of buttons, equal width, sitting directly above the skill list.
- **State:** Active segment uses the primary button; inactive uses the default button. Exposed with `aria-pressed`.

### Cards / Containers
- **Corner Style:** 1.5rem radius on bio, header, and skill list cards.
- **Background:** Warm card surface on the cream canvas.
- **Shadow Strategy:** Flat; see Elevation & Depth.
- **Internal Padding:** 1rem for the bio and header; 0.5rem for the skill list.

### Skill Tiles
- **Style:** A soft-well row with a 1rem radius, a 6rem logo tile, a name, and a description.
- **Hover:** The tile background darkens slightly and the logo tile lifts and tilts by its own random angle (-8 to 8 degrees). The tilt is regenerated on each tab switch.

### Dialogs
- **Style:** Standard modal boxes with a circular ghost close button in the top-right.
- **Behavior:** Used for Info and Contact, both of which are opened on demand. They are not used for anything that needs protected focus beyond that.

### Logo Mark
- **Style:** Five mint squares on a 720-unit grid, drawn as SVG and filled with the primary color.

## Do's and Don'ts

### Do:
- **Do** use the mint primary only for actions and the toggle's active state (The One Signal Rule).
- **Do** keep text in the monospace face and express hierarchy with weight and size.
- **Do** keep surfaces separated by tone first, and use the shadow tokens sparingly.
- **Do** keep the skill list's entrance and key transitions on the existing motion pattern.

### Don't:
- **Don't** add gradient text or a second typeface.
- **Don't** stack shadows on every card or use zero-blur hard shadows.
- **Don't** use mint as a decorative background or for body copy.
- **Don't** introduce loud neon or high-saturation effects (anti-reference).
- **Don't** make the page look like a generic agency or stock portfolio template (anti-reference).
