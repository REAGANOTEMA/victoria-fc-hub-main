import { MapPin, Calendar, Users, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const timeline = [
  { year: "2023", title: "Club Founded", desc: "Victoria Football Club Orom was established by the passionate youth group known as Pekoyo Searching for Club." },
  { year: "2023", title: "First Competitions", desc: "Participated in the Orom Peace Cup organized by St. Steven Church of Uganda, marking our first official tournament." },
  { year: "2024", title: "Growing Squad", desc: "Expanded the squad with dedicated players from Orom and surrounding areas, building a competitive team culture." },
  { year: "2024", title: "FUFA Registration", desc: "Began the process of registering with FUFA for Kitgum Division Regional Qualifiers." },
  { year: "2025", title: "Youth Tournament", desc: "Competing in the Orom Youth Tournament 2025/2026 against Good Shepherd FC, UPDF FC, and Rock City." },
];

const competitions = [
  { name: "Orom Peace Cup", org: "St. Steven Church of Uganda", icon: "🕊️", status: "Participated" },
  { name: "Orom Youth Tournament Cup", org: "Local Youth Council", icon: "🏆", status: "Active" },
  { name: "FUFA Kitgum Division Qualifiers", org: "FUFA Regional", icon: "⚽", status: "Participated" },
  { name: "Bishop's Cup Qualifier", org: "Kitgum Diocese", icon: "🎖️", status: "Participated" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Our Story</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">About Us</h1>
          <div className="gold-line" />
          <p className="text-primary-foreground/80 text-lg max-w-2xl mt-6">
            Born from passion, built on community. Victoria Football Club Orom – where every talent gets a chance.
          </p>
        </div>
      </section>

      {/* Club Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-sm uppercase tracking-widest mb-2">Founded 2023</p>
              <h2 className="section-heading mb-4">The Victoria FC Story</h2>
              <div className="gold-line mb-6" />
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Victoria Football Club Orom was founded in <strong className="text-primary">2023</strong> by a passionate youth group known as <strong className="text-primary">Pekoyo Searching for Club</strong>. With the unwavering belief that <em>"Any chance of life for successful talent is possible with teamwork and leaving no one behind"</em>, the club was officially formed.
                </p>
                <p>
                  Born in the heart of Orom Town Council, Kitgum District, Northern Uganda, Victoria FC has become a symbol of hope, unity, and sporting excellence. We develop not just footballers, but disciplined, community-driven individuals who carry the spirit of Orom wherever they go.
                </p>
                <p>
                  Today, Victoria FC competes at the regional level, nurturing talent from youth academies through to competitive football, with ambitions to grow into a nationally recognized football institution.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">Est. 2023</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">Orom, Uganda</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Users className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">25+ Players</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-club flex items-center justify-center p-8 shadow-2xl">
                <div className="text-center text-primary-foreground">
                  <Target className="w-24 h-24 text-gold mx-auto mb-4" />
                  <p className="font-heading text-2xl font-bold uppercase">Our Mission</p>
                  <div className="gold-line mx-auto my-3" />
                  <p className="text-primary-foreground/80 italic text-lg leading-relaxed">
                    "Leaving No One Behind"
                  </p>
                  <p className="text-primary-foreground/60 text-sm mt-3">
                    Developing talent and building community through the beautiful game
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold text-sm uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="section-heading">Club Timeline</h2>
            <div className="gold-line mx-auto mt-3" />
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm flex-shrink-0 shadow-lg">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-gold/30 mt-2" />
                  )}
                </div>
                <div className="card-club p-5 flex-1 mb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold font-heading font-bold">{item.year}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-heading text-lg font-bold text-primary">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold text-sm uppercase tracking-widest mb-2">Tournament History</p>
            <h2 className="section-heading">Competitions Participated</h2>
            <div className="gold-line mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitions.map((c) => (
              <div key={c.name} className="card-club p-6 text-center group">
                <div className="text-5xl mb-4">{c.icon}</div>
                <div className="inline-flex px-2 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-3">
                  {c.status}
                </div>
                <h3 className="font-heading text-lg font-bold text-primary mb-2">{c.name}</h3>
                <p className="text-muted-foreground text-xs">{c.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold text-sm uppercase tracking-widest mb-2">Find Us</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">Our Location</h2>
            <div className="gold-line mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-foreground/10">
                <MapPin className="w-6 h-6 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-primary-foreground">Laditooywee Cell, Lolia Ward</p>
                  <p className="text-primary-foreground/70 text-sm">Orom Town Council</p>
                  <p className="text-primary-foreground/70 text-sm">Kitgum District, Northern Uganda</p>
                  <p className="text-gold text-xs mt-1">80 meters from St. Steven Church, Alikok Road (Kidepo–Gulu Road)</p>
                </div>
              </div>
              <Button className="btn-gold px-8 py-3 rounded-xl font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-primary-foreground/10 flex items-center justify-center border border-primary-foreground/20">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-gold mx-auto mb-3" />
                <p className="text-primary-foreground/80">Map integration available</p>
                <p className="text-gold text-sm mt-1">Orom Town Council, Kitgum District</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
