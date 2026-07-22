# features

Portfolio **page** library — route-level components for the site.

| Export | Route | Role |
| --- | --- | --- |
| `Intro` | `/` | Hero (photo, CTAs) + sticky rail + scroll-spy sections |
| `Experience` | `/experience` | GAMP role + projects (Safesys, Emitum, Pogotowie) with links |
| `Resume` | `/resume` | Web CV |
| `featuresRoutes` | - | Lazy route table (`/projects` redirects to `/experience`) |

Content comes from `@youssef-portfolio/portfolio-data` (`PROFILE`).

```sh
npx nx test features
```
