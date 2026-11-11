# Brand system history

Reference notes for the typography and colour decisions on this site. The live
values are defined in `app/globals.css` and the fonts in `app/layout.tsx`.

## Live now

- **Display / headlines:** Manrope 500–700
- **Body / UI / labels:** Inter 400–700
- **Palette:** the original Jade River Resort palette (below). The brand-kit
  palette was trialled and reverted because some accents lost contrast on the
  ivory and maroon surfaces.

### Current palette

| Token | Hex / value | Use |
| --- | --- | --- |
| Warm Ivory | `#FBF8F3` | Primary background, main sections |
| Soft Sand | `#F5EFE6` | Alternate sections, cards, gallery backgrounds |
| Forest Green | `#213329` | Testimonials, dark sections, brand identity |
| Deep Walnut | `#432911` | CTA sections, primary buttons, wood accents |
| Walnut Brown | `#603020` | Secondary accents, borders, decorative elements |
| Muted Copper | `#A87850` | Small highlights, icons, hover accents |
| Charcoal | `#201B17` | Headings, primary text |
| Warm Grey | `#8B8176` | Descriptions, secondary text |
| Border | `rgba(96, 48, 32, 0.18)` | Dividers and borders |
| Light border | `rgba(251, 248, 243, 0.18)` | Dividers on dark sections |

## Archived typography

The site previously used a serif display face. It was replaced by the current
Manrope / Inter pairing.

| Role | Typeface | Weights / notes |
| --- | --- | --- |
| Display / headings | Fraunces (variable) | 380; axes `SOFT` 40, `WONK` 1, `opsz` 120; normal + italic |
| Body / sans | Manrope | Variable, all weights |
| Labels / UI / mono | DM Mono | 300, 400 |

Class mapping at the time:

- `font-display` → Fraunces, serif fallback (`Iowan Old Style`, Georgia)
- `font-sans` → Manrope, `system-ui`
- `font-mono` → DM Mono, `ui-monospace`
- `h1`, `h2`, `h3` used `font-weight: 380` with Fraunces variation settings.
- `.eyebrow`, `.btn`, `.num`, `.dropcap` used the display/mono families above.
- Buttons were uppercase with `letter-spacing: 0.18em`.

## Archived palette trial

These values were applied on 11 November 2026 and then reverted. Kept here so
the contrast issue can be reviewed without losing the values.

| Token | Hex | Use in the trial |
| --- | --- | --- |
| Soft Paper Ivory | `#FBF8F3` | Main background |
| Warm Ivory | `#F5EFE6` | Alternate surfaces, text on maroon |
| Deep Maroon | `#760014` | Dark sections, footer |
| Crimson Maroon | `#A3001B` | Primary actions, accents |
| Charcoal Ink | `#211C1C` | Primary text |
| Warm Stone | `#746A66` | Secondary text |
| Kashmir Mist | `#DED5CC` | Borders |
| Crimson Blush | `#F3E3E3` | Soft highlights |
| Embroidery Sand | `#E9DDD0` | Warm neutral / accents on maroon |
| Pure White | `#FFFFFF` | Utility contrast |

Why it was reverted: the light accent colours and solid text rules hid several
labels and accent words against the ivory, sand and maroon surfaces. The
original palette's copper and forest-green contrast worked better with the
existing layout.
