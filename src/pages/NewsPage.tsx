import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, User, ExternalLink, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsItem {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  video_url: string | null;
  youtube_url: string | null;
  author: string;
  category: string;
  created_at: string;
}

const categories = ["All", "Match Reports", "Announcements", "Transfers", "Community"];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const { toast } = useToast();

  useEffect(() => {
    supabase
      .from("news")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        } else if (data) {
          setNews(data);
        }
        setLoading(false);
      });
  }, [toast]);

  const filtered = filter === "All" ? news : news.filter((n) => n.category === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Stay Informed</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">News & Media</h1>
          <div className="gold-line" />
        </div>
      </section>

      {/* Filter */}
      <section className="bg-background py-6 border-b border-border sticky top-20 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 border ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-heading text-2xl text-muted-foreground">No articles found</p>
              <p className="text-muted-foreground text-sm mt-2">Check back soon for the latest news from Victoria FC.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Link to={`/news/${item.id}`} key={item.id} className="card-club group overflow-hidden">
                  {item.image_url && (
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.youtube_url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Youtube className="w-12 h-12 text-red-500" />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-gold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/10">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{item.body}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {item.author}
                      </div>
                      <ExternalLink className="w-3 h-3 ml-auto text-primary group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
