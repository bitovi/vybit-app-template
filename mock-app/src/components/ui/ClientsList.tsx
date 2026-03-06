export interface Client {
  name: string;
  logo: string; // URL or path to logo image
}

const clients: Client[] = [
  {
    name: 'Apple',
    logo: '/logos/apple.svg'
  },
  {
    name: 'Yum!',
    logo: '/logos/yum.svg'
  },
  {
    name: 'Christie\'s',
    logo: '/logos/christies.svg'
  },
  {
    name: 'Lowe\'s',
    logo: '/logos/lowes.svg'
  },
  {
    name: 'Walmart',
    logo: '/logos/walmart.svg'
  },
  {
    name: 'Coinbase',
    logo: '/logos/coinbase.svg'
  },
  {
    name: 'Moody\'s',
    logo: '/logos/moodys.svg'
  },
  {
    name: 'More',
    logo: '/logos/more.svg'
  }
];

export interface ClientsListProps {
  className?: string;
}

export function ClientsList({ className = '' }: ClientsListProps) {
  return (
    <div className={`clients-list ${className}`}>
      {clients.map((client, index) => (
        <div key={index} className="client-item">
          <div className="client-logo-wrapper">
            <img 
              src={client.logo} 
              alt={`${client.name} logo`}
              className="client-logo"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.client-logo-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'client-logo-fallback';
                  fallback.textContent = client.name.charAt(0);
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <span className="client-name">{client.name}</span>
        </div>
      ))}
    </div>
  );
}
