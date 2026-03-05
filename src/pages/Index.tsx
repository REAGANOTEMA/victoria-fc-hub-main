import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, MapPin, Users, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import HeroImage from "@/assets/hero-stadium.jpg";
import ClubLogo from "@/assets/club-logo.png";

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
  { icon: Star, title: "Excellence", desc: "Highest standards on and off the pitch." },
  { icon: Users, title: "Community", desc: "Football unites Orom and beyond." },
  { icon: Trophy, title: "Development", desc: "Talent from grassroots to pro." },
  { icon: MapPin, title: "Heritage", desc: "Representing Northern Uganda." },
];

const Index: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    supabase
      .from("news")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => data && setLatestNews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full h-[600px]">
        <img src={HeroImage} alt="Stadium" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
          <img src={ClubLogo} alt="Club Logo" className="w-32 h-32 mb-4" />
          <h1 className="text-5xl font-bold">Victoria Football Club Orom</h1>
          <p className="text-lg mt-2">Leaving No One Behind | Northern Uganda</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">Club Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {values.map(v => (
            <div key={v.title} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <v.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl">{v.title}</h3>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitions */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-12">Competitions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {competitions.map(c => (
            <div key={c.name} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-2">{c.icon}</div>
              <h3 className="font-bold text-xl">{c.name}</h3>
              <p className="text-gray-600">{c.org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      {latestNews.length > 0 && (
        <section className="py-20 bg-white text-center">
          <h2 className="text-3xl font-bold mb-12">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {latestNews.map(n => (
              <Link key={n.id} to={`/news/${n.id}`} className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                {n.image_url && <img src={n.image_url} alt={n.title} className="w-full h-48 object-cover" />}
                <div className="p-4 text-left">
                  <span className="text-yellow-500 text-sm uppercase">{n.category}</span>
                  <h3 className="font-bold text-lg mt-1">{n.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(n.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{n.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;