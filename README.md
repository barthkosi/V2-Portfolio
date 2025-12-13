# Vite Template with Semantic Styling

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)

## What the project does

**Vite Template with Semantic Styling** provides a starter scaffold for building React + TypeScript applications using Vite, with a modern styling setup that combines semantic class-based styling, component libraries, motion support, and pre-configured development tooling. The goal is to let developers hit the ground running — focusing on building UI and features instead of boilerplate setup.

This template includes:

* React + TypeScript setup
* Semantic styling using a component library / primitive + utility-first approach
* Motion/animation support (for fluid, modern UI)
* ESLint configuration for code quality and consistency
* A clean, minimal project structure optimized for extensibility

---

## Why the project is useful

Starting a new frontend project often involves repeated boilerplate: configuring bundlers, linting, styling, theming, component libraries, motion/animation, and more. This template abstracts most of those repetitive tasks, giving you:

* ⚡ **Fast startup** — thanks to Vite’s lightning-fast build/dev server.
* 🧰 **Opinionated but flexible styling** — semantic styling + primitives/components lets you focus on semantics rather than low-level CSS quirks.
* ✅ **Consistent developer experience** — linting and project structure encourage maintainable and scalable code from day one.
* 🔄 **Ready for modern UI patterns** — with motion support and a styling setup ideal for responsive, interactive interfaces.

In short: it’s a clean, modern foundation for building robust React + TS apps without reinventing the wheel.

---

## Getting Started

### Prerequisites

* Node.js (v14 or newer recommended)
* A package manager: `npm`, `yarn`, or `pnpm`

### Installation

```bash
# Clone the template (or use "Use this template" on GitHub)
git clone https://github.com/barthkosi/vite-template-with-semantic-styling.git my-app
cd my-app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# (or `yarn dev`, `pnpm dev`)
```

Open your browser at `http://localhost:5173` (or as Vite logs) — you should see the starter app.

### Build for Production

```bash
npm run build
# then optionally
npm run preview
```

This will create an optimized production build in the `dist/` folder.

---

## Usage Example

Once installed, you can start creating components under `src/`, applying semantic styling and motion primitives immediately. For example:

```tsx
// src/components/Button.tsx
import { motion } from "framer-motion"; // or your motion library
import "./Button.css";

export function Button({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      className="btn-primary semantic-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

You can build out your UI using semantic class names, motion for interactivity, and TypeScript for safety — all without additional setup.

---

## Where to get help

If you run into issues:

* Open an issue on this repository’s **Issues** tab
* Check the code and configuration files (ESLint, Vite config, etc.)
* For styling/motion-specific questions — consult the documentation of the respective libraries you integrate

Future docs (e.g., CONTRIBUTING, style guide, advanced usage) may be added as the project evolves.

---

## Maintainers & Contributions

**Maintainer:** Barth (you) — feel free to raise issues or send pull requests.

If you’d like to contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit
4. Push to your fork and open a pull request

For more details and contribution guidelines, see the [CONTRIBUTING.md](./CONTRIBUTING.md) file (if present).

Contributions that improve the template’s flexibility, developer experience, or documentation are especially welcome.

---

## License

This project is licensed under the [MIT License](./LICENSE).
