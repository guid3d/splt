<div align="center">

![White SPLT Logo](/public/splt-icon-white.svg#gh-dark-mode-only)
![Black SPLT Logo](/public/splt-icon-black.svg#gh-light-mode-only)

# SPLT

**Open-source bill splitting — no account required.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![PocketBase](https://img.shields.io/badge/PocketBase-0.26-blue?logo=pocketbase)](https://pocketbase.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Overview

SPLT is a mobile-first web app for splitting bills within a group. Share a link, add expenses, and let SPLT calculate who owes what — no sign-up, no friction.

## Features

- **No login required** — share a group link with friends and start splitting immediately
- **Mobile-first design** — clean, minimalistic UI built for phones
- **Flexible splitting** — split by equal shares, custom amounts, or custom parts
- **Debt summarization** — automatically calculates net debts across all transactions
- **Payment methods** — members can store preferred payment details (e.g. bank, IBAN) so others know how to pay them back
- **Dark / light mode** — follows system preference

## Development Setup

### Prerequisites

- Node.js 18+
- PocketBase binary ([download here](https://pocketbase.io/docs/))

### Steps

1. **Clone the repo**

    ```bash
    git clone https://github.com/guid3d/splt.git
    cd splt
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Add PocketBase binary**

    Download the [PocketBase executable](https://pocketbase.io/docs/) for your OS and place it at `db/pocketbase`.

4. **Start both servers**

    ```bash
    ./dev.sh
    ```

    | Service    | URL                          |
    |------------|------------------------------|
    | Next.js    | http://localhost:3000        |
    | PocketBase | http://127.0.0.1:8090        |
    | Admin UI   | http://127.0.0.1:8090/_/    |

    Press `Ctrl+C` to stop both. Alternatively, run them separately:

    ```bash
    npm run dev          # Next.js
    ./db/pocketbase serve  # PocketBase
    ```

5. **Import the database schema**

    - Open the [PocketBase Admin UI](http://127.0.0.1:8090/_/) and create an admin account.
    - Go to **Settings → Import collections**.
    - Load `db/pb_schema.json`.

6. **Open the app** at [http://localhost:3000](http://localhost:3000)

## Deployment

| Service    | Recommended Host                                        |
|------------|---------------------------------------------------------|
| Next.js    | [Vercel](https://vercel.com)                            |
| PocketBase | [PocketHost](https://pockethost.io)                     |

Set the PocketBase URL in your environment:

```env
NEXT_PUBLIC_POCKETBASE_URL=https://your-instance.pockethost.io
```

## Roadmap

### In Progress
- [x] Advanced bill splitting modes
- [ ] Loading indicators on async actions
- [ ] Passcode-protected groups
- [ ] Currency selection
- [x] Per-person expense summary page
- [ ] IBAN masking
- [ ] Error handling when data fails to load

### Future
- [ ] i18n / localization
- [ ] Optional authentication
- [ ] Bill photo upload with auto-extraction
- [ ] Email notifications
- [ ] Dockerfile for self-hosting
- [ ] Bank name lookup from IBAN

### Done
- [x] Create and edit transactions
- [x] Split by equal shares, parts, or fixed amounts
- [x] Participant contrast colors on selection
- [x] Preferred payment method per participant
- [x] Single-command dev setup (`dev.sh`)

## Contributing

PRs welcome. Open an issue first for significant changes.

## License

MIT
