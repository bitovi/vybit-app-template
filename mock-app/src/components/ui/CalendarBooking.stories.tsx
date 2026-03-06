import type { Meta, StoryObj } from '@storybook/react';
import { CalendarBooking } from './CalendarBooking';

const meta = {
  title: 'UI/CalendarBooking',
  component: CalendarBooking,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const height = context.parameters.containerHeight || '700px';
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
            padding: '2rem'
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof CalendarBooking>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default calendar booking view with plenty of space.
 */
export const Default: Story = {
  parameters: {
    containerHeight: '700px',
  },
};

/**
 * Medium height view.
 */
export const MediumHeight: Story = {
  parameters: {
    containerHeight: '550px',
  },
};

/**
 * Small height view - shows how the form adapts to constrained vertical space.
 */
export const SmallHeight: Story = {
  parameters: {
    containerHeight: '450px',
  },
};

/**
 * Mobile view - single column layout.
 */
export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div 
        style={{ 
          width: '390px',
          height: '844px',
          margin: '0 auto',
          background: '#FFFFFF',
          padding: '1rem'
        }}
      >
        <Story />
      </div>
    ),
  ],
};
