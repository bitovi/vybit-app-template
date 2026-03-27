import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Default' } };
export const Success: Story = { args: { variant: 'success', children: 'Active' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Pending' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Error' } };
export const Info: Story = { args: { variant: 'info', children: 'New' } };
export const Small: Story = { args: { size: 'sm', children: 'Tiny' } };
export const Large: Story = { args: { size: 'lg', children: 'Large' } };
