---
name: responsive-design
description: Make UIs responsive across all devices and verify responsiveness using Playwright. Includes scrollbar testing, breakpoint verification, and layout validation. Use when implementing new features, fixing layout issues, or ensuring mobile compatibility.
---

# Responsive Design & Verification Skill

## Purpose
Ensure all UI features are fully responsive and work correctly across all device sizes, from mobile to desktop. This skill provides:
- Responsive design patterns using Tailwind CSS
- Automated verification using Playwright MCP resize capability
- Scrollbar and overflow testing
- Guidelines for providing sufficient data to trigger scrollbars

---

## Standard Breakpoints

Follow Tailwind's default breakpoints:

| Breakpoint | Min Width | Device Type | Use Case |
|------------|-----------|-------------|----------|
| `xs` (default) | 0px | Mobile | Base styles, mobile-first |
| `sm:` | 640px | Large mobile | Larger phones in landscape |
| `md:` | 768px | Tablet | iPads, tablets |
| `lg:` | 1024px | Laptop | Laptops, small desktops |
| `xl:` | 1280px | Desktop | Standard desktop |
| `2xl:` | 1536px | Large Desktop | Large monitors |

### Testing Sizes
Use these specific dimensions for Playwright testing:

```typescript
const testSizes = [
  { width: 375, height: 667, name: 'Mobile (iPhone SE)' },
  { width: 768, height: 1024, name: 'Tablet (iPad)' },
  { width: 1280, height: 720, name: 'Desktop (HD)' },
  { width: 1920, height: 1080, name: 'Desktop (Full HD)' },
];
```

Or use device presets:
```typescript
const devicePresets = [
  'iPhone 13',
  'iPad Pro 11',
  'Desktop Chrome'
];
```

---

## Responsive Design Patterns

### 1. Navigation

**Mobile (< 768px):**
- Hamburger menu icon
- Collapsed navigation drawer
- Single-column layout

**Desktop (≥ 768px):**
- Full horizontal navigation bar
- All menu items visible
- Logo and nav items side-by-side

```tsx
<nav className="flex items-center justify-between p-4">
  {/* Mobile: Hamburger */}
  <button className="md:hidden">
    <HamburgerIcon />
  </button>
  
  {/* Desktop: Full nav */}
  <div className="hidden md:flex space-x-4">
    <NavLink href="/dashboard">Dashboard</NavLink>
    <NavLink href="/jobs">Jobs</NavLink>
    <NavLink href="/sites">Sites</NavLink>
  </div>
</nav>
```

### 2. Data Tables

**Mobile:**
- Stack rows as cards
- Show key fields only
- Horizontal scroll for full table (if needed)

**Desktop:**
- Traditional table layout
- All columns visible
- Sortable headers

```tsx
{/* Mobile: Card view */}
<div className="md:hidden space-y-4">
  {items.map(item => (
    <Card key={item.id}>
      <div className="flex justify-between">
        <span className="font-bold">{item.name}</span>
        <Badge>{item.status}</Badge>
      </div>
      <div className="text-sm text-gray-600">{item.date}</div>
    </Card>
  ))}
</div>

{/* Desktop: Table view */}
<div className="hidden md:block overflow-x-auto">
  <table className="min-w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td><Badge>{item.status}</Badge></td>
          <td>{item.date}</td>
          <td><Actions item={item} /></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### 3. Forms

**Mobile:**
- Single column layout
- Full-width inputs
- Stacked label above input
- Large touch targets (min 44x44px)

**Desktop:**
- Can use grid layout (2+ columns for simple fields)
- Inline labels for short fields
- More compact spacing

```tsx
<form className="space-y-4">
  {/* Single column on mobile, 2 columns on desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium mb-1">First Name</label>
      <input className="w-full px-3 py-2 border rounded" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Last Name</label>
      <input className="w-full px-3 py-2 border rounded" />
    </div>
  </div>
  
  {/* Full width on all sizes */}
  <div>
    <label className="block text-sm font-medium mb-1">Email</label>
    <input className="w-full px-3 py-2 border rounded" />
  </div>
  
  {/* Button: Full width on mobile, auto on desktop */}
  <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded">
    Submit
  </button>
</form>
```

### 4. Layout Containers

**Use appropriate padding and max-widths:**

```tsx
{/* Page container */}
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content automatically responsive */}
</div>

{/* Content max-width */}
<div className="max-w-7xl mx-auto">
  {/* Content */}
</div>

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

### 5. Typography

```tsx
{/* Responsive font sizes */}
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Page Title
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Body text that scales appropriately.
</p>
```

---

## Scrollbars & Overflow Testing

### Ensuring Scrollbars Appear

**Always provide sufficient mock data** to trigger scrollbars during testing:

- **Lists/Tables**: Minimum 15-20 items (ensures vertical scroll on most screens)
- **Long text content**: Use realistic paragraph lengths (100+ words)
- **Horizontal content**: Test with wide tables (8+ columns)
- **Nested scrolling**: Test both page-level and container-level scrolls

### Overflow Patterns

**Vertical Scroll (Full Page):**
```tsx
<div className="min-h-screen">
  {/* Long list of items */}
  {items.map(item => <ItemCard key={item.id} item={item} />)}
</div>
```

**Container Scroll (Fixed Height):**
```tsx
<div className="h-96 overflow-y-auto border rounded">
  {/* Scrollable content within fixed container */}
  {items.map(item => <ItemCard key={item.id} item={item} />)}
</div>
```

**Horizontal Scroll (Tables):**
```tsx
<div className="overflow-x-auto">
  <table className="min-w-full">
    {/* Wide table that scrolls horizontally on small screens */}
  </table>
</div>
```

**Scroll with Sticky Headers:**
```tsx
<div className="h-96 overflow-y-auto">
  <table>
    <thead className="sticky top-0 bg-white">
      <tr>{/* Headers stay visible while scrolling */}</tr>
    </thead>
    <tbody>
      {/* Scrollable rows */}
    </tbody>
  </table>
</div>
```

---

## Playwright Verification Workflow

Use Playwright MCP tools to verify responsive behavior at each breakpoint.

### 1. Navigate to Feature

```typescript
// Start browser and navigate
await mcp_playwright_navigate({
  url: 'http://localhost:5173/jobs',
  width: 1280,
  height: 720
});
```

### 2. Test Each Breakpoint

```typescript
// Test at each breakpoint
const breakpoints = [
  { width: 375, height: 667, name: 'Mobile' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 1280, height: 720, name: 'Desktop' },
];

for (const breakpoint of breakpoints) {
  // Resize window
  await mcp_playwright_resize({
    width: breakpoint.width,
    height: breakpoint.height
  });
  
  // Or use device preset:
  // await mcp_playwright_resize({ device: 'iPhone 13' });
  
  // Take screenshot
  await mcp_playwright_screenshot({
    name: `feature-${breakpoint.name.toLowerCase()}`,
    savePng: true
  });
  
  // Verify key elements visible
  await mcp_playwright_get_visible_text();
}
```

### 3. Verify Scrollbars

**Check if content is scrollable:**

```typescript
// Check for vertical scroll
await mcp_playwright_evaluate({
  script: `
    const hasVerticalScroll = document.documentElement.scrollHeight > window.innerHeight;
    const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
    
    return {
      hasVerticalScroll,
      hasHorizontalScroll,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: window.innerWidth
    };
  `
});
```

**Test scrolling behavior:**

```typescript
// Scroll to bottom
await mcp_playwright_evaluate({
  script: 'window.scrollTo(0, document.documentElement.scrollHeight);'
});

// Take screenshot of bottom
await mcp_playwright_screenshot({
  name: 'scrolled-to-bottom',
  savePng: true
});

// Scroll back to top
await mcp_playwright_evaluate({
  script: 'window.scrollTo(0, 0);'
});
```

**Test container scrolling:**

```typescript
// Scroll within a specific container
await mcp_playwright_evaluate({
  script: `
    const container = document.querySelector('.scrollable-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
      return { scrolled: true, scrollHeight: container.scrollHeight };
    }
    return { scrolled: false };
  `
});
```

### 4. Check for Common Issues

```typescript
// Check for horizontal overflow (unintentional)
await mcp_playwright_evaluate({
  script: `
    const bodyWidth = document.body.scrollWidth;
    const windowWidth = window.innerWidth;
    const hasOverflow = bodyWidth > windowWidth;
    
    // Find elements causing overflow
    const overflowElements = Array.from(document.querySelectorAll('*'))
      .filter(el => el.scrollWidth > windowWidth)
      .map(el => ({
        tag: el.tagName,
        class: el.className,
        width: el.scrollWidth
      }));
    
    return { hasOverflow, bodyWidth, windowWidth, overflowElements };
  `
});
```

---

## Responsive Design Checklist

For each new feature, verify:

### Layout
- [ ] Content stacks appropriately on mobile (single column)
- [ ] Multi-column layouts work on tablet/desktop
- [ ] No horizontal overflow on any breakpoint
- [ ] Padding/margins scale appropriately
- [ ] Container max-widths prevent over-stretching

### Navigation
- [ ] Mobile: Hamburger menu or collapsed nav
- [ ] Desktop: Full navigation visible
- [ ] Active states clearly visible
- [ ] Touch targets ≥ 44x44px on mobile

### Forms
- [ ] Full-width inputs on mobile
- [ ] Appropriate grid layouts on desktop
- [ ] Labels clearly associated with inputs
- [ ] Submit buttons accessible at all sizes
- [ ] Error messages visible and readable

### Tables/Lists
- [ ] Mobile: Card view or horizontal scroll
- [ ] Desktop: Full table with all columns
- [ ] Vertical scroll with 15-20+ items
- [ ] Sticky headers work when scrolling
- [ ] Actions/buttons accessible in both views

### Typography
- [ ] Font sizes scale with breakpoints
- [ ] Line length appropriate (45-75 characters)
- [ ] Headings maintain hierarchy at all sizes
- [ ] Text remains readable on small screens

### Scrollbars
- [ ] Sufficient data to trigger vertical scroll (15-20+ items)
- [ ] Scrolling works smoothly
- [ ] Container scrolls independent of page scroll (if applicable)
- [ ] Horizontal scroll only where intentional (tables)
- [ ] No unexpected horizontal page scroll
- [ ] Sticky elements remain visible while scrolling

### Images/Media
- [ ] Images scale appropriately
- [ ] No broken layouts from large images
- [ ] Aspect ratios maintained
- [ ] Lazy loading for performance

### Touch Interactions
- [ ] All interactive elements ≥ 44x44px
- [ ] Adequate spacing between touch targets
- [ ] Hover states have touch equivalents
- [ ] No reliance on hover for critical functionality

---

## Common Mistakes to Avoid

1. **Desktop-first thinking**: Always start with mobile layout, enhance for desktop
2. **Fixed widths**: Use `w-full`, `max-w-*`, avoid `w-[500px]` except for specific cases
3. **Too many breakpoints**: Stick to 2-3 key breakpoints per feature
4. **Inconsistent navigation**: Nav pattern should be the same across all pages
5. **Insufficient test data**: Always provide 15-20+ items to test scrolling
6. **Ignoring horizontal overflow**: Always check for unintentional horizontal scroll
7. **Tiny touch targets**: Mobile buttons must be large enough (44x44px minimum)
8. **Hidden content on mobile**: Ensure all critical content accessible on small screens

---

## Integration with Other Skills

- **implement-feature**: Call this skill after initial implementation to verify responsiveness
- **write-e2e-test**: Include responsive tests in E2E test suites
- **generate-sample-data**: Ensure sample generators create enough data (15-20+ items)

---

## Example: Complete Responsive Verification

```typescript
// 1. Navigate to feature
await mcp_playwright_navigate({
  url: 'http://localhost:5173/jobs',
  width: 1280,
  height: 720
});

// 2. Test each breakpoint
const devices = ['iPhone 13', 'iPad Pro 11', 'Desktop Chrome'];

for (const device of devices) {
  await mcp_playwright_resize({ device });
  
  // Screenshot
  await mcp_playwright_screenshot({
    name: `jobs-${device.toLowerCase().replace(/\s+/g, '-')}`,
    savePng: true
  });
  
  // Verify key content visible
  const text = await mcp_playwright_get_visible_text();
  console.log(`${device} visible content:`, text);
}

// 3. Check scrollbars on desktop
await mcp_playwright_resize({ width: 1280, height: 720 });
const scrollInfo = await mcp_playwright_evaluate({
  script: `
    return {
      hasScroll: document.documentElement.scrollHeight > window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      itemCount: document.querySelectorAll('.job-card').length
    };
  `
});

console.log('Scroll info:', scrollInfo);

// 4. Test scrolling
await mcp_playwright_evaluate({
  script: 'window.scrollTo(0, document.documentElement.scrollHeight);'
});

await mcp_playwright_screenshot({
  name: 'jobs-scrolled-bottom',
  savePng: true
});

// 5. Check for overflow issues
const overflowCheck = await mcp_playwright_evaluate({
  script: `
    return {
      hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth,
      bodyWidth: document.body.scrollWidth,
      windowWidth: window.innerWidth
    };
  `
});

if (overflowCheck.hasHorizontalOverflow) {
  console.error('⚠️ Horizontal overflow detected!', overflowCheck);
}
```

---

## Success Criteria

A feature is considered responsive when:

1. ✅ Works on mobile (375px), tablet (768px), and desktop (1280px+)
2. ✅ No horizontal overflow at any breakpoint
3. ✅ All content accessible without horizontal scrolling (except intentional table scroll)
4. ✅ Vertical scrollbars appear with sufficient data (15-20+ items)
5. ✅ Navigation adapts appropriately (hamburger on mobile, full nav on desktop)
6. ✅ Forms are usable on all screen sizes
7. ✅ Touch targets meet minimum size requirements (44x44px)
8. ✅ Screenshots verify layout at each breakpoint
9. ✅ Playwright tests confirm scrolling behavior

---

## Resources

- **Bitovi Design System**:
  - **Design Tokens**: `context/bitovi/DESIGN_TOKENS.md` - Breakpoints, spacing scale, responsive patterns
  - **Style Guide**: `context/bitovi/STYLE_GUIDE.md` - Responsive design patterns, mobile-first approach
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Playwright MCP Resize Tool](mcp_playwright_resize)
- [Web Content Accessibility Guidelines - Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
