import type { Meta, StoryObj } from '@storybook/react';
import { BitoviHeader } from './BitoviHeader';
import { fn } from '@storybook/test';

const meta: Meta<typeof BitoviHeader> = {
  title: 'UI/BitoviHeader',
  component: BitoviHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onContactClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomNavigation: Story = {
  args: {
    navItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Products', hasDropdown: true },
      { label: 'Contact', href: '/contact' },
    ],
  },
};
