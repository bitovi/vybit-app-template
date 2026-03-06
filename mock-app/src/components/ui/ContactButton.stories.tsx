import type { Meta, StoryObj } from '@storybook/react';
import { ContactButton } from './ContactButton';
import { fn } from '@storybook/test';

const meta: Meta<typeof ContactButton> = {
  title: 'UI/ContactButton',
  component: ContactButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    children: 'Get Started',
  },
};
