---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Bitovi-Specific Adaptation

**When working on Bitovi projects, follow the established brand guidelines:**

### Design System First
- **ALWAYS refer to** [STYLE_GUIDE.md](../../../context/bitovi/STYLE_GUIDE.md) and [DESIGN_TOKENS.md](../../../context/bitovi/DESIGN_TOKENS.md)
- Respect the established color palette (Teal, BitOrange, Gray scale)
- Use the approved typography system (professional sans-serif)
- Follow spacing, layout, and component patterns from the design system

### Brand-Aligned Creativity
The "avoid generic fonts" guidance does NOT apply when working within an existing design system. Instead:
- **Typography**: Use Bitovi's established font system; creativity comes from hierarchy, spacing, and composition
- **Color**: Stick to the brand palette; creativity comes from application, contrast, and emphasis
- **Layout**: Respect Bitovi's clean, professional aesthetic; creativity comes from thoughtful arrangement and rhythm
- **Components**: Build on established patterns; creativity comes from refinement and polish

### When to Be Creative
- **Page composition**: Arrange elements in interesting, balanced ways within brand guidelines
- **Micro-interactions**: Add delightful hover states, transitions, and animations
- **Visual hierarchy**: Create clear, engaging information architecture
- **Curved line motifs**: Leverage Bitovi's signature visual elements creatively
- **Spacing and rhythm**: Use generous whitespace and consistent patterns
- **Component refinement**: Polish details, improve accessibility, enhance usability

### Bitovi's Design Philosophy
- **Professional yet approachable**: Expert without being distant
- **Clean and modern**: Not brutalist, not maximalist — refined and intentional
- **Brand consistency**: Repeated patterns build recognition and trust
- **User-focused**: Clarity and usability over novelty
- **Collaborative aesthetic**: Warm, authentic, human

**Remember**: For Bitovi projects, excellence comes from faithful execution of the brand guidelines with meticulous attention to detail, not from creative deviation.

## Design Thinking

**IMPORTANT**: When working within an existing design system or brand (like Bitovi), see the [Bitovi-Specific Adaptation](#bitovi-specific-adaptation) section above. The bold, creative guidance below applies primarily to greenfield projects or when explicitly asked to explore new design directions.

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

**Note**: These guidelines apply to creative, exploratory projects. When working within an established brand system (see [Bitovi-Specific Adaptation](#bitovi-specific-adaptation)), follow the existing design tokens and patterns.

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

**Clarification**: Using a professional sans-serif font within an established brand system (like Bitovi) is NOT the same as defaulting to generic choices. Brand consistency is intentional; generic AI patterns are thoughtless. The key difference is whether choices serve a coherent design vision.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**Exception**: When working within a brand system, consistency IS the goal. Repeat brand patterns faithfully.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
