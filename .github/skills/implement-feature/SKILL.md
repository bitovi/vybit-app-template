---
name: implement-feature
description: End-to-end workflow for implementing a new feature in the mock-app, ensuring data model alignment, sample data, UI/UX consistency, component reuse, and automated verification with Playwright MCP.
---


# Implement Feature Skill (Mock App Only)

## Purpose
Guide the complete implementation of a new feature in the mock-app. This skill is **only for UI-driven, mock features**—no server-side or backend code should be created. Ensure:
- Data model and sample data are correct and centralized
- UI/UX patterns are consistent and reusable
- Components are discoverable and tested
- The feature is visually and functionally verified using Playwright MCP (including Storybook stories)
- E2E tests are generated for all new flows

---

## When to Use
- Building a new UI-driven feature, page, or workflow in the mock-app
- Adding or updating domain logic, UI, or sample data (mock only)
- Ensuring new features follow project conventions and leverage reusable components

**Do not use this skill to build server-side, backend, or production API code. All features must be mock, UI-driven, and client-side only.**

---

## Workflow

1. **Clarify Feature Requirements**
   - Reference the feature spec or user story.
   - If unclear, use the `document-feature` skill to create or refine requirements.

2. **Data Model Alignment**
   - Use `update-data-model` to add or modify Zod schemas in `/model`.
   - Ensure all types are defined in `/model` and imported via `@model`.
   - If sample/mock data is needed, use `generate-sample-data` to create or update sample generators in `/model/*.sample.ts`.

3. **Check Component Registry and Extract Components FIRST**
   - **Read the Component Registry**: `.github/skills/component-registry/REGISTRY.md`
   - **Check what components you need**:
     - Button, Card, Badge, Table, Form inputs, etc.
     - Look under "✅ Extracted Components" for existing components
     - Look under "⚠️ Patterns Needing Extraction" for unextracted patterns
   - **Extract patterns marked ⚠️ NEEDS EXTRACTION BEFORE implementing**:
     - If registry shows a pattern used 2+ times, extract it first
     - Create component in `/mock-app/src/components/ui/`
     - Create Storybook story
     - Refactor existing usages to use new component
     - Update registry: Change status from ⚠️ to ✅
   - **Rule: If you use the same element 2+ times in YOUR feature, extract it.**
   - **Do this BEFORE building new pages.**

4. **Select UI/UX Pattern**
   - Use the `UX Pattern Selector` skill (if available) to choose the right UI pattern.
   - Verify all needed reusable components from step 3 now exist (extracted or already available).

5. **Implement UI & Logic**
   - Build new pages in `/mock-app/src/pages` **using only the extracted reusable components**.
   - **NO inline buttons, forms, cards, or repeated patterns** - use components from step 3.
   - Compose new components when needed, always with Storybook stories.

6. **Mock Data & API**
   - Update `/mock-app/src/mocks/handlers.ts` to provide mock API responses using sample data from `/model`.
   - Ensure mock data matches the Zod schemas.
   - **Provide sufficient data (15-20+ items) to trigger scrollbars** in lists/tables during testing.

7. **Automated Verification (Playwright MCP)**
    - Use Playwright MCP to:
       - Verify the feature in the running mock-app (visual and functional checks)
       - Verify Storybook stories for new/updated components
       - **Use `responsive-design` skill to verify responsiveness across breakpoints and test scrollbar behavior**
   - Generate E2E tests with Playwright for all new flows. These tests should verify that the mock app is able to express or demo the feature—not that a real backend or production implementation exists.

8. **Testing & Storybook**
   - Run and verify the feature in the mock-app.
   - Use Storybook to validate reusable components.
   - Update or add tests as needed.

9. **Update Component Registry**
   - **Update the Component Registry** (`.github/skills/component-registry/REGISTRY.md`):
     - Add any new components you created to "✅ Extracted Components"
     - Document patterns you noticed used 2+ times but didn't extract in "⚠️ Patterns Needing Extraction"
     - Update usage counts for components you used
     - Add entry to Maintenance Log
   - Update relevant skills if new patterns/conventions are introduced.

---

## References
- `document-feature`: For writing or refining feature specs.
- `responsive-design`: For ensuring features work across all device sizes and testing scrollbar behavior.
- `update-data-model`: For Zod schemas and types in `/model`.
- `generate-sample-data`: For mock/sample data in `/model/*.sample.ts`.
- `component-registry`: **For tracking and managing reusable components and patterns**.
- `create-skill`: For documenting new workflows or skills.
- **Component Registry**: `.github/skills/component-registry/REGISTRY.md` - Check this FIRST!
- **Reusable Components**: Place in `/mock-app/src/components/ui`, with a Storybook story.
- **Playwright MCP**: For automated UI verification and E2E test generation.

---
Component Registry reviewed** (`.github/skills/component-registry/REGISTRY.md`)
- [ ] **Patterns marked ⚠️ NEEDS EXTRACTION extracted FIRST** (before building UI)
- [ ] **New reusable components extracted** (Button, Card, Badge, etc.)
- [ ] **Storybook story created for EACH component** before using in pages
- [ ] UI pattern selectedr story)
- [ ] Data model updated in `/model` (Zod schema + sample data)
- [ ] **Reusable components extracted FIRST** (Button, Card, Badge, Table, etc.)
- [ ] **Storybook story created for EACH component** before using in pages
- [ ] UI pattern selected via UX Pattern Selector
- [ ] Sample data generated (minimum 15-20 items for lists/tables)
- [ ] **Pages built using ONLY reusable components** (no inline buttons/forms/cards)
- [ ] **Component Registry updated** with new components and observed patterns
- [ ] Documentation/skills updated if new patterns/convention
- [ ] Playwright MCP used to verify feature and stories
- [ ] **Responsive design verified using `responsive-design` skill** (mobile, tablet, desktop)
- [ ] **Scrollbar behavior tested** (vertical scroll with 15-20+ items, no horizontal overflow)th 15-20+ items, no horizontal overflow)
- [ ] Playwright MCP used to verify feature and stories
- [ ] E2E tests generated for all new flows (tests should verify the mock app can demo the feature, not real implementation correctness)
- [ ] Documentation/skills updated if new patterns/components added
