import { HeroSection } from "@/components/HeroSection";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, MapPin, Users, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("id, title, image_url, category, author, created_at")
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Supabase error:", error);
        }

        if (data) {
          setLatestNews(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Club Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Our Foundation
            </p>
            <h2 className="section-heading">Club Values</h2>
            <div className="gold-line mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-club p-6 text-center group">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Results */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-gold text-sm uppercase tracking-widest mb-2">
                Orom Youth Tournament 2025/2026
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
                Latest Results
              </h2>
            </div>
            <Link to="/fixtures">
              <Button className="btn-gold px-8 py-3 rounded-xl font-bold uppercase tracking-wider">
                Full Fixtures <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Our Journey
            </p>
            <h2 className="section-heading">Competitions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitions.map((c) => (
              <div key={c.name} className="card-club p-6 text-center">
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="font-heading text-lg font-bold text-primary mb-1">
                  {c.name}
                </h3>
                <p className="text-muted-foreground text-xs">{c.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      {!loading && latestNews.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between mb-10">
              <h2 className="section-heading">Latest News</h2>
              <Link to="/news" className="text-primary flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`} className="card-club p-5">
                  <h3 className="font-heading text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleDateString()}
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-club text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-4">
            Join Our Academy
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            We believe any chance for successful talent is possible with teamwork.
          </p>
          <Link to="/academy">
            <Button size="lg" className="btn-gold px-10 py-4 rounded-xl font-bold uppercase">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}