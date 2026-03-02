import { HeroSection } from "@/components/HeroSection";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, MapPin, Users, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const test = async () => {
  const querySnapshot = await getDocs(collection(db, "test"));
  console.log(querySnapshot.docs.map(doc => doc.data()));
};

test();
interface NewsItem {
  id: string;
  title: string;
  image_url: string | null;
  category: string;
  author: string;
  created_at: string;
}

const competitions = [
  { name: "Orom Peace Cup", org: "St. Steven Church of Uganda", icon: "🕊️" },
  { name: "Orom Youth Tournament Cup", org: "Local Youth Council", icon: "🏆" },
  { name: "FUFA Kitgum Division Qualifiers", org: "FUFA Regional", icon: "⚽" },
  { name: "Bishop's Cup Qualifier", org: "Kitgum Diocese", icon: "🎖️" },
];

const values = [
  { icon: Star, title: "Excellence", desc: "We strive for the highest standards on and off the pitch." },
  { icon: Users, title: "Community", desc: "Football as a force for unity in Orom and beyond." },
  { icon: Trophy, title: "Development", desc: "Nurturing talent from grassroots to professional level." },
  { icon: MapPin, title: "Heritage", desc: "Proudly representing Northern Uganda on the national stage." },
];

export default function Index() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    supabase
      .from("news")
      .select("id, title, image_url, category, author, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data) setLatestNews(data); });
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Club Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Our Foundation</p>
            <h2 className="section-heading">Club Values</h2>
            <div className="gold-line mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-club p-6 text-center group">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Fixtures Teaser */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-gold text-sm uppercase tracking-widest mb-2">Orom Youth Tournament 2025/2026</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">Latest Results</h2>
              <div className="gold-line mt-3" />
            </div>
            <Link to="/fixtures">
              <Button className="btn-gold px-8 py-3 rounded-xl font-bold uppercase tracking-wider">
                Full Fixtures <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { home: "Victoria FC", away: "Rock City", hs: 4, as: 0, date: "2025" },
              { home: "UPDF FC", away: "Victoria FC", hs: 1, as: 1, date: "2025" },
              { home: "Victoria FC", away: "Good Shepherd FC", hs: 1, as: 7, date: "2025" },
            ].map((m, i) => (
              <div key={i} className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 hover:border-gold/50 transition-all duration-300">
                <p className="text-gold text-xs text-center mb-3 uppercase tracking-wider">Group A</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 text-right">
                    <p className="font-heading font-bold text-sm text-primary-foreground">{m.home}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gold/20">
                    <span className="font-heading text-2xl font-bold text-gold">{m.hs}</span>
                    <span className="text-primary-foreground/50">–</span>
                    <span className="font-heading text-2xl font-bold text-gold">{m.as}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-sm text-primary-foreground">{m.away}</p>
                  </div>
                </div>
                <p className="text-center text-primary-foreground/50 text-xs mt-3">{m.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="section-heading">Competitions</h2>
            <div className="gold-line mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitions.map((c) => (
              <div key={c.name} className="card-club p-6 text-center">
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="font-heading text-lg font-bold text-primary mb-1">{c.name}</h3>
                <p className="text-muted-foreground text-xs">{c.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      {latestNews.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-gold text-sm uppercase tracking-widest mb-1">Stay Updated</p>
                <h2 className="section-heading">Latest News</h2>
                <div className="gold-line mt-2" />
              </div>
              <Link to="/news" className="text-primary hover:text-gold transition-colors text-sm font-semibold flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((item) => (
                <Link to={`/news/${item.id}`} key={item.id} className="card-club group overflow-hidden">
                  {item.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">{item.category}</span>
                    <h3 className="font-heading text-lg font-bold text-primary mt-1 mb-2 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString()}
                      <span>•</span>
                      <span>{item.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA - Join Academy */}
      <section className="py-20 bg-gradient-club text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gold blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-4">
            Join Our Academy
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            We believe that any chance of life for successful talent is possible with teamwork. Apply now and leave no one behind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/academy">
              <Button size="lg" className="btn-gold px-10 py-4 rounded-xl text-base font-bold uppercase tracking-wider">
                Apply Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-4 rounded-xl text-base font-bold uppercase tracking-wider"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
