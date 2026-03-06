import { 
  Network, 
  Target, 
  GitBranch, 
  Sparkles, 
  Bot, 
  Palette,
  MoreHorizontal
} from 'lucide-react';

export interface Service {
  title: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: 'Program management at scale',
    icon: <Network className="service-icon" />
  },
  {
    title: 'Finding product / market value',
    icon: <Target className="service-icon" />
  },
  {
    title: 'Workflow orchestration',
    icon: <GitBranch className="service-icon" />
  },
  {
    title: 'AI enablement',
    icon: <Sparkles className="service-icon" />
  },
  {
    title: 'AI products',
    icon: <Bot className="service-icon" />
  },
  {
    title: 'Design systems',
    icon: <Palette className="service-icon" />
  },
  {
    title: 'More',
    icon: <MoreHorizontal className="service-icon" />
  }
];

export interface ServicesListProps {
  className?: string;
}

export function ServicesList({ className = '' }: ServicesListProps) {
  return (
    <div className={`services-list ${className}`}>
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <div className="service-icon-wrapper">
            {service.icon}
          </div>
          <span className="service-title">{service.title}</span>
        </div>
      ))}
    </div>
  );
}
