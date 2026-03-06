FROM mcr.microsoft.com/devcontainers/typescript-node:24-bookworm

# Install Playwright system dependencies for chromium
RUN npx playwright@latest install-deps chromium

# Install chromium for E2E tests (@playwright/test)
RUN npx playwright@latest install chromium

# Install chromium for Playwright MCP (@playwright/mcp uses its own playwright-core)
RUN npx -y @playwright/mcp@latest --version > /dev/null 2>&1 || true && \
    npx -y playwright-core@latest install chromium

# Set working directory
WORKDIR /workspaces/app

# Expose ports for Vite dev server and Storybook
EXPOSE 5173 6006
