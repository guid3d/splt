---
name: task_completion_checklist
description: What to do when a coding task is completed in the SPLT project
type: project
---

# Task Completion Checklist

After completing a coding task in SPLT:

1. **Lint** — run `npm run lint` and fix any ESLint errors
2. **Type-check** — TypeScript errors will surface during `npm run build`; run `npm run build` if unsure
3. **Manual test** — start `npm run dev` and verify the feature works in the browser
4. **Check PocketBase** — if backend schema changed, update `db/pb_schema.json` accordingly
5. **No test suite** — the project has no automated tests currently; manual verification is the process
