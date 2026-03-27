import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Design System</h1>
        <p className="text-slate-600">A showcase of available UI components.</p>
      </div>

      {/* Buttons */}
      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Badge</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </section>

      {/* Input */}
      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Input</h2>
        <div className="space-y-4 max-w-sm">
          <Input
            label="Default"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input label="With helper text" placeholder="you@example.com" helperText="We'll never share your email." />
          <Input label="With error" value="bad input" error="This field is invalid" readOnly />
          <Input label="Disabled" value="Cannot edit" disabled />
        </div>
      </section>

      {/* Textarea */}
      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Textarea</h2>
        <div className="space-y-4 max-w-sm">
          <Textarea
            label="Default"
            placeholder="Enter text..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <Textarea label="With helper text" helperText="Max 500 characters." />
          <Textarea label="With error" value="bad input" error="This field is required" readOnly />
          <Textarea label="Disabled" value="Cannot edit" disabled />
        </div>
      </section>
    </div>
  );
}
