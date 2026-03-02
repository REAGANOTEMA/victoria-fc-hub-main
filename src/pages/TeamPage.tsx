import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Shield, Hash } from "lucide-react";

interface Player {
  id: string;
  name: string;
  position: string;
  jersey_number: number | null;
  age: number | null;
  bio: string | null;
  photo_url: string | null;
}

const positionColors: Record<string, string> = {
  Goalkeeper: "bg-gold/20 text-gold-dark border-gold/40",
  Defender: "bg-primary/20 text-primary border-primary/40",
  Midfielder: "bg-green-100 text-green-700 border-green-300",
  Forward: "bg-red-100 text-red-600 border-red-300",
};

export default function TeamPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const positions = ["All", "Goalkeeper", "Defender", "Midfielder", "Forward"];

  useEffect(() => {
    supabase
      .from("players")
      .select("*")
      .eq("is_active", true)
      .order("jersey_number")
      .then(({ data }) => {
        if (data) setPlayers(data);
        setLoading(false);
      });
  }, []);

  const filtered = filter === "All" ? players : players.filter((p) => p.position === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Meet The Players</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">Our Squad</h1>
          <div className="gold-line" />
        </div>
      </section>

      {/* Filter */}
      <section className="bg-background py-8 border-b border-border sticky top-20 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setFilter(pos)}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 border ${
                  filter === pos
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="font-heading text-2xl text-muted-foreground">No players found</p>
              <p className="text-muted-foreground text-sm mt-2">Check back soon as the squad is updated.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filtered.map((player) => (
                <div key={player.id} className="player-card aspect-[3/4] group cursor-pointer">
                  {/* Photo or placeholder */}
                  {player.photo_url ? (
                    <img
                      src={player.photo_url}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-club">
                      <User className="w-20 h-20 text-primary-foreground/30" />
                    </div>
                  )}

                  {/* Jersey Number */}
                  {player.jersey_number && (
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gold flex items-center justify-center shadow-lg">
                      <span className="font-heading font-bold text-primary text-sm">{player.jersey_number}</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="player-overlay opacity-0 group-hover:opacity-100">
                    <span className={`status-badge text-xs border mb-2 ${positionColors[player.position] || "bg-muted text-muted-foreground"}`}>
                      {player.position}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-primary-foreground">{player.name}</h3>
                    {player.age && (
                      <p className="text-primary-foreground/70 text-xs">Age: {player.age}</p>
                    )}
                    {player.bio && (
                      <p className="text-primary-foreground/60 text-xs mt-1 line-clamp-2">{player.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Team Stats Banner */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: User, label: "Total Players", value: players.length.toString() || "25+" },
              { icon: Shield, label: "Defenders", value: players.filter(p => p.position === "Defender").length.toString() },
              { icon: Hash, label: "Midfielders", value: players.filter(p => p.position === "Midfielder").length.toString() },
              { icon: User, label: "Forwards", value: players.filter(p => p.position === "Forward").length.toString() },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="font-heading text-4xl font-bold text-gold">{value}</div>
                <div className="text-primary-foreground/70 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
