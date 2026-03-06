# Component Registry

**Last Updated**: February 24, 2026

This registry tracks reusable UI components in the mock-app.

---

## Extracted Components

### Button
- **Path**: `/mock-app/src/components/ui/Button.tsx`
- **Description**: Reusable button with variants (primary, secondary, success, danger, ghost) and sizes (sm, md, lg). Includes full TypeScript types, accessibility support, and Storybook stories.

### Card
- **Path**: `/mock-app/src/components/ui/Card.tsx`
- **Description**: Container component with variants (default, bordered, elevated) and padding options (none, sm, md, lg) for grouping content. Includes Storybook stories.

### Badge
- **Path**: `/mock-app/src/components/ui/Badge.tsx`
- **Description**: Generic inline label/tag component with variants (default, primary, success, warning, danger, info) and sizes (sm, md, lg) for displaying metadata or categories. Includes Storybook stories.

### Modal
- **Path**: `/mock-app/src/components/ui/Modal.tsx`
- **Description**: Dialog/modal overlay component for displaying content in a popup. Supports multiple sizes (sm, md, lg, xl, 2xl), optional title, keyboard navigation (Escape to close), backdrop click handling, and scroll lock. Includes comprehensive Storybook stories.

### ProcessingStatusBadge
- **Path**: `/mock-app/src/features/spectral-analysis-processing/ProcessingStatusBadge.tsx`
- **Description**: Domain-specific badge for displaying job processing status with color coding

### RiskIndicator
- **Path**: `/mock-app/src/features/job-list/RiskIndicator.tsx`
- **Description**: Domain-specific component for displaying risk assessment results with parity percentage

### Dashboard
- **Path**: `/mock-app/src/components/Dashboard.tsx`
- **Description**: Main dashboard layout component (page-specific, likely not reusable)

---

## Potential Components (Not Yet Extracted)

_(No unextracted patterns identified at this time)_