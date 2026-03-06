import { useState } from 'react';
import { BitoviHeader, HeroSection, ServicesList, PartnersList, ClientsList, CalendarBooking } from '../components/ui';

const accordionItems = [
  { id: 1, isHeader: true, hasHeroContent: true },
  { id: 2, title: "The hard problems we are solving:", hasServicesList: true },
  { id: 3, title: "Our hard problem partners:", hasPartnersList: true },
  { id: 4, title: "We've solved hard problems for:", hasClientsList: true },
  { id: 5, title: "Tell us about the problem you need solving:", hasCalendarBooking: true },
];

export default function AccordionPage() {
  const [expandedId, setExpandedId] = useState<number>(1);

  const handleToggle = (id: number) => {
    setExpandedId(id);
  };

  return (
    <div className="accordion-container">
      {accordionItems.map((item) => {
        const isExpanded = expandedId === item.id;
        
        return (
          <div
            key={item.id}
            className={`accordion-item ${isExpanded ? 'expanded' : 'collapsed'}`}
          >
            {item.isHeader ? (
              <div 
                className="accordion-header-wrapper"
                onClick={() => handleToggle(item.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(item.id);
                  }
                }}
              >
                <BitoviHeader />
              </div>
            ) : (
              <button
                className="accordion-header"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isExpanded}
              >
                <div className="accordion-header-content">
                  {item.title}
                </div>
              </button>
            )}
            {item.hasHeroContent && (
              <div 
                className="accordion-content"
                aria-hidden={!isExpanded}
              >
                <HeroSection />
              </div>
            )}
            {item.hasServicesList && (
              <div 
                className="accordion-content"
                aria-hidden={!isExpanded}
              >
                <ServicesList />
              </div>
            )}
            {item.hasPartnersList && (
              <div 
                className="accordion-content"
                aria-hidden={!isExpanded}
              >
                <PartnersList />
              </div>
            )}
            {item.hasClientsList && (
              <div 
                className="accordion-content"
                aria-hidden={!isExpanded}
              >
                <ClientsList />
              </div>
            )}
            {item.hasCalendarBooking && (
              <div 
                className="accordion-content"
                aria-hidden={!isExpanded}
              >
                <CalendarBooking />
              </div>
            )}
            {item.content && (
              <div 
                className="accordion-content"
                aria-hidden={!isExpanded}
              >
                <div className="content-text">{item.content}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
