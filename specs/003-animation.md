# Accordion Animation Specification

Can you animate the expansion and collapse of the accordion behavior?

How do you think this should work so it looks right?

We will likely have images and other content within the panel. We will want it to look very elegant.

## Implementation Approach

The accordion animation uses a **sophisticated multi-layer approach** combining:

### 1. Flex-based Panel Resize
- **Technique**: Animate the `flex` property from `0` to `1`
- **Duration**: 500ms
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` - Material Design deceleration curve
- **Benefit**: GPU-accelerated, handles dynamic content heights automatically

### 2. Staggered Content Fade-In
- **Technique**: Opacity transition with slight delay (50ms)
- **Duration**: 400ms
- **Transform**: Subtle `translateY(20px)` → `translateY(0)` upward motion
- **Benefit**: Content appears to "emerge" from the panel elegantly

### 3. Performance Optimizations
- Uses `will-change: flex, opacity, transform` for GPU acceleration
- Content stays in DOM (prevents image reloading/flickering)
- `pointer-events: none` when collapsed (prevents accidental interaction)

### 4. Accessibility
- Respects `prefers-reduced-motion` media query
- Reduces animation to simple opacity fade for users who prefer reduced motion
- Maintains semantic HTML and ARIA attributes

## Why This Approach?

**Other approaches considered:**

1. **CSS Grid with `grid-template-rows: 0fr/1fr`** - Modern but less browser support
2. **Max-height transitions** - Requires guessing max height, janky with varied content
3. **JavaScript height measurement** - Unnecessary complexity, performance overhead
4. **Animation libraries** - Overkill for this use case

**Our approach wins because:**
- ✅ Works perfectly with full-viewport accordion layout
- ✅ No JavaScript animation logic needed
- ✅ Handles images and dynamic content gracefully
- ✅ Smooth 60fps performance
- ✅ Elegant staggered reveal
- ✅ Fully accessible

## Visual Effect

The animation creates a sophisticated experience:
1. User clicks a header
2. Collapsing panel smoothly shrinks (content fades down)
3. Expanding panel grows to fill space
4. Content gently rises and fades in (slightly delayed for polish)
5. Result feels fluid, elegant, and intentional

Perfect for content-rich panels with images!