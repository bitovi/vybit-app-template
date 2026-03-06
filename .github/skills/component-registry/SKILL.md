---
name: component-registry
description: Track and manage reusable UI components and patterns in the mock-app. Maintains an inventory of extracted components and unextracted patterns to promote incremental refactoring and prevent code duplication.
---

# Component Registry Skill

## Purpose
Maintain a living inventory of UI components and patterns in the mock-app to:
- **Track what components exist** and where to find them
- **Identify repeated patterns** that should be extracted
- **Enable incremental refactoring** - each new feature cleans up before adding
- **Prevent duplication** - check registry before creating new components

---

## Registry Location
`/Users/justinmeyer/dev/western-carolina-discovery/.github/skills/component-registry/REGISTRY.md`

---

## Registry Structure

### Extracted Components
Components that exist as reusable, shared implementations:

```markdown
### Button
- **Path**: `/mock-app/src/components/ui/Button.tsx`
- **Description**: Reusable button with variants (primary, secondary, success, danger, ghost) and sizes (sm, md, lg)
```

### Potential Components (Not Yet Extracted)
Patterns that might need extraction:

```markdown
### Card
- **Name**: Card
- **Description**: Container with white background, border, rounded corners, and shadow
- **Found in**: `/mock-app/src/pages/OrganizationJobsPage.tsx`, `/mock-app/src/pages/JobsPage.tsx`
```

---

## How to Use This Skill

### When Starting a New Feature

1. **Check Registry for Existing Components**
   - Read `.github/skills/component-registry/REGISTRY.md`
   - Look for components you need in the "Extracted Components" section
   - If found, read the component file to understand how to use it

2. **Check for Potential Components**
   - Review "Potential Components" section
   - If a pattern you need is listed multiple times, consider extracting it first

### After Implementing a Feature

1. **Add New Components**
   - Add any new reusable components you created (path + brief description)

2. **Note Potential Components**
   - If you used the same inline pattern 2+ times, add it to "Potential Components"
   - Include: name, brief description, and path to file where it appears

---

## Maintenance Commands

### Scan for Button Patterns
```bash
# Find all button elements with repeated className patterns
grep -r '<button' mock-app/src/pages/ | grep -o "className=\"[^\"]*\"" | sort | uniq -c | sort -rn
```

### Scan for Card/Panel Patterns
```bash
# Find repeated card/container patterns
grep -r 'className=".*bg-white.*rounded.*shadow' mock-app/src/pages/ -n
```

### Count Component Usages
```bash
# Count usages of an existing component
grep -r "import.*Button.*from.*components/ui" mock-app/src/ | wc -l
```

### Scan for Form Input Patterns
```bash
# Find repeated input patterns
grep -r '<input' mock-app/src/pages/ | grep -o "className=\"[^\"]*\"" | sort | uniq -c | sort -rn
```

---

## Maintenance

### Helpful Commands

Scan for repeated button patterns:
```bash
grep -r '<button' mock-app/src/pages/ | grep -o "className=\"[^\"]*\"" | sort | uniq -c | sort -rn
```

Scan for card/panel patterns:
```bash
grep -r 'className=".*bg-white.*rounded.*shadow' mock-app/src/pages/ -n
```

Count component usages:
```bash
grep -r "import.*Button.*from.*components/ui" mock-app/src/ | wc -l
```

---

## Benefits

- **Find before creating**: Check what exists before building something new
- **Spot duplication**: Identify patterns that appear multiple times
- **Incremental improvement**: Registry grows organically with each feature
