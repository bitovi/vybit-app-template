import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "./Button";

const meta = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    open: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Confirm Action",
    children: "Are you sure you want to proceed?",
  },
};

export const Small: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Small Modal",
    size: "sm",
    children: "Compact content.",
  },
};

export const Large: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Large Modal",
    size: "lg",
    children: "More room for content here.",
  },
};

export const ExtraLarge: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Extra Large Modal",
    size: "xl",
    children: "Maximum width content area.",
  },
};

export const Interactive: Story = {
  args: { open: false, onClose: () => {}, children: "" },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Interactive Example"
        >
          <p className="text-slate-600">
            Click the backdrop or press Escape to close.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  },
};
