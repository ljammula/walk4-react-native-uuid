# Agent instructions

This repository is a TypeScript UUID implementation intended for React Native. Source lives under `src/` and Jest tests live under `src/__tests__/`.

## Verification

- Install the locked dependencies with `npm ci`.
- Run `npm test -- --runInBand` and `npm run build` after changing source or tests.
- Preserve the public API and the RFC 4122 behavior covered by the existing test suite.
