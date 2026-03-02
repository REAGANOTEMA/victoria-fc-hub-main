import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
}

const categories = ["All", "Matches", "Training", "Community", "Tournaments"];

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
        else if (data) setGallery(data);
        setLoading(false);
      });
  }, [toast]);

  const filtered = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Moments & Memories</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">Gallery</h1>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`rounded-xl bg-muted animate-pulse ${i % 5 === 0 ? "row-span-2" : ""}`} style={{ height: i % 5 === 0 ? "400px" : "200px" }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-heading text-2xl text-muted-foreground">No photos yet</p>
              <p className="text-muted-foreground text-sm mt-2">Gallery content will be uploaded soon.</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden"
                  onClick={() => setLightbox(item)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all duration-300 rounded-xl flex items-end p-3">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-primary-foreground font-semibold text-sm">{item.title}</p>
                      <span className="text-gold text-xs">{item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gold transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.image_url}
              alt={lightbox.title}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-heading text-xl font-bold">{lightbox.title}</p>
              <span className="text-gold text-sm">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
