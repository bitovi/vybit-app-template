import type { Meta, StoryObj } from '@storybook/react';
import { ServicesList } from './ServicesList';

const meta = {
  title: 'UI/ServicesList',
  component: ServicesList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const height = context.parameters.containerHeight || '600px';
      return (
        <div 
          style={{ 
            containerType: 'size',
            containerName: 'accordion-content',
            height,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            border: '2px dashed #E5E7EB',
            padding: '1rem'
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ServicesList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with plenty of vertical space (600px height).
 * Shows single column layout with comfortable spacing.
 */
export const Default: Story = {
  parameters: {
    containerHeight: '600px',
  },
};

/**
 * Medium height container (450px).
 * Still uses single column but with reduced spacing.
 */
export const MediumHeight: Story = {
  parameters: {
    containerHeight: '450px',
  },
};

/**
 * Small height container (380px).
 * Switches to 2-column layout to better use horizontal space.
 * Container query: @container accordion-content (max-height: 400px)
 */
export const SmallHeight: Story = {
  parameters: {
    containerHeight: '380px',
  },
};

/**
 * Very small height container (280px).
 * Switches to 3-column layout when width allows (≥900px).
 * Container query: @container accordion-content (max-height: 300px) and (min-width: 900px)
 */
export const VerySmallHeight: Story = {
  parameters: {
    containerHeight: '280px',
  },
};

/**
 * Extremely small height container (200px).
 * Uses 3-column layout with minimal spacing.
 */
export const ExtremelySmallHeight: Story = {
  parameters: {
    containerHeight: '200px',
  },
};

/**
 * Compare multiple heights side by side (for documentation purposes).
 * This shows how the layout adapts from single column → 2 columns → 3 columns.
 */
export const AllHeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      {[
        { label: '600px - Single Column', height: '600px' },
        { label: '450px - Single Column (Compact)', height: '450px' },
        { label: '380px - Two Columns', height: '380px' },
        { label: '280px - Three Columns', height: '280px' },
        { label: '200px - Three Columns (Minimal)', height: '200px' },
      ].map(({ label, height }) => (
        <div key={height}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
            {label}
          </h3>
          <div 
            style={{ 
              containerType: 'size',
              containerName: 'accordion-content',
              height,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              border: '2px dashed #E5E7EB',
              padding: '1rem'
            }}
          >
            <ServicesList />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [],
};
