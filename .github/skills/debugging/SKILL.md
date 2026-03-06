---
name: debugging-skill
description: Always start a fresh browser session after any file change, walk through the full user flow, and monitor for errors before proceeding with further work.
---

# Debugging Skill: Error-Free UI Verification

## Purpose
Ensure that after any code change, the mock app is fully reloaded, the user flow is tested from the beginning (including login if required), and no runtime errors or warnings are present before continuing with feature work or test automation.

## Workflow

1. **Restart Browser Session**
   - After any file change or hot-reload, always start a new browser session (do not reuse previous state).
   - This ensures no stale state, session, or login issues.

2. **Walk Through Full User Flow**
   - Begin at the login page (unless login bypass is enabled).
   - Log in with a valid user (or use bypass if available).
   - Navigate to the target page (e.g., jobs page, submission form).
   - Interact with the UI as a real user would.

3. **Monitor for Errors and Warnings**
   - Capture all browser console logs, errors, and exceptions during navigation and interaction.
   - Do not proceed if any runtime errors or warnings are present.
   - Only continue with feature work or test automation when the UI is confirmed error-free.

4. **Bypass Login for Debugging (Optional)**
   - If an environment flag (e.g., `VITE_BYPASS_LOGIN=true`) is set, skip the login screen and auto-authenticate as a default user.
   - This makes debugging and E2E testing faster and more reliable.

## Best Practices
- Always verify the UI is in a clean, logged-in state before testing features.
- Use Playwright or similar tools to automate the flow and error monitoring.
- Document any errors found and fix them before proceeding.

---

This skill should be followed for all feature implementation, E2E test writing, and UI debugging in the mock app.
