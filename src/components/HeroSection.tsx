import heroStadium from "@/assets/hero-stadium.jpg";
import clubLogo from "@/assets/club-logo.png";
import { Link } from "react-router-dom";
import { ChevronDown, Trophy, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Founded", value: "2023", icon: Trophy },
  { label: "Squad Size", value: "25+", icon: Users },
  { label: "Competitions", value: "4+", icon: Calendar },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 hero-parallax"
        style={{ backgroundImage: `url(${heroStadium})` }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5 bg-gold blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 bg-primary blur-3xl animate-pulse delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6 opacity-0 animate-fade-in-up">
          <img
            src={clubLogo}
            alt="Victoria FC Orom"
            className="h-28 w-28 md:h-36 md:w-36 object-contain drop-shadow-2xl animate-pulse-gold"
          />
        </div>

        {/* Club Name */}
        <div className="opacity-0 animate-fade-in-up delay-100">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-wide text-primary-foreground drop-shadow-lg">
            Victoria
          </h1>
          <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-widest text-gold drop-shadow-md">
            Football Club Orom
          </h2>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-6 opacity-0 animate-fade-in-up delay-200">
          <div className="h-px w-16 bg-gold/60" />
          <p className="font-heading text-sm md:text-base tracking-[0.3em] uppercase text-gold/90 italic">
            "Leaving No One Behind"
          </p>
          <div className="h-px w-16 bg-gold/60" />
        </div>

        {/* Sub-heading */}
        <p className="text-primary-foreground/80 text-base md:text-lg mb-10 opacity-0 animate-fade-in-up delay-300 max-w-2xl mx-auto">
          Developing disciplined, competitive, and community-driven footballers across Orom, Uganda
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-400">
          <Link to="/fixtures">
            <Button
              size="lg"
              className="btn-gold px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider w-full sm:w-auto"
            >
              ⚽ View Fixtures
            </Button>
          </Link>
          <Link to="/donate">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider w-full sm:w-auto"
            >
              ❤️ Support The Club
            </Button>
          </Link>
          <Link to="/academy">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gold/60 text-gold hover:bg-gold/10 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider w-full sm:w-auto"
            >
              📝 Join Academy
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mt-16 opacity-0 animate-fade-in-up delay-500">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="w-5 h-5 text-gold mx-auto mb-1" />
              <div className="font-heading text-3xl font-bold text-gold">{value}</div>
              <div className="text-primary-foreground/60 text-xs uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-bounce">
        <ChevronDown className="w-8 h-8 text-gold/70" />
      </div>
    </section>
  );
}
