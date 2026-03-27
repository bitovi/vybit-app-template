import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomBrand: Story = {
  args: { brand: 'Acme Corp' },
};

export const CustomItems: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Settings', to: '/settings' },
    ],
  },
};
