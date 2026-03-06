---
name: extract-ui-component
description: Extract reusable UI components from inline patterns. Covers component design, TypeScript props, Storybook stories, refactoring strategy, and best practices for creating shared UI primitives.
---

# Extract UI Component Skill

## Purpose
Guide the extraction of reusable UI components from inline code patterns. This skill ensures components are:
- Well-designed with flexible, composable APIs
- Type-safe with proper TypeScript interfaces
- Documented with comprehensive Storybook stories
- Accessible and keyboard-navigable
- Safely integrated through strategic refactoring

---

## When to Use
- Component Registry shows a pattern marked ⚠️ NEEDS EXTRACTION
- You notice the same UI element used 2+ times in your feature
- Creating generic UI primitives (Button, Card, Badge, Input, etc.)
- Refactoring inline patterns into shared components

---

## Workflow

### 1. Analyze Existing Patterns

**Goal**: Understand all variations before designing the component API.

**Steps**:
1. Review Component Registry for pattern locations
2. Read through 3-5 examples of the pattern in actual code
3. Identify variations:
   - Visual variants (primary, secondary, success, danger, ghost)
   - Size variants (sm, md, lg)
   - State variants (disabled, loading, active)
   - Content variants (with icon, text-only, icon-only)

**Example for Button**:
```typescript
// Found patterns:
// 1. Primary: bg-blue-600 hover:bg-blue-700
// 2. Success: bg-green-600 hover:bg-green-700
// 3. Danger: bg-red-600 hover:bg-red-700
// 4. Ghost: text-blue-600 hover:text-blue-800
// Common: px-4 py-2 rounded-lg font-semibold
```

---

### 2. Design Component API

**Goal**: Create a flexible, composable API that covers all use cases.

**Guidelines**:
- **Props**: Use TypeScript discriminated unions for variants
- **Composition**: Accept `children` for content
- **Flexibility**: Allow `className` override for edge cases
- **HTML attributes**: Spread remaining props to underlying element
- **Defaults**: Choose sensible defaults (variant="primary", size="md")

**Design Pattern**:
```typescript
interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

**API Questions to Answer**:
- What variants are necessary? (Don't over-engineer)
- What sizes are used in the design?
- What HTML attributes should be passed through?
- Should it accept refs? (Use `forwardRef` if needed)
- What's the default variant and size?

---

### 3. Implement Component

**Location**: `/mock-app/src/components/ui/ComponentName.tsx`

**Structure**:
```typescript
import React from 'react';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function ComponentName({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ComponentNameProps) {
  // Build className string based on variants
  const baseClasses = 'base-classes-here';
  const variantClasses = {
    primary: 'variant-specific-classes',
    secondary: 'variant-specific-classes',
    // ...
  };
  const sizeClasses = {
    sm: 'size-specific-classes',
    md: 'size-specific-classes',
    lg: 'size-specific-classes',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();
  
  return (
    <element className={classes} {...props}>
      {children}
    </element>
  );
}
```

**Best Practices**:
- Use TypeScript for type safety
- Export both the component and its props interface
- Use string template for className composition
- Preserve all HTML attributes with `...props`
- Allow `className` override but apply it last
- Use semantic HTML elements
- Add JSDoc comments for complex props

---

### 4. Create Storybook Story

**Location**: `/mock-app/src/components/ui/ComponentName.stories.tsx`

**Structure**:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story for each variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      <ComponentName variant="success">Success</ComponentName>
      <ComponentName variant="danger">Danger</ComponentName>
    </div>
  ),
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};

// Showcase states (if applicable)
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
```

**Story Guidelines**:
- Create a story for each major variant
- Create combo stories (AllVariants, AllSizes)
- Show state variations (disabled, loading, active)
- Use `render` function for complex examples
- Add argTypes for interactive controls
- Use `tags: ['autodocs']` for auto-generated docs

---

### 5. Test Component in Storybook

**Steps**:
1. Run Storybook: `npm run storybook`
2. Navigate to your component: UI/ComponentName
3. Verify all variants render correctly
4. Test interactive controls in the Controls panel
5. Check responsiveness at different viewport sizes
6. Test keyboard navigation (Tab, Enter, Space)
7. Verify accessibility in the Accessibility panel

**Checklist**:
- [ ] All variants display correctly
- [ ] All sizes display correctly
- [ ] Disabled state works
- [ ] className override works
- [ ] HTML attributes pass through correctly
- [ ] Keyboard navigation works
- [ ] No console errors or warnings

---

### 6. Create Barrel Export

**Location**: `/mock-app/src/components/ui/index.ts`

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

This allows clean imports: `import { Button } from '@/components/ui';`

---

### 7. Refactor Existing Code

**Strategy**: Refactor incrementally, one file at a time.

**Steps**:
1. **Pick one file** from Component Registry locations
2. **Add import**: `import { ComponentName } from '@/components/ui/ComponentName';`
3. **Replace ONE instance** of inline pattern with component
4. **Test the page** - verify it still works
5. **Replace remaining instances** in that file
6. **Commit** with descriptive message
7. **Repeat** for next file

**Example Refactoring**:
```typescript
// Before
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow">
  Submit
</button>

// After
<Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>
```

**Refactoring Tips**:
- Refactor one file at a time
- Test after each file
- Keep onClick and other handlers
- Preserve any custom classes with className prop
- Commit frequently
- Run tests to catch regressions

---

### 8. Update Component Registry

**Add to "✅ Extracted Components"**:
```markdown
### ComponentName
- **Location**: `/mock-app/src/components/ui/ComponentName.tsx`
- **Storybook**: `ComponentName.stories.tsx`
- **Props**: variant (primary | secondary | ...), size (sm | md | lg), children, className, ...HTMLAttributes
- **Usage Count**: X usages across Y files
- **Status**: ✅ EXTRACTED
```

**Update Maintenance Log**:
```markdown
| 2026-02-24 | Extracted ComponentName | Refactored X instances across Y files |
```

**Remove from "⚠️ Patterns Needing Extraction"**:
- Delete the pattern entry since it's now extracted

---

## Accessibility Guidelines

### Button Components
- Use `<button>` element (not `<div>` with click handler)
- Include `type` attribute (button, submit, reset)
- Ensure focus is visible (focus ring)
- Support keyboard navigation (Enter, Space)
- Add `aria-label` if button has no text (icon-only)
- Add `aria-disabled` when disabled

### Card Components
- Use semantic HTML (`<article>`, `<section>`)
- Ensure adequate color contrast (4.5:1 for text)
- Make clickable cards keyboard accessible

### Badge Components
- Use `<span>` element
- Ensure color is not the only indicator (use text/icons)
- Maintain adequate contrast

---

## Common Pitfalls

### Over-Engineering
- ❌ Don't add variants you don't use yet
- ✅ Start with what exists, add more later

### Inflexible APIs
- ❌ Don't hardcode everything
- ✅ Accept `className` for overrides
- ✅ Spread `...props` for HTML attributes

### Poor TypeScript
- ❌ Don't use `any` or unclear types
- ✅ Extend proper HTML element types
- ✅ Export prop interfaces

### Incomplete Storybook
- ❌ Don't create just one story
- ✅ Create stories for all variants and states
- ✅ Add interactive controls

### Unsafe Refactoring
- ❌ Don't refactor everything at once
- ✅ Refactor one file at a time
- ✅ Test after each change
- ✅ Commit frequently

---

## Example: Button Component

See the implementation workflow:
1. Analyzed patterns: 4 variants (primary, success, danger, ghost), 3 sizes
2. Designed API: ButtonProps with variant, size, disabled
3. Implemented: `/mock-app/src/components/ui/Button.tsx`
4. Created Storybook: `Button.stories.tsx` with 8+ stories
5. Tested: Verified all variants, sizes, states
6. Refactored: Updated 13+ files incrementally
7. Updated Registry: Moved from ⚠️ to ✅

---

## References
- `component-registry`: For tracking components and patterns
- `implement-feature`: When to extract components during feature work
- **Storybook Docs**: https://storybook.js.org/docs/
- **React TypeScript Cheatsheet**: https://react-typescript-cheatsheet.netlify.app/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## Checklist
- [ ] Analyzed existing patterns (3-5 examples)
- [ ] Designed component API (props, variants, sizes)
- [ ] Implemented component with TypeScript
- [ ] Created comprehensive Storybook story
- [ ] Tested in Storybook (all variants, sizes, states)
- [ ] Created barrel export in index.ts
- [ ] Refactored existing code (one file at a time)
- [ ] Tested refactored pages
- [ ] Updated Component Registry
- [ ] Committed changes with descriptive message
