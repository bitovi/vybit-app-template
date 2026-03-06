---
name: document-feature
description: Create comprehensive feature requirement documents for the WCU Mosquito Surveillance Web Application. Use when asked to document a feature, write feature requirements, or create feature specifications from the roadmap. Includes user stories, functional requirements, data model review, workflows, and edge cases.
---

# Skill: Documenting Features

This skill defines how to create comprehensive, user-focused feature requirement documents for mock application development.

## What This Skill Does

Creates detailed feature documentation in `wiki/product-management/features/` that:
- Focuses on **user behavior** and **application interactions** (not implementation)
- Reviews and specifies needed **data model changes**
- Documents **workflows**, **edge cases**, and **success criteria**
- Suitable for building a **mock application** to demonstrate functionality

## When to Use This Skill

Use this skill when:
- Creating a new feature document from `wiki/product-management/features.md`
- Expanding a brief feature description into full requirements
- Documenting user interactions and expected behaviors
- Reviewing data model adequacy for a feature

**Do NOT use** this skill for:
- Implementation details (tech stack, libraries, architecture)
- Code-level specifications
- API contract definitions

## Feature Document Structure

### File Naming Convention

```
wiki/product-management/features/{ORDER}-{FEATURE_NAME}.md
```

Examples:
- `001-user-authentication-authorization.md`
- `002-job-submission-file-upload.md`
- `012-epidemiological-cross-job-analysis.md`

### Required Sections

Every feature document MUST include these sections in order:

#### 1. Header
```markdown
# Feature {NUMBER}: {Title}

**Status:** {Core MVP (M0.x) | Enhanced MVP (M1.x) | Scale & Growth (M2.x) | Future Vision}
**Priority:** ⭐ PRIORITY {1-7}
**Last Updated:** {Date}

---
```

#### 2. Overview
- **Value Proposition:** One sentence describing user value
- Brief description (2-3 sentences) of what the feature does

#### 3. User Stories
Format as:
```markdown
### As a {Role}
- I want to {action} so that {benefit}
- I want to {action} so that {benefit}
```

Include stories for all relevant user roles.

#### 4. Functional Requirements
Organized by functional area. Keep these straightforward and focused on what users can do:

```markdown
#### FR-{ABBREV}-001: {Requirement Title}
- User can {do something}
- System displays {something visible}
- User cannot {do something} when {condition}
```

Focus on observable behaviors rather than formal SHALL/SHOULD language. Think "what needs to work in the demo?"

#### 5. Data Model Review

**Critical Section:** Review model directory and specify changes needed.

```markdown
### Current Model Assessment
- ✅ Entity X exists with proper structure
- ✅ Field Y supports required data
- ❌ Missing: Z capability

### Model Additions Needed

#### 1. {Change Description}
**Current Issue:** {What's missing or inadequate}

**Recommendation:** {Proposed solution}

\`\`\`typescript
// Example schema additions
export const NewSchema = z.object({
  field: z.string(),
});
\`\`\`
```

#### 6. User Workflows
Step-by-step user interactions:

```markdown
### Workflow 1: {Workflow Name}

\`\`\`
1. User clicks "Button"
2. System displays form
3. User enters data
4. System validates and shows confirmation
5. User sees updated state
\`\`\`
```

Focus on **what the user sees and does**, not internal processing.

#### 7. Key Error States (Optional)
Document 2-3 important error states to demonstrate in the mock:

```markdown
### {Category} Errors
- **{Scenario}:** {What user sees}
```

Keep this lightweight - focus on the most important error states that show the feature handles problems gracefully. Full production edge case coverage is not needed for mocks.

#### 8. Dependencies
```markdown
### Upstream (Blockers)
- Feature X (what must exist first)

### Downstream (Enabled Features)
- Feature Y (what this enables)
```Demo Goals
What should be demonstrable in the mock:
```markdown
1. ✅ {Key capability to show}
2. ✅ {Important workflow to demonstrate}
3. ✅ {Critical user interaction}
```

Focus on "what would convince someone this feature works?" rather than formal acceptance criteria.✅ {Observable user outcome}
2. ✅ {Measurable metric}
```

#### 10. Out of Scope
What this feature explicitly does NOT include:
```markdown
- {Feature} - {Why deferred}
```

#### 11. Open Questions
Behavioral decisions with **resolved answers** (no implementation questions):

```markdown
### {Question Category}
**{Specific question about user-facing behavior}**

{Recommended answer with reasoning}
```Mock Application Focus

This skill creates requirements for **demonstrable mock applications**, not production systems. Keep documentation:
- **Visual and interactive** - focus on what users see and click
- **Practical** - captures what needs to be built for the demo
- **Lightweight** - comprehensive enough to build from, not exhaustive production specs

### Focus on User Behavior, Not Implementation

✅ **Good (User-Focused, Demo-Ready):**
- "User sees validation errors below the field"
- "Success message appears: 'Job submitted successfully'"
- "After 30 minutes inactive, user is prompted to log in again"

❌ **Bad (Implementation-Focused):**
- "System uses JWT tokens for authentication"
- "Backend validates with Zod schemas"
- "API returns 401 status code"

❌ **Also Bad (Over-Specified for Mock):**
- "System SHALL complete validation in <500ms with p95 latency under 1 second"
- "System SHALL support 1000 concurrent users with 99.9% uptime"
- "Implementation SHALL use AES-256 encryption with FIPS 140-2 compliancinutes of inactivity"

❌ **Bad (Implementation-Focused):**
- "System uses JWT tokens for authentication"
- "Backend validates with Zod schemas"
- "API returns 401 status code"

### Clarifying Questions Policy

**For mock/demo applications:**
- Only ask clarifying questions if there is ambiguity about user-facing behavior or requirements that would affect the user experience or demo scenario.
- Do NOT ask questions about implementation details, technology choices, or anything not visible to the user.
- If a requirement is unclear but not user-facing (e.g., session storage mechanism, security details for mock/demo), assume a sensible default and proceed.
- Prefer to make reasonable assumptions for mock/demo features unless the ambiguity would impact what the user sees or does.

**When to ask clarifying questions:**
- When user-facing behavior is ambiguous or could be interpreted in multiple ways that would affect the demo or mock app experience.
- When a workflow, error state, or visible outcome is not clear from the requirements or discovery artifacts.

**When NOT to ask clarifying questions:**
- When the ambiguity is about backend, security, or technical implementation that does not affect the mock/demo experience.
- When the requirement is only relevant for production, not for a mock/demo.

**Summary:**
> For mock/demo apps, only ask clarifying questions about user-facing behavior. Assume defaults for implementation or production-only details.

### Data Model Review Process

1. **Read the model directory** (`/model/*.ts`)
2. **Identify existing support:** What's already adequate?
3. **Identify gaps:** What's missing or insufficient?
4. **Specify additions:** Provide concrete Zod schema examples
5. **Consider relationships:** How entities connect

**Always specify:**
- New entities needed
- New fields on existing entities
- New enum values
- Relationship changes

### Review Discovery Artifacts

Check `specs/context/discovery-artifacts/` for:
- Wireframes and design specs
- Workshop notes
- Workflow diagrams
- User role definitions
- Related sor over-specified requirements**
   - Too vague: "System should be fast"
   - Too formal: "System SHALL complete in <2 seconds with 95th percentile under 500ms"
   - Just rightce relevant artifacts in requirements.
**Note on Non-Functional Requirements:**
For mock/demo applications, we do NOT include traditional NFR sections about performance metrics, security implementation, scalability targets, etc. These are not relevant for demonstrating user-facing behavior. If a performance or usability concern is user-visible (e.g., "user sees progress indicator during upload"), document it as a functional requirement or in the workflows.


## Example Feature Document

See [001-user-aproduction-level details**
   - Don't include: NFRs, detailed security specs, scalability metrics
   - Do focus on: user-visible behavior and interactions

5. **Over-documenting edge cases**
   - Don't document every possible error scenario
   - Do document: 2-3 key error states to show in the demo

6. **Missing or unresolved open questions**
   - Include questions about ambiguous user-facing behaviors
   - Provide recommended answers with reasoning
   - Skip questions about implementation detailsmmediately after clicking submit"

3. **Skipping data model review**
   - Every feature MUST review the model
   - Always specify concrete schema changes needed

4. **Including NFRs for mock apps**
   - Don't include performance metrics, security implementation details
   - Do focus on user-visible behavior and interactions

5. **Missing edge cases**
   - Think about failures, empty states, conflicts
   - Document expected user-facing behavior

6. **Unresolved open questions**
   - Questions should have recommended answers
   - Focus on behavior, not implementation

## Integration with Other Skills

- **generate-sample-data**: Use after documenting to create mock data for the feature
- **update-data-model**: Use to implement data model changes identified in review

## Checklist

Before completing a feature document, verify:

- [ ] All required sections present and complete
- [ ] User stories cover all relevant roles
- [ ] Functional requirements are clear and demo-focused
- [ ] Data model reviewed with specific additions documented
- [ ] At least 2-3 complete user workflows documented
- [ ] Key error states documented (2-3 important ones)
- [ ] Demo goals are clear and demonstrable
- [ ] No implementation or production-level details included
- [ ] Open questions have recommended answers (focus on user-facing behavior)
- [ ] Related discovery artifacts referenced

---

## Template

Use this template as a starting point:

```markdown
# Feature {XXX}: {Title}

**Status:** {Phase}
**Priority:** ⭐ PRIORITY {N}
**Last Updated:** {Date}

---

## Overview

**Value Proposition:** {One sentence}

{2-3 sentence description}

---

## User Stories

### As a {Role}
- I want to {action} so that {benefit}

---

## Functional Requirements

### {Functional Area}

#### FR-{ABBREV}-001: {Title}
- System SHALL {requirement}

---

## Data Model Review

### Current Model Assessment
{Review existing model}

###Key Error States

### {Category}
- **{Scenario}:** {What user sees}

---

## Dependencies

### Upstream (Blockers)
- {Feature}

### Downstream (Enabled Features)
- {Feature}

---

## Demo Goals

1. ✅ {Demonstrable capability}

---

## Out of Scope

- {Feature} - {Reason}

---

## Open Questions

### {Category}
**{Question about user-facing behavior}**

{Recommended answer with reasoning
---

## Out of Scope

- {Feature} - {Reason}

---

## Open Questions

### {Category}
**{Question}**

{Recommended answer}

---
```
