import { BitoviLogo } from './BitoviLogo';
import { Navigation, type NavItem } from './Navigation';
import { ContactButton } from './ContactButton';

export interface BitoviHeaderProps {
  navItems?: NavItem[];
  onContactClick?: () => void;
  className?: string;
}

export function BitoviHeader({ 
  navItems, 
  onContactClick,
  className = '' 
}: BitoviHeaderProps) {
  return (
    <header className={`bitovi-header ${className}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <BitoviLogo className="bitovi-logo" variant="red-orange" />
        </div>

        {/* Desktop Navigation */}
        <Navigation items={navItems} />

        {/* Contact Button */}
        <ContactButton onClick={onContactClick} />

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
