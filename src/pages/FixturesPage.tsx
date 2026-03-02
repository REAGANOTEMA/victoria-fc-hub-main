import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Trophy, Clock } from "lucide-react";

interface Fixture {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  match_date: string | null;
  venue: string | null;
  competition: string;
  status: string;
  match_report: string | null;
}

const localFixtures: Fixture[] = [
  { id: "1", home_team: "Victoria FC", away_team: "Rock City", home_score: 4, away_score: 0, match_date: "2025-06-01", venue: "Orom Ground", competition: "Orom Youth Tournament 2025/2026", status: "published", match_report: null },
  { id: "2", home_team: "UPDF FC", away_team: "Victoria FC", home_score: 1, away_score: 1, match_date: "2025-06-08", venue: "Orom Ground", competition: "Orom Youth Tournament 2025/2026", status: "published", match_report: null },
  { id: "3", home_team: "Victoria FC", away_team: "Good Shepherd FC", home_score: 1, away_score: 7, match_date: "2025-06-15", venue: "Orom Ground", competition: "Orom Youth Tournament 2025/2026", status: "published", match_report: null },
];

const groupStandings = [
  { team: "Good Shepherd FC", p: 1, w: 1, d: 0, l: 0, gf: 7, ga: 1, pts: 3 },
  { team: "UPDF FC", p: 2, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
  { team: "Victoria FC", p: 3, w: 1, d: 1, l: 1, gf: 6, ga: 8, pts: 4 },
  { team: "Rock City", p: 1, w: 0, d: 0, l: 1, gf: 0, ga: 4, pts: 0 },
];

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("fixtures")
      .select("*")
      .eq("status", "published")
      .order("match_date", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setFixtures(data);
        else setFixtures(localFixtures);
        setLoading(false);
      });
  }, []);

  const getResultStyle = (fixture: Fixture, team: "home" | "away") => {
    if (fixture.home_score === null || fixture.away_score === null) return "";
    const isVictoria = team === "home" ? fixture.home_team.includes("Victoria") : fixture.away_team.includes("Victoria");
    if (!isVictoria) return "";
    const victoriaScore = team === "home" ? fixture.home_score : fixture.away_score;
    const opponentScore = team === "home" ? fixture.away_score : fixture.home_score;
    if (victoriaScore > opponentScore) return "text-green-600 font-bold";
    if (victoriaScore < opponentScore) return "text-red-500";
    return "text-yellow-600";
  };

  const getMatchResult = (fixture: Fixture) => {
    if (fixture.home_score === null || fixture.away_score === null) return null;
    const home = fixture.home_team.includes("Victoria") ? fixture.home_score : null;
    const away = fixture.away_team.includes("Victoria") ? fixture.away_score : null;
    const victoriaScore = home ?? away;
    const opponentScore = home !== null ? fixture.away_score : fixture.home_score;
    if (victoriaScore === null || opponentScore === null) return null;
    if (victoriaScore > opponentScore) return { label: "W", style: "bg-green-100 text-green-700 border-green-300" };
    if (victoriaScore < opponentScore) return { label: "L", style: "bg-red-100 text-red-600 border-red-300" };
    return { label: "D", style: "bg-yellow-100 text-yellow-700 border-yellow-300" };
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Season 2025/2026</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">Fixtures & Results</h1>
          <div className="gold-line" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Fixtures */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold text-primary mb-1 uppercase">
              Orom Youth Tournament 2025/2026
            </h2>
            <p className="text-muted-foreground text-sm mb-6">Group A – Match Results</p>

            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {fixtures.map((fixture) => {
                  const result = getMatchResult(fixture);
                  const hasResult = fixture.home_score !== null && fixture.away_score !== null;

                  return (
                    <div key={fixture.id} className="card-club p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Trophy className="w-3 h-3 text-gold" />
                          <span>{fixture.competition}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {result && (
                            <span className={`status-badge border text-xs ${result.style}`}>
                              {result.label}
                            </span>
                          )}
                          <span className="status-badge bg-primary/10 text-primary text-xs border border-primary/20">
                            {fixture.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 text-right">
                          <p className={`font-heading text-lg font-bold ${getResultStyle(fixture, "home")} ${fixture.home_team.includes("Victoria") ? "text-primary" : "text-foreground"}`}>
                            {fixture.home_team}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground">
                          {hasResult ? (
                            <>
                              <span className="font-heading text-3xl font-bold">{fixture.home_score}</span>
                              <span className="text-primary-foreground/50 mx-1">–</span>
                              <span className="font-heading text-3xl font-bold">{fixture.away_score}</span>
                            </>
                          ) : (
                            <span className="font-heading text-lg font-semibold px-2">vs</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-heading text-lg font-bold ${getResultStyle(fixture, "away")} ${fixture.away_team.includes("Victoria") ? "text-primary" : "text-foreground"}`}>
                            {fixture.away_team}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        {fixture.match_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(fixture.match_date).toLocaleDateString("en-UG", { day: "numeric", month: "long", year: "numeric" })}
                          </div>
                        )}
                        {fixture.venue && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {fixture.venue}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Standings */}
          <div>
            <div className="card-club p-6">
              <h3 className="font-heading text-xl font-bold text-primary uppercase mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-gold" />
                Group A Standings
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-xs text-muted-foreground font-semibold">Team</th>
                      <th className="text-center py-2 text-xs text-muted-foreground font-semibold">P</th>
                      <th className="text-center py-2 text-xs text-muted-foreground font-semibold">W</th>
                      <th className="text-center py-2 text-xs text-muted-foreground font-semibold">D</th>
                      <th className="text-center py-2 text-xs text-muted-foreground font-semibold">L</th>
                      <th className="text-center py-2 text-xs text-muted-foreground font-semibold">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...groupStandings]
                      .sort((a, b) => b.pts - a.pts)
                      .map((team, i) => (
                        <tr
                          key={team.team}
                          className={`border-b border-border/50 ${
                            team.team.includes("Victoria") ? "bg-primary/5" : ""
                          }`}
                        >
                          <td className="py-3 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground text-xs w-4">{i + 1}</span>
                              <span className={`font-medium text-xs ${team.team.includes("Victoria") ? "text-primary font-bold" : ""}`}>
                                {team.team}
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-3 text-xs">{team.p}</td>
                          <td className="text-center py-3 text-xs text-green-600">{team.w}</td>
                          <td className="text-center py-3 text-xs text-yellow-600">{team.d}</td>
                          <td className="text-center py-3 text-xs text-red-500">{team.l}</td>
                          <td className="text-center py-3">
                            <span className="font-heading font-bold text-primary text-sm">{team.pts}</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming */}
            <div className="card-club p-6 mt-4">
              <h3 className="font-heading text-xl font-bold text-primary uppercase mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                Fixture Status
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Draft", style: "bg-muted text-muted-foreground", desc: "Created by coach" },
                  { label: "Submitted", style: "bg-blue-100 text-blue-600", desc: "Awaiting CEO approval" },
                  { label: "Approved", style: "bg-yellow-100 text-yellow-700", desc: "CEO approved" },
                  { label: "Published", style: "bg-green-100 text-green-700", desc: "Public" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className={`status-badge ${s.style} text-xs`}>{s.label}</span>
                    <span className="text-muted-foreground text-xs">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
