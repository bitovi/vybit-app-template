import { useState } from 'react';
import { BitoviHeader, HeroSection } from '../components/ui';

const accordionItems = [
  { id: 1, isHeader: true, hasHeroContent: true },
  { id: 2, title: "The hard problems we're working on now", content: "" },
  { id: 3, title: "Our problem-solving partners", content: "" },
  { id: 4, title: "We've solved hard problems for", content: "" },
  { id: 5, title: "Tell us about the problem you need solving", content: "" },
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
                {item.title}
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
