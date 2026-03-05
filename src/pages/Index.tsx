import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, MapPin, Users, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client"; // Make sure supabase is correctly set
import HeroImage from "@/assets/hero-stadium.jpg"; // Replace with your hero image
import ClubLogo from "@/assets/club-logo.png";

// -----------------------------
// Types
// -----------------------------
interface NewsItem {
  id: string;
  title: string;
  image_url: string | null;
  category: string;
  author: string;
  created_at: string;
}

// -----------------------------
// Constants
// -----------------------------
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

// -----------------------------
// Main Component
// -----------------------------
const Index: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Fetch latest news from Supabase
    supabase
      .from("news")
      .select("id, title, image_url, category, author, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setLatestNews(data);
      })
      .catch(err => console.error("Supabase fetch error:", err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[600px]">
        <img src={HeroImage} alt="Hero Stadium" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <img src={ClubLogo} alt="Victoria FC Logo" className="w-32 h-32 mb-4 mx-auto" />
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-2">Victoria Football Club Orom</h1>
          <p className="text-lg md:text-2xl">Leaving No One Behind | Northern Uganda</p>
        </div>
      </section>

      {/* Club Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Club Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Fixtures */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Latest Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { home: "Victoria FC", away: "Rock City", hs: 4, as: 0, date: "2025" },
              { home: "UPDF FC", away: "Victoria FC", hs: 1, as: 1, date: "2025" },
              { home: "Victoria FC", away: "Good Shepherd FC", hs: 1, as: 7, date: "2025" },
            ].map((m, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-xl">
                <p className="text-sm mb-3 uppercase">Group A</p>
                <div className="flex items-center justify-between">
                  <span>{m.home}</span>
                  <span className="px-3 py-1 bg-yellow-500 rounded text-black font-bold">
                    {m.hs} – {m.as}
                  </span>
                  <span>{m.away}</span>
                </div>
                <p className="text-sm mt-2">{m.date}</p>
              </div>
            ))}
          </div>
          <Link to="/fixtures">
            <Button className="mt-8 bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto">
              Full Fixtures <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Competitions */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Competitions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitions.map(c => (
              <div key={c.name} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-2">{c.icon}</div>
                <h3 className="font-bold text-xl">{c.name}</h3>
                <p className="text-gray-600 text-sm">{c.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map(item => (
                <Link key={item.id} to={`/news/${item.id}`} className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                  {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />}
                  <div className="p-4 text-left">
                    <span className="text-yellow-500 text-sm uppercase">{item.category}</span>
                    <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{item.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/news" className="mt-8 inline-block text-blue-900 font-bold">
              View All News <ArrowRight className="w-4 h-4 inline" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;