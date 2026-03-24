---
name: project_overview
description: High-level overview of the SPLT project — purpose, tech stack, and architecture
type: project
---

# SPLT — Open Source Bill Splitting Web App

**Purpose:** A mobile-first web app for splitting bills among a group of people. No login required — users share a link to their group. Supports expenses, paybacks, and automatic debt summarization.

**Tech Stack:**
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **UI:** Mantine UI v8 (components, forms, hooks), Tailwind CSS v4
- **State/Data:** TanStack React Query v5, Zustand v5, Mantine hooks (useLocalStorage)
- **Backend/DB:** PocketBase (self-hosted or pockethost.io)
- **Icons:** @tabler/icons-react
- **Other:** dayjs (dates), emoji-picker-react, react-imask, uuid

**Architecture:**
- `src/app/` — Next.js App Router pages
  - `page.tsx` — home/landing (group history list)
  - `group/[groupId]/page.tsx` — group detail (tabs: overview, transactions)
  - `group/[groupId]/transaction/page.tsx` — transaction detail (expense or payback)
- `src/components/` — reusable modal components (AddGroupModal, AddEditTransactionModal, AddParticipantModal, ViewDebtModal, ListParticipantsModal, ViewParticipantModal)
- `src/api/index.ts` — all API hooks (React Query + PocketBase SDK)
- `src/types/index.ts` — all TypeScript types and enums
- `src/utils/` — date helpers, random emoji
- `src/providers/` — ReactQueryClientProvider
- `db/` — PocketBase executable + schema JSON

**Environment:**
- `NEXT_PUBLIC_POCKETHOST_DB` — PocketBase URL (defaults to `http://127.0.0.1:8090`)
