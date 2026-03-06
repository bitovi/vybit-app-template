# Bitovi.com Style Guidelines

*Last Updated: March 5, 2026*

This document outlines the design system and style guidelines for Bitovi.com based on analysis of the website's current design patterns, visual language, and brand identity.

## Table of Contents
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Components](#components)
- [Visual Elements & Motifs](#visual-elements--motifs)
- [Icons & Graphics](#icons--graphics)
- [Forms](#forms)
- [Imagery](#imagery)
- [Navigation](#navigation)

---

## Color Palette

### Primary Colors

**BitOrange 500 (Brand)**
- Hex: `#F5532D`
- Usage: Primary accent color, highlights, curved line decorations, CTAs
- Applications: Accent buttons, links, decorative elements, brand moments
- Note: Use sparingly to accent or highlight

**Teal (Primary Brand Color)**
- Teal 600: `#00848B` - Primary buttons, interactive elements
- Teal 800: `#00464A` - Dark sections, footer
- Teal 900: `#023538` - Darkest teal variant
- Usage: Primary brand color, CTAs, headers, backgrounds
- Applications: Primary action buttons, navigation, dark sections
- Note: Should always be balanced with white

### Neutral Colors (Gray Palette)

**Gray 800**
- Hex: `#334041`
- Usage: Headings, body text, icons
- Applications: Primary text color, strong contrast

**Gray 600**
- Hex: `#687879`
- Usage: Secondary text, captions
- Applications: Descriptions, supporting text

**Gray 400**
- Hex: `#A3ADAD`
- Usage: Tertiary text, borders
- Applications: Lighter text, dividers

**Gray 200**
- Hex: `#DFE2E2`
- Usage: Subtle borders, dividers
- Applications: Card borders, section dividers

**Gray 100**
- Hex: `#F4F5F5`
- Usage: Background sections, card backgrounds
- Applications: Section backgrounds, subtle contrast

**White**
- Hex: `#FFFFFF`
- Usage: Primary background, text on dark backgrounds, card surfaces
- Applications: Main background, content areas

### Extended Palette

Bitovi has a comprehensive extended color palette for various design needs:

**Gradient Patterns**

**Teal Radial Gradient** (Official Pattern)
- Gradient: radial-gradient(circle, #04646A 0%, #002A2D 100%)
- Inner: Teal 700 (#04646A)
- Outer: Teal 950 (#002A2D)
- Usage: Backgrounds, hero sections, visual depth

**Tertiary Colors (for data visualization, status indicators)**
- **Yellow**: Warning states, highlights (#CF7C01 for Yellow 500)
- **Green**: Success states, positive indicators (#5FA657 for Green 500)
- **Blue**: Information states, links (#5B91E9 for Blue 500)
- **Violet**: Special emphasis (#B068F4 for Violet 500)
- **Pink**: Alert states, special highlights (#DA5AB6 for Pink 500)

See [Brand Style Guide - Colors](https://wiki.at.bitovi.com/wiki/spaces/BSG/pages/850591826/Colors) for complete palette with all shades

---

## Typography

### Font Families

**Official Bitovi Typefaces** (Google Fonts):

**Poppins (Bold only)**
- [Google Fonts: Poppins](https://fonts.google.com/specimen/Poppins)
- Usage: Display font for headlines and buttons
- Weight: Bold (700) only
- Line Height: 1.2x font size
- No wrapping typically; used at varying sizes

**Inter (Regular)**
- [Google Fonts: Inter](https://fonts.google.com/specimen/Inter)
- Usage: Body font for all text content
- Weight: Regular (400), Bold (700) for emphasis
- Line Height: 1.5x font size
- Used at varying sizes

**Roboto Mono**
- [Google Fonts: Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)
- Usage: Code or monospace only
- Weight: Regular (400)

**Important**: These typefaces have specific purposes and are not interchangeable. Poppins for display, Inter for body, Roboto Mono for code only.

### Typography Scale & Hierarchy

**Scale Rule**: Titles should be 4x the size of body text. Headings should be 2x body text (halfway between titles and body).

**Hero Headings (H1) - Poppins Bold**
- Font: Poppins
- Size: 56px (4x body text if body is 14px, or adjust proportionally)
- Weight: Bold (700)
- Line Height: 1.2
- Color: #334041 (Gray 800) or #00464A (Teal 800)
- Usage: Page titles, hero sections

**Section Headings (H2) - Poppins Bold**
- Font: Poppins
- Size: 40px
- Weight: Bold (700)
- Line Height: 1.2
- Color: #334041 (Gray 800) or #00464A (Teal 800)
- Usage: Major section titles

**Subsection Headings (H3) - Poppins Bold**
- Font: Poppins
- Size: 28px (2x body text)
- Weight: Bold (700)
- Line Height: 1.2
- Color: #334041 (Gray 800) or #00464A (Teal 800)
- Usage: Component titles, card headers

**Body Text - Inter Regular**
- Font: Inter
- Size: 16-18px (base size)
- Weight: Regular (400)
- Line Height: 1.5
- Color: #334041 (Gray 800)
- Usage: Paragraphs, descriptions

**Body Emphasis - Inter Bold**
- Font: Inter
- Weight: Bold (700)
- Color: #00848B (Teal 600)
- Usage: Emphasized words or phrases

**Small Text/Captions - Inter Regular**
- Font: Inter
- Size: 14px
- Weight: Regular (400)
- Line Height: 1.5
- Color: #687879 (Gray 600)
- Usage: Captions, helper text, metadata

**Links - Inter Regular**
- Font: Inter
- Weight: Regular (400)
- Color: #00848B (Teal 600)
- Text Decoration: Underline
- Usage: Inline links, navigation links

**Code - Roboto Mono**
- Font: Roboto Mono
- Weight: Regular (400)
- Usage: Code snippets, technical content only

### Typography Color Rules

- **On Teal Backgrounds**: White text only
- **On White Backgrounds**: Dark teal (#00464A) or dark gray (#334041) text
- **Emphasis**: Inter Bold + Teal 600 (#00848B)
- **Links**: Teal 600 (#00848B) + underline

**Color Contrast**
- Ensure text meets WCAG AA standards (4.5:1 for body, 3:1 for large text)
- Follow established color rules for accessibility

---

## Spacing & Layout

### Grid System
- Max content width: ~1200-1400px
- Responsive breakpoints: Mobile (320px), Tablet (768px), Desktop (1024px+)
- Content centering with symmetric padding

### Spacing Scale

**Bitovi uses an 8-pixel spacing grid with 4-pixel half-steps.**

- XXS: 4px (half-step)
- XS: 8px (1x grid)
- S: 16px (2x grid)
- M: 24px (3x grid)
- L: 32px (4x grid)
- XL: 48px (6x grid)
- XXL: 64px (8x grid)
- XXXL: 96px (12x grid)

### Section Spacing
- Between major sections: 64-96px vertical padding
- Section internal padding: 48-64px
- Component margins: 24-32px

### Container Padding
- Desktop: 48px horizontal
- Tablet: 32px horizontal
- Mobile: 16-24px horizontal

---

## Components

### Buttons

**Primary Button (Teal)**
- Background: Bitovi Teal `#00C2B8`
- Text: White
- Padding: 12px 32px
- Border Radius: ~4-8px
- Font Weight: Semi-bold (600)
- Hover State: Slightly darker teal
- Usage: Primary CTAs ("Submit", "Contact Us")

**Secondary Button (Orange)**
- Background: Bitovi Orange
- Text: White
- Padding: 12px 32px
- Border Radius: ~4-8px
- Font Weight: Semi-bold (600)
- Hover State: Slightly darker orange

**Text Links**
- Color: Bitovi Orange or text color with arrow
- Often include arrow icon →
- Example: "Learn more about Figma Training"

### Cards

**Standard Card**
- Background: White
- Shadow: Subtle (0 2px 8px rgba(0,0,0,0.1))
- Border Radius: 8-12px
- Padding: 24-32px
- Usage: Case studies, service offerings, team member profiles

**Image Card**
- Image at top or as background
- Caption/title overlay or below
- Border radius maintained on image
- Usage: Team photos, case study previews, brand logos

**Icon Card**
- Icon at top (often custom illustration)
- Title below icon
- Description text
- Optional CTA link
- Usage: Services grid, features showcase

### Forms

**Input Fields**
- Height: ~48px
- Border: 1px solid light gray
- Border Radius: 4px
- Padding: 12px 16px
- Focus State: Border color changes to Bitovi Orange or Teal
- Label: Above input, semi-bold

**Form Layout**
- Vertical stacking preferred
- Required fields marked with asterisk (*)
- Consistent spacing between fields (16-24px)
- Full-width on mobile

**Contact Form Pattern**
- Fields: First name*, Last name, Company name*, Work Email*, Phone number, Message/Details
- Submit button: Teal primary button
- Validation: Real-time or on submit

---

## Visual Elements & Motifs

### Curved Line Patterns

**Distinctive Visual Motif**
- Curved connecting lines with dots at endpoints
- Alternating colors: Orange and Gray
- Usage: Process diagrams, flow illustrations, section connectors
- SVG-based for crisp rendering
- Examples: "Our Process" section connections

### Circular Process Diagrams

**Central Hub Design**
- Central icon/element
- Surrounding elements in circular arrangement
- Connecting curved lines radiating outward
- Active/highlighted states with rings
- Usage: Process visualization, workflow diagrams

### Decorative Icons Rings

**Active Ring Indicator**
- Circular highlight ring around icons
- Teal or orange color
- Animated or static
- Usage: Active state for process icons, feature highlights

---

## Icons & Graphics

### Icon Library

**Bitovi uses [Phosphor Icons](https://phosphoricons.com/)**
- Weight: Regular (default)
- Weight: Light (for larger sizes)
- Style: Clean, modern, consistent
- Monochrome or brand colors
- Size: 24px-64px depending on context

**Icon Colors**
- Default: #334041 (Gray 800)
- Accent: #F5532D (BitOrange)
- Secondary: #687879 (Gray 600)
- On Teal: #FFFFFF (White)

**Common Icon Uses**
- Process icons (Innovation, Collaboration, Client Work, Results)
- Tool icons (GitHub, Jira, etc.)
- Social media icons (LinkedIn, GitHub, Discord, Twitter)
- UI icons (Chevrons, arrows, checkmarks)

### Illustrations

**"Bits" - Signature Visual Element**

The "bits" are Bitovi's distinctive visual branding element used as decoration:

**Characteristics**
- **Shape**: Circles (filled or outlined)
- **Color**: Always BitOrange (#F5532D)
- **Stroke**: 2-3px weight (lightweight)
- **Connection**: Appear along curved lines with same stroke weight
- **Line Corners**: Rounded when lines bend
- **Placement**: Intentionally arbitrary along the line

**Usage**
- Decorative elements
- Process flow connections
- Visual interest and brand identity
- Never use bits in colors other than BitOrange

**General Illustration Style**
- Clean, modern, geometric
- Brand colors (Teal, BitOrange, Gray)
- Technical/geometric aesthetic
- Usage: Hero graphics, feature illustrations

### Brand Logos

**Client Logos Display**
- Grayscale or original colors
- Grid layout
- Consistent sizing and spacing
- Often with subtle hover effects
- Examples: KFC, Levi's, Sony, Walmart, etc.

**Partner/Tool Logos**
- Full color retained
- Appropriate spacing
- Link to relevant pages

---

## Imagery

### Photography Style

**Team Photos**
- Candid, authentic moments
- Warm, natural lighting
- Collaborative settings (meetings, whiteboarding, etc.)
- Professional but approachable

**Environmental Shots**
- Bright, airy spaces
- Creative work environments
- Often feature post-it notes, design work in progress

### Image Treatment

**Aspect Ratios**
- Hero images: 16:9 or wider
- Card images: 4:3 or 16:9
- Profile images: 1:1 (circular or square)

**Image Overlays**
- Semi-transparent overlays for text readability
- Gradient overlays (dark to transparent)
- Teal or orange color overlays for brand consistency

### Screenshots & Case Studies

**Product Screenshots**
- Full browser frame or cropped to content
- Often displayed at an angle or with shadow
- May include device frames (mobile, tablet)
- Usage: Portfolio work, case studies

---

## Navigation

### Header Navigation

**Structure**
- Logo on left (Bitovi wordmark)
- Primary navigation links center-right
- "Contact" CTA button on far right (Teal)
- Background: White with subtle shadow or border on scroll

**Navigation Links**
- Services, Our work, Community, About
- Hover state: Color change to orange or underline
- Mobile: Hamburger menu

### Footer Navigation

**Structure**
- Dark green/teal background
- Multi-column layout
- Logo and contact info on left
- Link columns: Services, Our Work, Community, About, Legal
- Social media icons
- Copyright notice at bottom

**Footer Sections**
- Contact information (phone, email)
- Social media links (LinkedIn, GitHub, Discord, Twitter)
- Site navigation grouped by category
- Legal links (Privacy Policy)

### Breadcrumbs & In-page Navigation
- Subtle, minimal styling
- Often omitted in favor of clear hierarchy
- CTA links with arrows guide users to next actions

---

## Patterns & Best Practices

### Content Sections

**Hero Section**
- Full-width banner
- Large heading + subheading/description
- Hero image or illustration on right
- Primary CTA button
- Generous padding (64-96px vertical)

**Alternating Content Layout**
- Image/content alternates left/right
- Creates visual rhythm
- Maintains vertical alignment
- Usage: Feature descriptions, services

**Grid Layouts**
- 3-column on desktop (services, case studies, tools)
- 2-column on tablet
- 1-column on mobile
- Equal height cards preferred

**Social Proof Section**
- Brand logos in grid
- Testimonials with photos
- Case study links with preview images
- Example: "Some of the brands we have worked with"

### Accessibility Considerations

**Color Contrast**
- Ensure text meets WCAG AA standards (4.5:1 for body, 3:1 for large text)
- Follow Bitovi's typography color rules:
  - White text on teal backgrounds
  - Dark teal (#00464A) or dark gray (#334041) on white backgrounds
- Test color combinations for sufficient contrast

**Interactive Elements**
- Sufficient click/tap targets (minimum 44x44px)
- Clear focus states for keyboard navigation
- Semantic HTML structure

**Alt Text**
- All images include descriptive alt text
- Decorative images use empty alt attributes

---

## Animation & Interaction

### Micro-interactions
- Hover states on buttons (subtle color shift)
- Link hover effects (color change, underline)
- Card hover effects (slight elevation/shadow increase)

### Transitions
- Smooth, subtle transitions (~200-300ms)
- Ease-in-out timing function
- Applied to: color, transform, opacity

### Loading States
- Consider skeleton screens or spinners
- Maintain layout to prevent content shift

---

## Responsive Design

### Mobile-First Approach
- Start with mobile layout, enhance for larger screens
- Touch-friendly interactions (larger tap targets)
- Simplified navigation (hamburger menu)

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Large Desktop: 1440px+

### Responsive Patterns
- Stack columns on mobile
- Reduce spacing on smaller screens
- Enlarge touch targets for mobile
- Simplify or hide decorative elements on mobile
- Full-width images on mobile

---

## Voice & Tone

### Messaging Characteristics
- **Professional yet approachable**: Expert without being distant
- **Action-oriented**: "Perfecting software delivery", "delivering great results"
- **Community-focused**: Emphasis on open source, collaboration, sharing
- **Results-driven**: Concrete outcomes and impact measurements

### Common Phrases
- "Perfecting software delivery"
- "Impactful results"
- "Innovation drives us"
- "We don't gatekeep"
- "Ready to start perfecting your software?"

---

## Component Examples

### Contact Form
```
Contact Us
----------
First name*      [                    ]
Last name        [                    ]
Company name*    [                    ]
Work Email*      [                    ]
Phone number     [                    ]
What do you have in mind?
                 [                    ]
                 [                    ]
                 
                 [  Submit  ] (Teal button)
```

### Process Flow
```
[Innovation] ←curved line→ [Collaboration] ←curved line→ [Client Work] ←curved line→ [Impactful Results]
   (icon)                      (icon)                         (icon)                      (icon)
with circular highlight rings and alternating orange/gray connecting lines
```

### Card Grid (Services/Features)
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    Icon     │  │    Icon     │  │    Icon     │
│    Title    │  │    Title    │  │    Title    │
│ Description │  │ Description │  │ Description │
│  Learn more→│  │  Learn more→│  │  Learn more→│
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## Key Takeaways for Developers

1. **Use Bitovi Orange and Teal as primary brand colors** for CTAs and accents
2. **Maintain generous whitespace** - sections should breathe
3. **Curved line motifs** are a signature visual element - use SVG for crisp rendering
4. **Card-based layouts** are preferred for content organization
5. **Mobile-first responsive design** with clear breakpoints
6. **Process visualizations** use circular arrangements with connecting lines
7. **Forms are clean and minimal** with clear validation
8. **Typography is bold and clear** with strong hierarchy
9. **Images are authentic and collaborative**, not stock-photo-feeling
10. **Accessibility is important** - ensure proper contrast and semantic HTML

---

## Resources

### Referenced Pages
- [About Us](https://www.bitovi.com/about-us) - Screenshots in `context/bitovi/www.bitovi.com_about-us.png`
- [Figma Partnership](https://www.bitovi.com/partnerships/figma) - Screenshots in `context/bitovi/www.bitovi.com_partnerships_figma.png`

### Design Assets Location
- Screenshots: `/context/bitovi/`
- Additional assets should be stored in: `/context/bitovi/assets/`

---

*This style guide is a living document and should be updated as the design system evolves.*
