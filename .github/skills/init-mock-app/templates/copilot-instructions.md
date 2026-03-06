---
applyTo: '**'
---

# My App - Copilot Instructions

## Data Model Architecture

### Single Source of Truth: `/model` Directory

**All type definitions must be defined in the `/model` directory.** No type definitions should exist outside of this directory.

### Model Structure

Each domain entity in `/model` should have:

```
model/
├── Entity.ts           # Zod schemas and TypeScript types
├── Entity.sample.ts    # Sample/mock data generators
├── enums.ts           # Shared enums
└── index.ts           # Re-exports
```

### Using Model Types

**Always import types and schemas from `@model`:**

```typescript
import type { Entity } from '@model';
import { EntitySchema } from '@model';
```

The TypeScript path alias `@model` is configured in `tsconfig.json`:

```json
{
  "paths": {
    "@model": ["../model/index"],
    "@model/*": ["../model/*"]
  }
}
```

## Enforcement

- All type definitions MUST originate from `/model`
- Mock data generators MUST live in `/model/*.sample.ts`
- Use `@model` import alias consistently
- Never define interfaces/types for domain entities outside `/model`
