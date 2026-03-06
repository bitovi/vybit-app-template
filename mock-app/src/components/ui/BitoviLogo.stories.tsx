import type { Meta, StoryObj } from '@storybook/react';
import { BitoviLogo } from './BitoviLogo';

const meta: Meta<typeof BitoviLogo> = {
  title: 'UI/BitoviLogo',
  component: BitoviLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RedOrange: Story = {
  args: {
    variant: 'red-orange',
    className: 'h-12',
  },
};

export const DarkGreen: Story = {
  args: {
    variant: 'dark-green',
    className: 'h-12',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
    className: 'h-12',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Small: Story = {
  args: {
    variant: 'red-orange',
    className: 'h-6',
  },
};

export const Large: Story = {
  args: {
    variant: 'red-orange',
    className: 'h-16',
  },
};
