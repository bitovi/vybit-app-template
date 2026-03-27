import { Link, NavLink } from 'react-router-dom';

export interface NavItem {
  label: string;
  to: string;
}

export interface NavigationProps {
  brand?: string;
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
];

export function Navigation({ brand = 'My App', items = defaultItems }: NavigationProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-lg font-semibold text-slate-800 mr-4">
          {brand}
        </Link>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive
                ? 'text-sm font-medium text-blue-600'
                : 'text-sm font-medium text-slate-600 hover:text-slate-900'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
