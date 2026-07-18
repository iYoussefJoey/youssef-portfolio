# features

Portfolio **page** library — route-level components for the site.

| Export | Route | Role |
| --- | --- | --- |
| `Intro` | `/` | Sticky rail + scroll-spy sections |
| `Experience` | `/experience` | GAMP role & highlights |
| `Projects` | `/projects` | Safesys, Emitum, Pogotowie |
| `Resume` | `/resume` | Web CV |
| `featuresRoutes` | — | Lazy route table consumed by the app |

Content comes from `@youssef-portfolio/portfolio-data` (`PROFILE`).

```sh
npx nx test features
```
