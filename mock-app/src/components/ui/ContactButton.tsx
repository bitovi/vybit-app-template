export interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function ContactButton({ 
  onClick, 
  className = '', 
  children = 'Contact Us' 
}: ContactButtonProps) {
  return (
    <button 
      className={`contact-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
