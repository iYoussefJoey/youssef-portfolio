# ui

Shared **UI shell** for the portfolio (not page content).

| Export | Role |
| --- | --- |
| `HeaderComponent` | Brand animation, nav, Back, theme menu |
| `IntroAside` | Intro sticky rail (scroll-spy nav + socials) |
| `ThemeService` | Light / dark / system + localStorage |
| `ScrollSpyService` | Intro section highlight while scrolling |
| `THEME_PREFERENCE` / theme types | Strongly typed theme preferences |

```sh
npx nx test ui
```
