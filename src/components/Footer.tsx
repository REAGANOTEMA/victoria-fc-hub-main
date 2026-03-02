import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import clubLogo from "@/assets/club-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={clubLogo} alt="Victoria FC Orom" className="h-14 w-14 object-contain" />
              <div>
                <div className="font-heading text-xl font-bold uppercase">Victoria FC</div>
                <div className="text-xs text-gold uppercase tracking-widest">Orom, Uganda</div>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Developing disciplined, competitive, and community-driven footballers across Orom since 2023.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/10 border border-gold/30">
              <span className="text-gold text-xs font-semibold italic">
                "Leaving No One Behind"
              </span>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-4">
              Quick Links
              <div className="gold-line mt-2" />
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Our Team", to: "/team" },
                { label: "Fixtures & Results", to: "/fixtures" },
                { label: "Academy", to: "/academy" },
                { label: "Gallery", to: "/gallery" },
                { label: "News", to: "/news" },
                { label: "Donate", to: "/donate" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-primary-foreground/70 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-4">
              Contact Us
              <div className="gold-line mt-2" />
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Laditooywee Cell, Lolia Ward<br />
                  Orom Town Council<br />
                  Kitgum District, Northern Uganda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <div className="text-primary-foreground/70 text-sm">
                  <div>MTN: 0770828224</div>
                  <div>Airtel: 0745000648</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:victoriafootballafair@gmail.com"
                  className="text-primary-foreground/70 hover:text-gold text-sm transition-colors break-all"
                >
                  victoriafootballafair@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social Media */}
          <div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-4">
              Follow Us
              <div className="gold-line mt-2" />
            </h4>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Stay updated with the latest news, match results, and club events.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Twitter, label: "Twitter", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-primary flex items-center justify-center text-primary-foreground/70 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-lg bg-primary-foreground/5 border border-gold/20">
              <p className="text-xs text-primary-foreground/50 mb-1">WhatsApp</p>
              <a
                href="https://wa.me/256761720262"
                className="text-gold text-sm font-medium hover:underline"
              >
                +256 761 720 262
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Victoria Football Club Orom. All rights reserved.
          </p>
          <p className="text-xs">
            <span className="text-primary-foreground/40">Designed & Developed by </span>
            <span className="text-gold font-semibold">Reagan Otema</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
