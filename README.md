<div align="center">

<img src="./assets/narley-logo-left.png" width="560" alt="Narley — Help nearby" />

<img src="./Both%20apps%20working.gif" width="700" alt="Narley — Provider and Reader apps working together" />



**A two-app, map-first community-resource platform that helps people find trusted help nearby — and helps providers keep that information accurate.**

[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo_SDK-54-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql&logoColor=white)](https://neon.tech/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI-412991?logo=openai&logoColor=white)](https://platform.openai.com/)
[![Vitest — 367 Tests](https://img.shields.io/badge/Vitest-367_Tests-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen)](#-testing)
[![Reader Tests](https://img.shields.io/badge/Reader_Tests-128-brightgreen)](#-testing)
[![Provider Tests](https://img.shields.io/badge/Provider_Tests-204-brightgreen)](#-testing)

</div>

---

👤 Author 🔗 [Live Demo:](https://narley.vercel.app/)

<table>
  <tr>
    <td>
      <a href="https://github.com/jdbostonbu-ops">
        <img src="https://github.com/jdbostonbu-ops.png?size=120" width="100" alt="jdbostonbu-ops" />
      </a>
    </td>
    <td>
      <strong>Jacqueline Delgado</strong><br/><br/>
      <a href="https://github.com/jdbostonbu-ops">
        <img src="https://img.shields.io/badge/GitHub-jdbostonbu--ops-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub profile" />
      </a>
    </td>
  </tr>
</table>

---

## 📌 Table of Contents

- [📖 About](#-about)
- [🧩 How the Two Apps Work Together](#-how-the-two-apps-work-together)
- [🏗️ Architecture](#-architecture)
- [🛠️ Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#-environment-variables)
- [🧪 Testing](#-testing)
- [🔌 API Reference](#-api-reference)
- [🗄️ Data Model](#-data-model)
- [🤝 Contributing](#-contributing)

---

## 📖 About

**Narley** is a community-resource platform built as **two mobile apps** backed by **one API** and **one database**:

- **📚 Reader app** — community members discover live resources on a map, inspect and save them, set reminders, receive location-based weather alerts, and report inaccurate information.
- **🏢 Provider app** — verified organization members publish and manage resources, review AI-assisted findings from community reports, monitor weather alerts, and escalate problem resources to the Narley administrator.

The core idea: **the community is the freshest source of truth.** Institutional directories lag behind reality by months or years — so Narley pairs first-hand community reports with AI research and a human provider's final judgment, rather than trusting stale data.

---

## 🧩 How the Two Apps Work Together

The Reader and Provider apps **never talk to each other directly**. They communicate through a shared Express API and PostgreSQL database, which keeps a single source of truth for every resource.

```text
Provider app ─┐
              ├── HTTP/JSON API ── Express server ── Prisma ── PostgreSQL
Reader app ───┘                         │
                                        ├── OpenAI Responses API + web search
                                        └── Resend transactional email

Both apps ── device location ── Open-Meteo + National Weather Service
Reader app ── expo-notifications ── local reminder notifications
```

**The community feedback loop:**

```text
Reader spots an outdated resource
  → submits a report (first-hand evidence)
  → server loads the canonical resource + runs AI web research
  → AI returns findings, confidence, uncertainty, and sources
  → owning Provider reviews the findings and decides what to do
  → Provider edits or removes the resource
  → change propagates back to every Reader automatically
```

AI and Readers **never** edit, close, or delete a resource. Providers remain the final authority for all published data.

---

## 🏗️ Architecture

- **Monorepo** with two Expo/React Native apps, a shared UI package, an Express API, and Prisma/PostgreSQL.
- **One canonical `Resource` record** drives both apps — `GET /resources` returns active, unexpired resources consumed identically by Reader and Provider maps.
- **Token-based security:** every protected request carries a JWT; the server verifies the token and enforces organization ownership before any resource change.
- **Real-time sync:** a Provider edit or delete propagates to the Reader without a manual refresh — the Reader re-fetches on navigation focus and when it returns to the foreground.
- **Test-first:** domain and security logic is built RED → GREEN and covered by Vitest across the Provider, Reader, and server.

---

## 🛠️ Tech Stack

### 📱 Mobile Apps

| Area | Technology |
|------|-----------|
| Language | TypeScript (strict) |
| Framework | React 19 · React Native 0.81 · Expo SDK 54 |
| Navigation | React Navigation (bottom tabs) |
| Maps | `react-native-maps` (native maps) |
| Storage | Expo SecureStore (sessions + preferences) |
| Location | Expo Location |
| Notifications | Expo Notifications (Reader reminders) |
| Icons | Ionicons via `@expo/vector-icons` |
| Design | Shared Narley theme tokens (`packages/shared-ui`) |

### ⚙️ Backend & Data

| Area | Technology |
|------|-----------|
| Runtime | Node.js · TypeScript (`tsx`) |
| API | Express 5 (JSON) · CORS |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Auth | JWT bearer tokens (separate `provider` / `reader` types) |
| Hashing | bcrypt |

### 🌐 External Services

| Service | Purpose |
|---------|---------|
| **Resend** | Email verification, password reset, provider-to-admin reports |
| **OpenAI** | Responses API + web search for community-report research |
| **Open-Meteo** | Seven-day daily-max temperature forecasts |
| **National Weather Service** | Active official warnings |

---

## ✨ Features

### 📚 Reader App

- 🔐 Email/password auth with **email verification** (separate reader accounts)
- 🗺️ Interactive **map** with category pins and synchronized cards
- 🔎 **Search** by city or ZIP (geocoded)
- 💾 **Save** resources to a personal, database-backed list
- ⏰ **Reminders** via local notifications
- 🌡️ **Weather alerts** (heat ≥ 91°F / cold ≤ 32°F + NWS warnings) using device location
- 🚩 **Report** inaccurate resources into the community-intelligence loop
- 🔁 **Live sync** — provider edits appear without manual refresh

### 🏢 Provider App

- 🔐 JWT auth with **organization-ownership** enforcement
- 📍 **Create / edit / delete** resources (title, category, address, coordinates, phone, website, notes, expiration)
- 🗓️ **1-year expiration cap** with auto-hiding of expired resources
- 🧠 **AI-verified report review** — community reports researched by AI, shown with confidence, uncertainty, and sources for **human** decision
- 📨 **Report a problem to Narley** — escalate a bad resource to the admin by email
- 🌡️ **Weather alerts** for the provider's location
- 🧾 **Audit history** of resource create/update events

### 🔒 Platform

- 🪪 **JWT bearer auth** with separate reader/provider token types
- 🛡️ **Ownership checks** — a provider can only edit or delete their own organization's resources
- 🔑 **6-character** single-use, time-limited password-reset codes
- 🧊 **Alert persistence** — temperature alerts survive forecast dips and transient fetch failures for their full 24-hour lifetime
- ♿ Accessibility-first: accessible labels, plain-text rendering, confirmation dialogs for destructive actions

---

## 🤖 AI-Assisted Development

Narley was built by a single developer using AI tools throughout the process, with all architecture, integration, and final decisions made by me. The workflow:

- **ChatGPT** — initial MVP scoping ("BGLAD" framework), version 2 iteration, and PRD/requirements drafting.
- **Claude** — version 3 development, Vitest test authoring support, and documentation.
- **Codex** — code implementation, debugging, and refactoring.

**Demo video:**
- **ChatGPT** — image generation from image uploads.
- **Claude** — initial 15-sec script drafts (revised by me for scene-to-scene continuity).
- **HeyGen** — cinematic 15-sec shots.
- **DaVinci Resolve** — video editing.

Every AI suggestion was reviewed, tested, and integrated by me. AI accelerated the work; the design decisions, product direction, and quality bar are my own.

---

## 📁 Project Structure

```text
apps/provider/       Provider Expo / React Native app
apps/reader/         Reader Expo / React Native app
packages/shared-ui/  Shared theme + resource-category configuration
server/              Express API, auth middleware, email, OpenAI
prisma/              Prisma schema and SQL migrations
generated/prisma/    Generated Prisma client
docs/project-context Product, architecture, testing, design specs
```

---

## 🚀 Getting Started

### ✅ Prerequisites

**Required (needed no matter how you run the apps):**

- Node.js (LTS) and npm
- A PostgreSQL database (Neon recommended)
- API keys: OpenAI and Resend
- **Expo Go** on a physical device — the default way to run the apps

**Optional (only for native or simulator builds):**

- Xcode (iOS) and/or Android Studio — *not required if you're running the apps in Expo Go on a physical phone*

### 📥 Install

```
git clone <your-repo-url>
cd Narley
npm install
```

### 🗄️ Set Up the Database

```
npx prisma migrate dev
npx prisma generate
```

### ▶️ Run the API

```
npx tsx server/index.ts
# → Narley API running on http://localhost:4000
```

### 📱 Run the Apps

Start each app from its own folder with a cleared Metro cache:

```
# Provider
cd apps/provider && npx expo start --clear

# Reader
cd apps/reader && npx expo start --clear
```

>Open the app in **Expo Go** on your phone. On a physical device, set `EXPO_PUBLIC_API_URL` to your machine's LAN address (e.g. `http://10.0.0.x:4000`) — not `localhost` — and keep the phone and computer on the same network. See [Environment Variables](#️-environment-variables) for the full list.

---

## ⚙️ Environment Variables

Create a root `.env` (never commit it):

```bash
DATABASE_URL=            # PostgreSQL connection string
JWT_SECRET=              # JWT signing/verification secret
EXPO_PUBLIC_API_URL=     # API URL embedded into each Expo app
OPENAI_API_KEY=          # OpenAI API credential
OPENAI_MODEL=            # Optional model override (defaults to gpt-5-mini)
RESEND_API_KEY=          # Resend API credential
```

---

## 🧪 Test-Driven-Development (TDD) Testing

Narley's domain and security logic is built **test-first (RED → GREEN)** with Vitest.

```bash
# Run Provider + Reader + server tests
npm run test:all

# Run a single app's unit tests
cd apps/provider && npm run test:unit
cd apps/reader && npm run test:unit

# Run server tests
npx vitest run server/
```

---

## 🔌 API Reference

### 🌍 Public / System

```text
GET  /health                    API health check
GET  /resources                 Active, unexpired live resources
POST /login                     Provider login
POST /request-reset             Provider password-reset request
POST /confirm-reset             Provider password-reset confirmation
POST /reader/signup             Reader account creation + verification email
POST /reader/verify             Reader verification-code consumption
POST /reader/login              Reader login
POST /reader/request-reset      Reader password-reset request
POST /reader/confirm-reset      Reader password-reset confirmation
POST /reports                   Reader community report + AI verification
```

### 🏢 Provider (authenticated)

```text
POST   /resources               Create resource
PATCH  /resources/:id           Update owned resource
DELETE /resources/:id           Delete owned resource
POST   /provider/report         Email a problem-resource report to the admin
GET    /provider/alerts         Organization-scoped AI report alerts
DELETE /provider/alerts/:id     Delete a review alert
```

### 📚 Reader (authenticated)

```text
POST   /reader/saved            Create / reuse a saved snapshot
GET    /reader/saved            List the signed-in reader's snapshots
DELETE /reader/saved/:id        Delete an owned snapshot
```

---

## 🗄️ Data Model

```text
User             Provider account
Organization     Provider organization
Membership       Provider ↔ organization relationship + status
Resource         Canonical live community resource
AuditEvent       Resource create/update history
ProviderAlert    AI-verified reader report for provider review
ProviderReport   Provider-to-Narley reporting record
ResetToken       Provider password-reset token
Reader           Reader account
SavedResource    Reader-owned resource snapshot
VerificationCode Reader email-verification code
ReaderResetToken Reader password-reset token
```

---

## 🤝 Contributing

Contributions follow the project's core standards:

- ✅ **Test-first** — new domain/security logic ships with RED → GREEN tests.
- 🧼 **TypeScript strict** — no `any`, no `var`, arrow functions, no class components.
- 🔒 **Never weaken tests** to make code pass.
- 🧾 Keep changes traceable to an approved spec.

---

<div align="center">

### ⭐ If Narley helped you, please star this repo!

<a href="#top">
  <img src="https://img.shields.io/badge/⭐_Star_this_repo-FFD700?style=for-the-badge&logoColor=black" alt="Star this repo" />
</a>

<br/><br/>

**Built with care for the community. 🧭**

</div>
