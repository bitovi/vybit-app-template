export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HeroSection({ 
  title = "Better, faster, together",
  subtitle = "The world's best digital consultancy for hard problems.",
  className = '' 
}: HeroSectionProps) {
  return (
    <section className={`hero-section ${className}`}>
      {/* Decorative accent element */}
      <div className="hero-accent" aria-hidden="true"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
