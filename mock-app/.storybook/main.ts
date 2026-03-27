import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@bitovi/vybit/storybook-addon',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
