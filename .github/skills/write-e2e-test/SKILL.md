---
name: write-e2e-test
description: Create, maintain, and verify end-to-end (E2E) tests for the mock-app using Playwright MCP. Ensures new features and flows are robustly tested and visually verified.
---

# Write E2E Test Skill

## Purpose
Guide the creation, maintenance, and verification of end-to-end (E2E) tests for the mock-app using Playwright MCP.

---

## When to Use
- A new feature or flow is implemented and needs E2E coverage
- Updating or refactoring existing flows
- Verifying UI and functional correctness across user journeys

---

## Workflow

1. **Identify Test Scenarios**
   - Review the feature spec, user story, or acceptance criteria
   - List critical user journeys, edge cases, and error paths

2. **Set Up Playwright MCP**
   - Ensure Playwright MCP is configured for the mock-app
   - Start the mock-app and MCP server if not already running

3. **Write E2E Test**
   - Create a new Playwright test file in the appropriate directory (e.g., `/mock-app/e2e/`)
   - Use Playwright MCP to record or script the test, covering:
     - Main user flows
     - Edge cases and error handling
     - Visual verification (screenshots, assertions)
   - Use data from `/model` sample generators for realistic test data

4. **Run and Verify**
   - Execute the E2E test(s) against the running mock-app
   - Use Playwright MCP to:
     - Validate UI state and visual correctness
     - Assert expected outcomes and error messages
   - Fix any issues or update tests as needed

5. **Maintain and Document**
   - Update tests when features or flows change
   - Document test coverage and known gaps
   - Reference the test in the relevant feature spec or skill

---

## References
- `implement-feature`: For orchestrating feature delivery and when to trigger E2E test creation
- `generate-sample-data`: For generating realistic test data
- `update-data-model`: For ensuring test data matches schemas
- **Playwright MCP**: For test authoring, running, and visual verification

---

## Checklist
- [ ] Test scenarios identified from feature spec/user story
- [ ] Playwright MCP configured and running
- [ ] E2E test file created in `/mock-app/e2e/`
- [ ] Main flows, edge cases, and errors covered
- [ ] Visual and functional assertions included
- [ ] Test passes against running mock-app
- [ ] Test documented and referenced in feature/skill
