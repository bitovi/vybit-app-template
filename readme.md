# VyBit App Template

Vibe code a UI that stays consistent as it grows. Fork this repo, open a Codespace, and start building — the dev server launches automatically.

## Why This Template

Most vibe-coded apps fall apart as they get bigger: styles drift, data shapes contradict each other, and nobody knows if things still work. This template solves that with three guardrails baked in:

**Design system via agent skills** — Copilot skills automatically extract reusable components into a [Storybook](https://storybook.js.org/) component library, maintain a component registry, and keep your UI visually consistent. You don't have to think about it — just ask for a feature and the skill handles the rest.

**Centralized data model** — This template maintains a shared data model so every feature Copilot builds stays compatible with the rest of the app. Without it, AI invents its own data shapes for different features — fields get named differently, structures contradict each other, and nothing connects.

**Self-verifying with Playwright** — The template includes Playwright MCP so Copilot can write and run E2E tests as it builds features. Multiple people can edit the app without silently breaking each other's work.

## Getting Started

### 1. Fork this repo

Click **Fork** at the top right to create your own copy.

### 2. Open a Codespace

From your fork: **Code** → **Codespaces** → **Create codespace on main**

The dev container installs dependencies, installs Playwright browsers, and starts the dev server automatically. When it's ready, VS Code opens a preview of your running app on port 5173.

### 3. Set up a prebuild (recommended)

Prebuilds pre-install everything so future Codespaces launch in seconds:

1. In your fork, go to **Settings** → **Codespaces**
2. Click **Set up prebuild**
3. Select the **main** branch and your preferred region
4. Save

### Local dev (optional)

```bash
git clone https://github.com/YOUR-USERNAME/vybit-app-template.git
cd vybit-app-template
npm install
npm run dev
```

## Building Features

Tell Copilot what you want in plain language. The built-in skills handle the details:

> "Add a jobs dashboard with a table showing status, assignee, and date created"

Behind the scenes, the **implement-feature** skill will:
- Add or update Zod schemas in `/model`
- Generate sample data for mock APIs
- Create page and component files
- Extract shared UI components
- Write Playwright tests

You can also use **[VyBit](https://github.com/bitovi/vybit)** — a visual editor overlay for your React app — to click elements, drag-drop components, or sketch features. To activate VyBit, tell Copilot:

> "Please implement the next change and continue implementing changes with VyBit."

This starts a loop where Copilot waits for you to make visual changes in the editor, commits them, and implements them — all without leaving your browser.

### Other skills

- **update-data-model** — Add fields or entities to `/model`
- **extract-ui-component** — Pull inline UI into reusable components with Storybook stories
- **write-e2e-test** — Add Playwright tests for a flow
- **generate-sample-data** — Create realistic mock data from Zod schemas

## Project Layout

```
model/                    # Zod schemas, types, and sample data generators
mock-app/src/
  ├── pages/              # Page components
  ├── components/         # Shared UI components (extracted by skills)
  └── mocks/              # MSW mock API handlers
.github/skills/           # Agent skills that guide Copilot
.devcontainer/            # Codespaces configuration
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server (auto-started in Codespaces) |
| `npm run build` | Production build |
| `npm run storybook` | Component library on port 6006 |
| `npm run test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Playwright interactive test UI |

## Sharing Your Work

Since it runs in Codespaces, sharing is just sharing a link. Push your changes, have someone open a Codespace on your branch, and they see exactly what you see — no "works on my machine" issues.
