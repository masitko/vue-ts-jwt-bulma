# front-ts

Simple proof of concept for Vue and TypeScript frontent to use JWT when comsuming a backend API

## Todo:

- Unit Tests
- Component Tests
- E2E Test

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
bun test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
bun build
bun test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
