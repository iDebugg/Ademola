# Background Simplification Integration Steps

This project now uses an external token pipeline to keep the background system controlled and professional.

## 1) Install external tooling

```bash
npm install -D style-dictionary culori
```

## 2) Edit source-of-truth tokens

Update `tokens/background.tokens.json`.

Rules:
- Keep canvas atmospheric layers in one cool hue family.
- Keep high contrast for text tokens.
- Avoid introducing route-specific hardcoded canvas colors.

## 3) Validate color quality

```bash
npm run validate:tokens
```

This runs `scripts/validate-tokens.mjs` and enforces minimum contrast thresholds.

## 4) Generate CSS token output

```bash
npm run build:tokens
```

Generated file:
- `src/styles/tokens.css`

## 5) Apply tokens in global styles

`src/app/globals.css` imports `src/styles/tokens.css` and maps semantic variables:
- `--background`
- `--background-2`
- `--surface`
- `--surface-2`
- `--border`
- `--foreground`
- `--muted`
- `--accent`
- `--accent-2`
- `--focus`

## 6) Keep the body background restrained

Use this policy:
- Max 2 atmospheric radial gradients.
- 1 linear base gradient.
- No additional decorative color layers at the body level.

## 7) Run full checks before release

```bash
npm run tokens:check
npm run lint
npx next build --webpack
```

## 8) Ongoing governance

- When changing background/surface colors, update token source first.
- Regenerate tokens before commits.
- Reject direct hardcoded canvas/surface color additions in code review.
