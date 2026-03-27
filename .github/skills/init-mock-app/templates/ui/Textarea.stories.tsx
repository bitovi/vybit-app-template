import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Enter text...' } };
export const WithLabel: Story = { args: { label: 'Description', placeholder: 'Describe the issue...' } };
export const WithError: Story = { args: { label: 'Notes', value: '', error: 'This field is required' } };
export const WithHelperText: Story = { args: { label: 'Bio', helperText: 'Max 500 characters' } };
export const Disabled: Story = { args: { label: 'Disabled', disabled: true, value: 'Cannot edit' } };
