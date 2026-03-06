export interface Partner {
  name: string;
  logo: string; // URL or path to logo image
}

const partners: Partner[] = [
  {
    name: 'Temporal',
    logo: '/logos/temporal.svg'
  },
  {
    name: 'N8N',
    logo: '/logos/n8n.svg'
  },
  {
    name: 'Figma',
    logo: '/logos/figma.svg'
  },
  {
    name: 'Progress',
    logo: '/logos/progress.svg'
  },
  {
    name: 'Windsurf',
    logo: '/logos/windsurf.svg'
  },
  {
    name: 'NX',
    logo: '/logos/nx.svg'
  }
];

export interface PartnersListProps {
  className?: string;
}

export function PartnersList({ className = '' }: PartnersListProps) {
  return (
    <div className={`partners-list ${className}`}>
      {partners.map((partner, index) => (
        <div key={index} className="partner-item">
          <div className="partner-logo-wrapper">
            <img 
              src={partner.logo} 
              alt={`${partner.name} logo`}
              className="partner-logo"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.partner-logo-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'partner-logo-fallback';
                  fallback.textContent = partner.name.charAt(0);
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <span className="partner-name">{partner.name}</span>
        </div>
      ))}
    </div>
  );
}
