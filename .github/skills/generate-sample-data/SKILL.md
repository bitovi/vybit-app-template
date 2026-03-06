---
name: generate-sample-data
description: Generate mock/sample data from Zod schemas for testing, development, and mocks. Use when creating sample data generators, setting up test fixtures, populating mock APIs, or generating realistic fake data for development.
---

# Skill: Generate Sample Data from Zod Schemas

Generate type-safe, realistic sample data for testing, development, and mock APIs using Zod schema definitions.

## When to Use This Skill

- Creating sample data generators for domain models
- Populating MSW mock API handlers
- Generating test fixtures
- Creating Storybook stories
- Seeding development databases
- Building realistic demo data

## Technology Stack

| Package | Purpose |
|---------|---------|
| **@anatine/zod-mock** | Generates mock data from Zod schemas via `generateMock()` |
| **@faker-js/faker** | Provides realistic fake data (names, addresses, dates, etc.) |
| **Zod** | Source of truth for type definitions and validation |

## File Structure

All sample generators live in the `/model` directory:

```
model/
├── Job.ts              # Zod schema + type
├── Job.sample.ts       # Sample generator ← THIS FILE
├── User.ts
├── User.sample.ts
└── index.ts            # Re-export samples
```

## Standard Function Signature

Every sample generator follows this pattern:

```typescript
import { generateMock } from '@anatine/zod-mock';
import { EntitySchema, type Entity } from './Entity';

export function createEntitySample(options?: {
  seed?: number;
  overrides?: Partial<Entity>;
}): Entity {
  const seed = options?.seed;
  
  // Generate base sample
  const sample = generateMock(EntitySchema, {
    seed,
  });
  
  // Apply overrides if provided
  if (options?.overrides) {
    return { ...sample, ...options.overrides };
  }
  
  return sample;
}
```

## Two Generation Patterns

### Pattern 1: Simple Schemas (Primitives Only)

For schemas with only primitive types, use `generateMock` directly:

```typescript
import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

// Schema with primitives only
const SiteSchema = z.object({
  id: z.string(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  status: z.enum(['active', 'inactive']),
});

export function createSiteSample(options?: {
  seed?: number;
  overrides?: Partial<Site>;
}): Site {
  const sample = generateMock(SiteSchema, {
    seed: options?.seed,
  });
  
  return options?.overrides 
    ? { ...sample, ...options.overrides }
    : sample;
}
```

### Pattern 2: Composed Schemas (Nested Objects/Arrays)

For schemas that reference other domain models, compose child samples:

```typescript
import { generateMock } from '@anatine/zod-mock';
import { JobSchema, type Job } from './Job';
import { createUserSample } from './User.sample';
import { createSiteSample } from './Site.sample';

export function createJobSample(options?: {
  seed?: number;
  overrides?: Partial<Job>;
}): Job {
  const seed = options?.seed;
  
  // Generate base structure
  const baseSample = generateMock(JobSchema, {
    seed,
    // Skip nested schemas - we'll compose them manually
    stringMap: {
      submittedById: () => createUserSample({ seed })?.id || '',
      siteId: () => createSiteSample({ seed })?.id || '',
    },
  });
  
  return options?.overrides
    ? { ...baseSample, ...options.overrides }
    : baseSample;
}
```

## Enhancing with Faker

Use Faker for more realistic data when Zod defaults aren't specific enough:

```typescript
import { generateMock } from '@anatine/zod-mock';
import { faker, Faker, en } from '@faker-js/faker';
import { UserSchema, type User } from './User';

export function createUserSample(options?: {
  seed?: number;
  overrides?: Partial<User>;
}): User {
  const seed = options?.seed;
  
  // Create seeded faker instance for deterministic output
  const fakerInstance = seed !== undefined 
    ? new Faker({ locale: en }) 
    : faker;
  
  if (seed !== undefined) {
    fakerInstance.seed(seed);
  }
  
  const sample = generateMock(UserSchema, {
    faker: fakerInstance,
    stringMap: {
      // Override specific fields for realistic data
      email: () => fakerInstance.internet.email(),
      username: () => fakerInstance.internet.userName(),
      firstName: () => fakerInstance.person.firstName(),
      lastName: () => fakerInstance.person.lastName(),
    },
  });
  
  return options?.overrides
    ? { ...sample, ...options.overrides }
    : sample;
}
```

### When to Use Faker Overrides

| Use Faker For | Reason |
|--------------|--------|
| Names (first, last, full) | More realistic than random strings |
| Email addresses | Domain-specific formatting |
| Phone numbers | Proper phone formats |
| Addresses | Realistic street/city/zip combinations |
| Company names | Believable company names |
| Dates/times | Realistic date ranges |

| Zod Handles Well | No Override Needed |
|------------------|-------------------|
| Simple strings | Default generation is fine |
| Numbers | Range-appropriate values |
| Booleans | Random true/false |
| Enums | Picks valid enum values |
| UUIDs | When using `z.string().uuid()` |

## Usage Examples

```typescript
// Random data each time
const job1 = createJobSample();
const job2 = createJobSample();

// Deterministic data (same seed = same output)
const job3 = createJobSample({ seed: 123 });
const job4 = createJobSample({ seed: 123 });
// job3 === job4 (deep equal)

// Override specific fields
const job5 = createJobSample({
  overrides: {
    status: JobStatus.COMPLETE,
    jobId: 'custom-job-id',
  },
});

// Combined: seeded + overrides
const job6 = createJobSample({
  seed: 456,
  overrides: { status: JobStatus.FAILED },
});
```

## Using in Mock APIs (MSW)

```typescript
// mock-app/src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { createJobSample } from '@model/Job.sample';
import { createUserSample } from '@model/User.sample';
import { JobStatus } from '@model/enums';

// Generate consistent mock data with seeds
// Use 15-20+ items to ensure scrollbars appear during testing
const mockJobs = Array.from({ length: 20 }, (_, i) => {
  // Add variety with overrides on some items
  if (i % 5 === 0) {
    return createJobSample({ seed: i, overrides: { status: JobStatus.PROCESSING } });
  } else if (i % 7 === 0) {
    return createJobSample({ seed: i, overrides: { status: JobStatus.COMPLETE } });
  } else if (i % 11 === 0) {
    return createJobSample({ seed: i, overrides: { status: JobStatus.FAILED } });
  }
  return createJobSample({ seed: i });
});

export const handlers = [
  http.get('/api/jobs', () => {
    return HttpResponse.json(mockJobs);
  }),
  
  http.post('/api/jobs', async ({ request }) => {
    const body = await request.json();
    const newJob = createJobSample({
      overrides: {
        ...body,
        status: JobStatus.SUBMITTED,
      },
    });
    return HttpResponse.json(newJob, { status: 201 });
  }),
];
```

## Using in Tests

```typescript
import { describe, test, expect } from 'vitest';
import { createJobSample } from '@model/Job.sample';
import { JobSchema } from '@model/Job';

describe('Job Processing', () => {
  test('processes valid job', () => {
    const job = createJobSample({ seed: 123 });
    const result = processJob(job);
    expect(result.success).toBe(true);
  });
  
  test('sample data validates against schema', () => {
    const sample = createJobSample();
    const result = JobSchema.safeParse(sample);
    expect(result.success).toBe(true);
  });
  
  test('deterministic generation', () => {
    const sample1 = createJobSample({ seed: 999 });
    const sample2 = createJobSample({ seed: 999 });
    expect(sample1).toEqual(sample2);
  });
});
```

## Creating Array Samples

Generate arrays of sample data for lists and tables.

**Important: Always generate 15-20+ items for lists/tables** to ensure scrollbars appear during responsive testing.

```typescript
// Generate multiple samples with different seeds
export function createJobSamples(count: number, baseSeed = 0): Job[] {
  return Array.from({ length: count }, (_, i) =>
    createJobSample({ seed: baseSeed + i })
  );
}

// Usage - Generate enough items to trigger scrollbars
const jobs = createJobSamples(20); // ✅ Good: 20 items ensures scrollbars
const jobsWithOffset = createJobSamples(15, 100); // Seeds 100-114
```

**Rule of Thumb:**
- Development/Demo: 15-20 items minimum
- Testing scrolling behavior: 20-30 items
- Performance testing: 100+ items
- Pagination testing: 50+ items

## Exporting from Model Index

Always export sample generators from `/model/index.ts`:

```typescript
// model/index.ts
export * from './Job';
export * from './Job.sample';
export * from './User';
export * from './User.sample';
export * from './Site';
export * from './Site.sample';
export * from './enums';
```

## Testing Sample Generators

Every sample generator should have corresponding tests:

```typescript
// model/Job.sample.test.ts
import { describe, test, expect } from 'vitest';
import { createJobSample } from './Job.sample';
import { JobSchema } from './Job';

describe('createJobSample', () => {
  test('generates valid job data', () => {
    const sample = createJobSample();
    const result = JobSchema.safeParse(sample);
    expect(result.success).toBe(true);
  });
  
  test('seeding produces deterministic output', () => {
    const sample1 = createJobSample({ seed: 42 });
    const sample2 = createJobSample({ seed: 42 });
    expect(sample1).toEqual(sample2);
  });
  
  test('overrides work correctly', () => {
    const sample = createJobSample({
      overrides: {
        jobId: 'custom-id',
        status: JobStatus.COMPLETE,
      },
    });
    expect(sample.jobId).toBe('custom-id');
    expect(sample.status).toBe(JobStatus.COMPLETE);
  });
});
```

## Common Patterns

### Optional Related Entities

```typescript
export function createJobSample(options?: {
  seed?: number;
  overrides?: Partial<Job>;
  includeRelations?: boolean;
}): Job {
  const sample = generateMock(JobSchema, { seed: options?.seed });
  
  // Optionally include related entities
  if (options?.includeRelations) {
    return {
      ...sample,
      site: createSiteSample({ seed: options?.seed }),
      submittedBy: createUserSample({ seed: options?.seed }),
    };
  }
  
  return options?.overrides ? { ...sample, ...options.overrides } : sample;
}
```

### Time-Based Samples

```typescript
export function createRecentJobSample(options?: {
  seed?: number;
  daysAgo?: number;
}): Job {
  const daysAgo = options?.daysAgo || 1;
  
  // ✅ CORRECT: Use seed for deterministic dates
  const baseTimestamp = options?.seed !== undefined
    ? new Date(2026, 1, 20, 10, 0, 0).getTime() + (options.seed * 1000)
    : Date.now();
  
  const submittedAt = new Date(baseTimestamp - (daysAgo * 24 * 60 * 60 * 1000));
  const updatedAt = new Date(baseTimestamp);
  
  return createJobSample({
    seed: options?.seed,
    overrides: {
      submittedAt: submittedAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    },
  });
}
```

## Key Principles

1. **Types derive from Zod schemas** - Use `z.infer<typeof Schema>`
2. **JSON serializable only** - No Date objects, use ISO 8601 strings
3. **Consistent naming** - Always `create[Entity]Sample` or `create[Entity]Samples`
4. **Seed for determinism** - Pass seed for reproducible test data
5. **Overrides for flexibility** - Support partial overrides for specific test cases
6. **Export from model** - All sample generators in `/model/*.sample.ts`
7. **Sufficient data quantity** - Generate 15-20+ items for lists/tables to ensure scrollbars during responsive testing

## ⚠️ CRITICAL: Deterministic Dates with Seeds

**NEVER use `Date.now()` or `new Date()` directly in sample generators when a seed is provided!**

### ❌ WRONG - Non-Deterministic (Causes Test Failures)

```typescript
export function createJobSample(options?: { seed?: number }): Job {
  return generateMock(JobSchema, {
    seed: options?.seed,
    stringMap: {
      // ❌ BAD: Different timestamp each time, even with same seed!
      submittedAt: () => new Date().toISOString(),
      processingStartedAt: () => new Date(Date.now() - 60000).toISOString(),
    },
  });
}
```

**Problem:** Even with `seed: 42`, each call generates different timestamps:
- First call: `"2026-02-24T10:30:00Z"`
- Second call: `"2026-02-24T10:30:05Z"` ← Different! Tests fail!

### ✅ CORRECT - Deterministic Dates

```typescript
export function createJobSample(options?: { seed?: number }): Job {
  // Use seed to derive a deterministic base timestamp
  const baseTimestamp = options?.seed !== undefined
    ? new Date(2026, 1, 20, 10, 0, 0).getTime() + (options.seed * 1000)
    : Date.now(); // Only fall back to Date.now() when NO seed provided
  
  return generateMock(JobSchema, {
    seed: options?.seed,
    stringMap: {
      // ✅ GOOD: Same seed = same timestamp, always
      submittedAt: () => new Date(baseTimestamp).toISOString(),
      processingStartedAt: () => new Date(baseTimestamp - 60000).toISOString(),
      completedAt: () => new Date(baseTimestamp + 120000).toISOString(),
    },
  });
}
```

**Result:** With `seed: 42`, timestamps are identical across all calls:
- First call: `"2026-02-20T18:00:42.000Z"`
- Second call: `"2026-02-20T18:00:42.000Z"` ← Same! Tests pass!

### Pattern for Time Offsets

```typescript
// Base timestamp from seed
const baseTimestamp = options?.seed !== undefined
  ? new Date(2026, 1, 20, 10, 0, 0).getTime() + (options.seed * 1000)
  : Date.now();

// Create time points relative to base
const submittedAt = new Date(baseTimestamp);
const processingStartedAt = new Date(baseTimestamp + (5 * 60 * 1000)); // +5 min
const completedAt = new Date(baseTimestamp + (30 * 60 * 1000)); // +30 min

return {
  submittedAt: submittedAt.toISOString(),
  processingStartedAt: processingStartedAt.toISOString(),
  completedAt: completedAt.toISOString(),
};
```

### Why This Matters

**Non-deterministic dates cause:**
- ❌ Tests fail randomly depending on when they run
- ❌ Snapshot tests always fail
- ❌ E2E tests see different data on each run
- ❌ Storybook stories show different dates on refresh
- ❌ "Recent jobs" logic becomes unpredictable

**Deterministic dates ensure:**
- ✅ Same seed always produces same data
- ✅ Tests are reproducible
- ✅ Snapshots remain stable
- ✅ E2E tests see consistent data
- ✅ Storybook stories are predictable

## Installation

Install required dependencies:

```bash
npm install -D @anatine/zod-mock @faker-js/faker
```

## Decision Guide

| Scenario | Approach |
|----------|----------|
| Schema with only primitives | Use `generateMock` directly |
| Schema with nested domain objects | Compose with child sample creators |
| Need realistic names/emails/phones | Use Faker `stringMap` overrides |
| Need deterministic test data | Pass `{ seed: number }` |
| Testing specific edge cases | Use `{ overrides: {...} }` |
| Generating multiple samples | Create helper function with loop |

## Benefits

✅ **Type Safety** - Generated samples match Zod schemas exactly  
✅ **Deterministic** - Seeded generation for reproducible tests  
✅ **DRY** - One sample generator used everywhere (tests, mocks, storybook)  
✅ **Realistic** - Faker integration for believable fake data  
✅ **Maintainable** - Update schema, samples update automatically  
✅ **Centralized** - All sample logic in `/model` directory
