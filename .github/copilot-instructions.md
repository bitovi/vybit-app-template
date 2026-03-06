---
applyTo: '**'
---

# Western Carolina Discovery - Copilot Instructions

## Data Model Architecture

### Single Source of Truth: `/model` Directory

**All type definitions must be defined in the `/model` directory.** No type definitions should exist outside of this directory.

#### ✅ Correct Pattern

```typescript
// In /model/Job.ts
export const JobSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  status: JobStatusSchema,
  // ...
});
export type Job = z.infer<typeof JobSchema>;

// In mock-app/src/pages/JobsPage.tsx
import type { Job } from '@model';
```

#### ❌ Incorrect Pattern

```typescript
// In mock-app/src/pages/JobsPage.tsx
interface Job {  // ❌ NO! Types must come from /model
  id: string;
  jobId: string;
  // ...
}
```

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
import type { Job, User, Site } from '@model';
import { JobStatus, UserRole } from '@model/enums';
import { JobSchema } from '@model';
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

### Sample Data for Mock App

**Sample data generators live in `/model`**, not in the mock-app:

```typescript
// In /model/Job.sample.ts
export function createJobSample(options?: {
  seed?: number;
  overrides?: Partial<Job>;
}): Job {
  // Generate sample using @anatine/zod-mock
  return sample;
}

// In mock-app/src/mocks/handlers.ts
import { createJobSample } from '@model/Job.sample';

const mockJobs = [
  createJobSample({ seed: 1 }),
  createJobSample({ seed: 2 }),
  createJobSample({ seed: 3, overrides: { status: JobStatus.COMPLETE } }),
];
```

## Benefits of This Approach

1. **Single Source of Truth**: One place to update types and they propagate everywhere
2. **Type Safety**: Compile-time checking across the entire application
3. **Runtime Validation**: Zod schemas can validate API responses and form data
4. **Consistent Mock Data**: Same sample generators used in tests, storybook, and mock APIs
5. **Maintainability**: Changes to the data model are explicit and centralized

## Enforcement

- All type definitions MUST originate from `/model`
- Mock data generators MUST live in `/model/*.sample.ts`
- Use `@model` import alias consistently
- Never define interfaces/types for domain entities outside `/model`

## Available Skills

Agent Skills provide specialized knowledge for specific tasks. Load these skills when relevant:

- **component-registry**: Track and manage reusable UI components and patterns in the mock-app. Use when implementing features to check for existing components, identify patterns needing extraction, and maintain the component inventory. Always check the registry BEFORE creating new UI components.
- **create-skill**: Create new Agent Skills for this project. Use when asked to create a skill, document a workflow, or teach Copilot a new capability. Skills are stored in .github/skills/ and can include instructions, scripts, examples, and resources.
- **debug-e2e-test**: Debug and fix failing Playwright E2E tests. Use when tests fail, when asked to fix failing tests, or when investigating test failures. Analyzes test output, screenshots, error context, and uses Playwright MCP to identify root causes.
- **extract-ui-component**: Extract reusable UI components from inline patterns. Use when creating shared UI primitives (Button, Card, Badge, etc.). Covers component design, TypeScript props, Storybook stories, refactoring strategy, and accessibility best practices.
- **frontend-design**: Create distinctive, production-grade frontend interfaces with high design quality. Use when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
- **generate-sample-data**: Generate mock/sample data from Zod schemas for testing, development, and mocks. Use when creating sample data generators, setting up test fixtures, populating mock APIs, or generating realistic fake data for development.
- **init-mock-app**: Initialize a minimal hello-world mock-app with React, Vite, TypeScript, Tailwind CSS, React Router, and MSW. Use when scaffolding a new mock-app from scratch, bootstrapping a project skeleton, or starting a fresh prototype.
- **responsive-design**: Make UIs responsive across all devices and verify responsiveness using Playwright. Includes scrollbar testing, breakpoint verification, and layout validation. Use when implementing new features, fixing layout issues, or ensuring mobile compatibility.
- **update-data-model**: Add or modify domain entities in the data model using Zod schemas. Use when creating new entities, adding fields, changing relationships, or updating the domain model structure. Covers schema creation, TypeScript types, and updating dependent files.
