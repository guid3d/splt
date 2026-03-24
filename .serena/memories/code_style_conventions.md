---
name: code_style_conventions
description: Code style, naming conventions, and patterns used in the SPLT codebase
type: project
---

# Code Style & Conventions

## Language
- TypeScript throughout; strict types via `@types/*`
- No explicit `any` discouraged but occasionally used in mutations

## Naming
- Components: PascalCase (e.g., `AddGroupModal`, `ExpensePage`)
- Hooks/functions: camelCase, custom hooks prefixed with `use` (e.g., `useCreateGroup`, `useTotalSpend`)
- Types: PascalCase with descriptive suffixes (`FormValues`, `Data`) — e.g., `GroupFormValues`, `GroupData`
- Enums: PascalCase with string values in lowercase (e.g., `SplitType.Equal = "equal"`)
- Files: PascalCase for components, camelCase for utils

## File Structure
- Each major modal/component lives in its own folder with an `index.tsx` and a `components/` subfolder
- All API hooks are centralized in `src/api/index.ts`
- All types are in `src/types/index.ts`

## Patterns
- Data fetching: React Query (`useQuery` / `useMutation`) via custom hooks in `src/api/`
- PocketBase SDK used directly for most CRUD; custom REST hooks (`fetch`) for aggregated/complex endpoints
- Path alias `@/` maps to `src/`
- No docstrings or JSDoc comments — minimal inline comments only where non-obvious
- Commented-out code is left in place (common in this codebase)
- Form handling: Mantine `useForm`

## Linting
- ESLint config: `next/core-web-vitals` only
- No Prettier config found — formatting is implicit

## CSS
- Mantine UI for component styling
- Tailwind CSS for utility classes
- PostCSS with `postcss-preset-mantine` and `postcss-simple-vars`
