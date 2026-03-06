export interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

export interface NavigationProps {
  items?: NavItem[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'Services', hasDropdown: true },
  { label: 'Our work', hasDropdown: true },
  { label: 'Community', hasDropdown: true },
  { label: 'About', href: '#about' },
  { label: 'Careers', href: '#careers' },
];

export function Navigation({ items = defaultNavItems, className = '' }: NavigationProps) {
  return (
    <nav className={`nav-desktop ${className}`}>
      {items.map((item) => {
        const content = (
          <>
            {item.label}
            {item.hasDropdown && <span className="dropdown-icon">▾</span>}
          </>
        );

        return item.hasDropdown ? (
          <button key={item.label} className="nav-item">
            {content}
          </button>
        ) : (
          <a key={item.label} href={item.href || '#'} className="nav-item">
            {content}
          </a>
        );
      })}
    </nav>
  );
}
