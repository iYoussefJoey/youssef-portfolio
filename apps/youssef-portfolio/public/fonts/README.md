# Fonts

Self-hosted so they load from the same origin as the page and are preloaded (no extra connection to Google, and
no late font swap that would re-lay out the page). Only the subsets the pages use are kept: every character of the English page is
in the Latin files (the "ē" in "Bē" is written as e + combining macron U+0304). `@font-face` rules and preloads are in
`src/index.html`.

| File | Font | Weights | Subset | Licence |
| --- | --- | --- | --- | --- |
| `lexend-latin.woff2` | [Lexend](https://fonts.google.com/specimen/Lexend) | 300–800 (variable) | Latin | SIL Open Font License 1.1 |
| `readex-pro-arabic.woff2` | [Readex Pro](https://fonts.google.com/specimen/Readex+Pro) (Lexend’s Arabic companion) | 160–700 (variable) | Arabic, loaded only by the Arabic page | SIL Open Font License 1.1 |
| `geist-mono-latin.woff2` | [Geist Mono](https://fonts.google.com/specimen/Geist+Mono) | 400–500 (variable) | Latin | SIL Open Font License 1.1 |

Source: Google Fonts (`fonts.gstatic.com`, Lexend v26, Geist Mono v6, Readex Pro v27).
