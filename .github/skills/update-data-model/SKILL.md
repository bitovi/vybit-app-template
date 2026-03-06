---
name: update-data-model
description: Add or modify domain entities in the data model using Zod schemas. Use when creating new entities, adding fields, changing relationships, or updating the domain model structure. Covers schema creation, TypeScript types, and updating dependent files.
---

# Skill: Updating the Data Model

This skill covers how to work with the domain model in the `model/` directory, which uses Zod for schema validation and TypeScript for type definitions.

## Model Architecture

The model uses a **one entity per file** structure with Zod schemas:

```
model/
├── index.ts          # Barrel export (update when adding entities)
├── enums.ts          # Shared enums
├── User.ts           # User entity + schema
├── Job.ts            # Job entity + schema
└── Site.ts           # Site entity + schema
```

### Key Principles

1. **Zod for validation**: Base schemas validate core fields (no relationships)
2. **TypeScript for relationships**: Interfaces extend base types with optional navigation properties
3. **Foreign keys**: End with `Id` suffix (e.g., `submittedById`, `siteId`)
4. **Navigation properties**: Use full entity names (e.g., `submitter`, `site`, not `submittedBy`)
5. **Circular references**: Use `import()` types in TypeScript interfaces

## When to Use This Skill

- Adding a new entity (e.g., File, Comment, Report)
- Adding fields to an existing entity
- Creating or modifying relationships
- Changing enums or validation rules
- Renaming fields or entities

## Adding a New Entity

### Step 1: Create the Entity File

Create `model/YourEntity.ts`:

```typescript
/**
 * YourEntity Entity
 * 
 * Brief description of what this entity represents.
 * Relationships:
 * - YourEntity → RelatedEntity (1:many via relationshipName)
 */

import { z } from 'zod';
import { YourStatus } from './enums'; // If needed

// ============================================================================
// Zod Enums
// ============================================================================

export const YourStatusSchema = z.nativeEnum(YourStatus);

// ============================================================================
// YourEntity Schema
// ============================================================================

/**
 * YourEntity entity (base)
 * Core fields without relationships
 */
export const YourEntityBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: YourStatusSchema,
  // Foreign keys end with 'Id'
  relatedEntityId: z.string(), // FK → RelatedEntity
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * YourEntity schema for validation
 * Uses the base schema and allows optional relationship fields
 */
export const YourEntitySchema = YourEntityBaseSchema;

// ============================================================================
// TypeScript Types
// ============================================================================

export type YourEntityBase = z.infer<typeof YourEntityBaseSchema>;

/**
 * YourEntity with optional relationships
 * Includes navigation properties for related entities
 */
export interface YourEntity extends YourEntityBase {
  relatedEntity?: import('./RelatedEntity').RelatedEntity; // Navigation property
  childEntities?: Array<import('./ChildEntity').ChildEntity>; // 1:many
}
```

### Step 2: Add Enum (if needed)

Add to `model/enums.ts`:

```typescript
export enum YourStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}
```

### Step 3: Update model/index.ts

Add exports:

```typescript
// Export YourEntity entity
export {
  YourEntitySchema,
  YourEntityBaseSchema,
  YourStatusSchema,
  type YourEntity,
  type YourEntityBase,
} from './YourEntity';
```

### Step 4: Update Related Entities

Add navigation properties to related entities:

```typescript
// In RelatedEntity.ts
export interface RelatedEntity extends RelatedEntityBase {
  yourEntities?: Array<import('./YourEntity').YourEntity>; // Add this
}
```

### Step 5: Update model/README.md

Update the Mermaid diagram to include the new entity and its relationships:

```markdown
# In model/README.md, add to the erDiagram:

YourEntity }o--|| RelatedEntity : "belongs to"
YourEntity ||--o{ ChildEntity : "contains"

RelatedEntity ||--o{ YourEntity : "has"
ChildEntity }o--|| YourEntity : "belongs to"
```

## Adding a Field to an Existing Entity

### Step 1: Update Base Schema

Add field to the Zod schema:

```typescript
export const JobBaseSchema = z.object({
  // ... existing fields
  priority: z.enum(['low', 'medium', 'high']), // Add new field
  // ... rest of fields
});
```

### Step 2: TypeScript Types Auto-Update

TypeScript types are inferred from the schema, so they update automatically.

### Step 3: Update Mock Data

Update MSW handlers in `mock-app/src/mocks/handlers.ts`:

```typescript
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Site Survey',
    priority: 'high', // Add new field
    // ... other fields
  },
];
```

### Step 4: Update Storybook Stories

Update story data in `*.stories.tsx` files:

```typescript
const exampleJob: Job = {
  id: '1',
  title: 'Site Survey',
  priority: 'medium', // Add new field
  // ... other fields
};
```

## Changing a Relationship
5. Remove relationship lines from `model/README.md` Mermaid diagram

### Adding a Relationship

1. **Add foreign key** to base schema (e.g., `ownerId`)
2. **Add navigation property** to TypeScript interface (e.g., `owner?: User`)
3. **Update related entity** with inverse navigation property
4. **Update index.ts** if new entities involved

### Removing a Relationship

1. Remove foreign key from base schema
2. Remove navigation property from interface
3. Remove inverse navigation property from related entity
4. Update all mock data removing the field

## Field Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Foreign Key | `entityNameId` | `userId`, `siteId`, `submittedById` |
| Navigation Property (1:1 or many:1) | `entityName` | `user`, `site`, `submitter` |
| Navigation Property (1:many) | `entityNames` (plural) | `jobs`, `submittedJobs` |
| Enum | PascalCase | `UserRole`, `JobStatus` |
| Enum Values | SCREAMING_SNAKE_CASE | `IN_PROGRESS`, `ACTIVE` |

## Common Validation Patterns

```typescript
// Email validation
email: z.string().email()

// URL validation
url: z.string().url()

// Min/max string length
name: z.string().min(3).max(100)

// Number range
priority: z.number().min(1).max(10)

// Optional with default
isActive: z.boolean().default(true)

// Enum from values
status: z.enum(['draft', 'published', 'archived'])

// Enum from TypeScript enum
status: z.nativeEnum(JobStatus)

// Date string (ISO 8601)
createdAt: z.string().datetime()

// Array
tags: z.array(z.string())

// Nested object
metadata: z.object({
  version: z.string(),
  source: z.string(),
})
```

## Importing and Using the Model

### In Components

```typescript
import { Job, JobStatus } from '@model';

function JobCard({ job }: { job: Job }) {
  // Access base fields
  console.log(job.title, job.submittedById);
  
  // Access optional relationships
  if (job.submitter) {
    console.log(job.submitter.name);
  }
}
```

### In MSW Handlers

```typescript
import { Job, JobSchema } from '@model';

export const handlers = [
  http.get('/api/jobs/:id', () => {
    const job: Job = {
      id: '1',
      title: 'Site Survey',
      // ... required fields
    };
    return HttpResponse.json(job);
  }),
];
```

### Runtime Validation

```typescript
import { JobSchema } from '@model';

// Parse and validate
try {
  const validJob = JobSchema.parse(unknownData);
} catch (error) {
  console.error('Validation failed:', error);
}

// Safe parse (no throw)
const result = JobSchema.safeParse(unknownData);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Common Mistakes to Avoid

### ❌ Don't: Mix FK and Navigation Property Names

```typescript
// BAD: Confusing names
export const JobBaseSchema = z.object({
  submittedBy: z.string(), // This is a FK, should end in Id
});

export interface Job extends JobBase {
  submittedBy?: User; // Naming collision!
}
```

```typescript
// GOOD: Clear distinction
export const JobBaseSchema = z.object({
  submittedById: z.string(), // FK clearly identified
});

export interface Job extends JobBase {
  submitter?: User; // Navigation property has different name
}
```

### ❌ Don't: Add Relationships to Zod Schemas

```typescript
// BAD: Creates circular dependency issues
export const UserSchema = UserBaseSchema.extend({
  submittedJobs: z.array(JobSchema), // Don't do this
});
```

```typescript
// GOOD: Add relationships only to TypeScript interfaces
export const UserSchema = UserBaseSchema;

export interface User extends UserBase {
  submittedJobs?: Array<import('./Job').Job>; // Do this instead
}
```

### ❌ Don't: Forget to Update index.ts

When adding a new entity, always update `model/index.ts` to export it.

### ❌ Don't: Forget to Update Mock Data

After schema changes, update:
- MSW handlers (`mock-app/src/mocks/handlers.ts`)
- Storybook stories (`*.stories.tsx`)
- Test fixtures

## Testing Schema Changes

After making changes, verify:

1. **TypeScript compiles**: Check for errors in VS Code
2. **Mock data validates**: Run dev server (`npm run dev`)
3. **Stories render**: Run Storybook (`npm run storybook`)
4. **Tests pass**: Run tests if available

## Example: Adding a Priority Field

```typescript
// 1. Add enum to model/enums.ts
export enum JobPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// 2. Update model/Job.ts base schema
import { JobStatus, JobPriority } from './enums';

export const JobPrioritySchema = z.nativeEnum(JobPriority);

export const JobBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  priority: JobPrioritySchema, // Add this
  status: JobStatusSchema,
  // ... rest
});

// 3. Update model/index.ts
export {
  JobSchema,
  JobBaseSchema,
  JobStatusSchema,
  JobPrioritySchema, // Add this
  type Job,
  type JobBase,
} from './Job';

// 4. Update mock data
const mockJobs: Job[] = [
  {
    id: '1',
    priority: JobPriority.HIGH, // Add this
    // ... rest
  },
];
```

## Related Files

After updating the model, you may need to update:
del/README.md` - **ALWAYS update the Mermaid diagram** when adding/removing entities or relationships
- `mo
- `mock-app/src/mocks/handlers.ts` - MSW mock data
- `mock-app/src/features/*/*.stories.tsx` - Storybook stories
- Component prop types - If components accept entity types
- API integration code - When backend syncs with model

## Questions to Ask Before Changing the Model

1. **Is this a breaking change?** Will existing mock data still work?
2. **Do relationships make sense?** Are they bidirectional where needed?
3. **Are FK names clear?** Do they end with `Id`?
4. **Is validation appropriate?** Not too strict, not too loose?
5. **Are enums needed?** Or should it be a string field?

## Summary

- One entity per file in `model/`
- Zod schemas for base fields only
- TypeScript interfaces for relationships
- FK fields end with `Id`, navigation properties don't
- Always update `model/index.ts`
- Update mock data and stories after changes
