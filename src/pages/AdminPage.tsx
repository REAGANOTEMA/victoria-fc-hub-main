import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import {
  LayoutDashboard, Users, Calendar, Newspaper, Image, GraduationCap, 
  Heart, Settings, LogOut, Menu, X, Plus, CheckCircle, XCircle, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";
import clubLogo from "@/assets/club-logo.png";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

type AdminTab = "dashboard" | "players" | "fixtures" | "news" | "gallery" | "academy" | "donations" | "users";

const sidebarItems = [
  { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
  { id: "players" as AdminTab, label: "Players", icon: Users },
  { id: "fixtures" as AdminTab, label: "Fixtures", icon: Calendar },
  { id: "news" as AdminTab, label: "News", icon: Newspaper },
  { id: "gallery" as AdminTab, label: "Gallery", icon: Image },
  { id: "academy" as AdminTab, label: "Academy Apps", icon: GraduationCap },
  { id: "donations" as AdminTab, label: "Donations", icon: Heart },
  { id: "users" as AdminTab, label: "Users", icon: Settings },
];

export default function AdminPage() {
  const { user, isAdmin, isCEO, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  // Stats
  const [stats, setStats] = useState({ players: 0, fixtures: 0, news: 0, donations: 0, academy: 0 });
  const [players, setPlayers] = useState<unknown[]>([]);
  const [fixtures, setFixtures] = useState<unknown[]>([]);
  const [academy, setAcademy] = useState<unknown[]>([]);
  const [donations, setDonations] = useState<unknown[]>([]);
  const [newPlayer, setNewPlayer] = useState({ name: "", position: "Midfielder", jersey_number: "", age: "", bio: "" });
  const [newFixture, setNewFixture] = useState({ home_team: "Victoria FC", away_team: "", competition: "Orom Youth Tournament 2025/2026", venue: "Orom Ground", match_date: "", home_score: "", away_score: "" });
  const [newNews, setNewNews] = useState({ title: "", body: "", category: "Match Reports", youtube_url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      Promise.all([
        supabase.from("players").select("*", { count: "exact", head: true }),
        supabase.from("fixtures").select("*", { count: "exact", head: true }),
        supabase.from("news").select("*", { count: "exact", head: true }),
        supabase.from("donations").select("*", { count: "exact", head: true }),
        supabase.from("academy_applications").select("*", { count: "exact", head: true }),
      ]).then(([p, f, n, d, a]) => {
        setStats({ players: p.count || 0, fixtures: f.count || 0, news: n.count || 0, donations: d.count || 0, academy: a.count || 0 });
      });

      if (activeTab === "players") supabase.from("players").select("*").order("name").then(({ data }) => { if (data) setPlayers(data); });
      if (activeTab === "fixtures") supabase.from("fixtures").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setFixtures(data); });
      if (activeTab === "academy") supabase.from("academy_applications").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setAcademy(data); });
      if (activeTab === "donations") supabase.from("donations").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setDonations(data); });
    }
  }, [user, activeTab]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-gold rounded-full animate-spin" /></div>;
  if (!user || !isAdmin) return <Navigate to="/auth" replace />;

  const addPlayer = async () => {
    setSaving(true);
    const { error } = await supabase.from("players").insert([{ ...newPlayer, jersey_number: parseInt(newPlayer.jersey_number) || null, age: parseInt(newPlayer.age) || null }]);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Player added!" }); setNewPlayer({ name: "", position: "Midfielder", jersey_number: "", age: "", bio: "" }); }
    setSaving(false);
  };

  const addFixture = async () => {
    setSaving(true);
    const { error } = await supabase.from("fixtures").insert([{ ...newFixture, home_score: newFixture.home_score ? parseInt(newFixture.home_score) : null, away_score: newFixture.away_score ? parseInt(newFixture.away_score) : null, status: "submitted" }]);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Fixture submitted for CEO approval!" }); setNewFixture({ home_team: "Victoria FC", away_team: "", competition: "Orom Youth Tournament 2025/2026", venue: "Orom Ground", match_date: "", home_score: "", away_score: "" }); }
    setSaving(false);
  };

  const approveFixture = async (id: string, status: string) => {
    const newStatus = status === "submitted" ? "approved" : "published";
    const { error } = await supabase.from("fixtures").update({ status: newStatus }).eq("id", id);
    if (!error) { toast({ title: `Fixture ${newStatus}!` }); supabase.from("fixtures").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setFixtures(data); }); }
  };

  const addNews = async () => {
    setSaving(true);
    const { error } = await supabase.from("news").insert([{ ...newNews, is_published: true }]);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "News published!" }); setNewNews({ title: "", body: "", category: "Match Reports", youtube_url: "" }); }
    setSaving(false);
  };

  const deletePlayer = async (id: string) => {
    const { error } = await supabase.from("players").delete().eq("id", id);
    if (!error) { toast({ title: "Player deleted" }); setPlayers(prev => (prev as { id: string }[]).filter((p) => p.id !== id)); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(var(--sidebar-background))" }}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ background: "hsl(var(--sidebar-background))" }}>
        <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
          <img src={clubLogo} alt="Victoria FC" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-heading font-bold text-sidebar-foreground text-sm uppercase">Admin Panel</p>
            <p className="text-xs" style={{ color: "hsl(var(--gold))" }}>Victoria FC Orom</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`sidebar-item w-full text-sidebar-foreground ${activeTab === id ? "active" : "hover:bg-sidebar-accent"}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <button onClick={signOut} className="sidebar-item w-full text-sidebar-foreground hover:bg-destructive/20">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-4 sticky top-0 z-20">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-xl font-bold text-primary uppercase">
            {sidebarItems.find(i => i.id === activeTab)?.label}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            {isCEO && <span className="px-2 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-bold">CEO</span>}
            <Link to="/" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-1">
              <Eye className="w-4 h-4" /> View Site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { label: "Players", value: stats.players, color: "text-primary" },
                  { label: "Fixtures", value: stats.fixtures, color: "text-gold" },
                  { label: "News", value: stats.news, color: "text-green-600" },
                  { label: "Donations", value: stats.donations, color: "text-purple-600" },
                  { label: "Academy Apps", value: stats.academy, color: "text-orange-600" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="card-club p-5 text-center">
                    <div className={`font-heading text-4xl font-bold ${color}`}>{value}</div>
                    <div className="text-muted-foreground text-sm mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <div className="card-club p-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sidebarItems.slice(1, 5).map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => setActiveTab(id)} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                      <span className="text-sm font-medium">Add {label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Players */}
          {activeTab === "players" && (
            <div className="space-y-6">
              <div className="card-club p-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-gold" /> Add Player</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Name *</Label><Input className="mt-1" value={newPlayer.name} onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })} placeholder="Player name" /></div>
                  <div><Label>Position</Label>
                    <Select value={newPlayer.position} onValueChange={(v) => setNewPlayer({ ...newPlayer, position: v })}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>{["Goalkeeper","Defender","Midfielder","Forward"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Jersey #</Label><Input className="mt-1" type="number" value={newPlayer.jersey_number} onChange={e => setNewPlayer({ ...newPlayer, jersey_number: e.target.value })} /></div>
                  <div><Label>Age</Label><Input className="mt-1" type="number" value={newPlayer.age} onChange={e => setNewPlayer({ ...newPlayer, age: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label>Bio</Label><Textarea className="mt-1" value={newPlayer.bio} onChange={e => setNewPlayer({ ...newPlayer, bio: e.target.value })} rows={2} /></div>
                </div>
                <Button onClick={addPlayer} disabled={saving || !newPlayer.name} className="btn-gold mt-4 px-6 py-2 rounded-lg font-bold uppercase tracking-wider">
                  {saving ? "Saving..." : "Add Player"}
                </Button>
              </div>
              <div className="card-club overflow-hidden">
                <div className="p-4 border-b border-border font-heading font-bold text-primary uppercase">Squad List ({players.length})</div>
                <div className="divide-y divide-border">
                  {(players as { id: string; name: string; position: string; jersey_number: number | null; age: number | null }[]).map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.jersey_number && <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{p.jersey_number}</span>}
                        <div>
                          <p className="font-semibold text-sm">{p.name}</p>
                          <p className="text-muted-foreground text-xs">{p.position} {p.age ? `• Age ${p.age}` : ""}</p>
                        </div>
                      </div>
                      <button onClick={() => deletePlayer(p.id)} className="text-destructive hover:text-destructive/80 transition-colors"><XCircle className="w-4 h-4" /></button>
                    </div>
                  ))}
                  {players.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No players yet</div>}
                </div>
              </div>
            </div>
          )}

          {/* Fixtures */}
          {activeTab === "fixtures" && (
            <div className="space-y-6">
              <div className="card-club p-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-gold" /> Add Fixture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Home Team *</Label><Input className="mt-1" value={newFixture.home_team} onChange={e => setNewFixture({ ...newFixture, home_team: e.target.value })} /></div>
                  <div><Label>Away Team *</Label><Input className="mt-1" value={newFixture.away_team} onChange={e => setNewFixture({ ...newFixture, away_team: e.target.value })} placeholder="Opponent team" /></div>
                  <div><Label>Home Score</Label><Input className="mt-1" type="number" value={newFixture.home_score} onChange={e => setNewFixture({ ...newFixture, home_score: e.target.value })} /></div>
                  <div><Label>Away Score</Label><Input className="mt-1" type="number" value={newFixture.away_score} onChange={e => setNewFixture({ ...newFixture, away_score: e.target.value })} /></div>
                  <div><Label>Match Date</Label><Input className="mt-1" type="datetime-local" value={newFixture.match_date} onChange={e => setNewFixture({ ...newFixture, match_date: e.target.value })} /></div>
                  <div><Label>Venue</Label><Input className="mt-1" value={newFixture.venue} onChange={e => setNewFixture({ ...newFixture, venue: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label>Competition</Label><Input className="mt-1" value={newFixture.competition} onChange={e => setNewFixture({ ...newFixture, competition: e.target.value })} /></div>
                </div>
                <p className="text-muted-foreground text-xs mt-3">⚠️ Fixture will be submitted for CEO approval before publishing.</p>
                <Button onClick={addFixture} disabled={saving || !newFixture.away_team} className="btn-gold mt-4 px-6 py-2 rounded-lg font-bold uppercase tracking-wider">
                  {saving ? "Saving..." : "Submit Fixture"}
                </Button>
              </div>
              <div className="card-club overflow-hidden">
                <div className="p-4 border-b border-border font-heading font-bold text-primary uppercase">Fixtures ({fixtures.length})</div>
                <div className="divide-y divide-border">
                  {(fixtures as { id: string; home_team: string; away_team: string; home_score: number | null; away_score: number | null; status: string; competition: string }[]).map((f) => (
                    <div key={f.id} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="font-semibold text-sm">{f.home_team} vs {f.away_team}</p>
                        <p className="text-muted-foreground text-xs">{f.competition}</p>
                        {f.home_score !== null && <p className="text-xs text-gold mt-0.5">{f.home_score} – {f.away_score}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${f.status === "published" ? "bg-green-100 text-green-700" : f.status === "approved" ? "bg-yellow-100 text-yellow-700" : f.status === "submitted" ? "bg-blue-100 text-blue-600" : "bg-muted text-muted-foreground"}`}>
                          {f.status}
                        </span>
                        {isCEO && (f.status === "submitted" || f.status === "approved") && (
                          <button onClick={() => approveFixture(f.id, f.status)} className="text-xs px-3 py-1 rounded-lg bg-gold/20 text-gold hover:bg-gold/40 transition-colors font-semibold">
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                            {f.status === "submitted" ? "Approve" : "Publish"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {fixtures.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No fixtures yet</div>}
                </div>
              </div>
            </div>
          )}

          {/* News */}
          {activeTab === "news" && (
            <div className="card-club p-6">
              <h3 className="font-heading text-xl font-bold text-primary mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-gold" /> Post News</h3>
              <div className="space-y-4">
                <div><Label>Title *</Label><Input className="mt-1" value={newNews.title} onChange={e => setNewNews({ ...newNews, title: e.target.value })} placeholder="Article headline" /></div>
                <div>
                  <Label>Category</Label>
                  <Select value={newNews.category} onValueChange={(v) => setNewNews({ ...newNews, category: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>{["Match Reports","Announcements","Transfers","Community","General"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>YouTube URL (optional)</Label><Input className="mt-1" value={newNews.youtube_url} onChange={e => setNewNews({ ...newNews, youtube_url: e.target.value })} placeholder="https://youtube.com/..." /></div>
                <div><Label>Article Body *</Label><Textarea className="mt-1" value={newNews.body} onChange={e => setNewNews({ ...newNews, body: e.target.value })} rows={8} placeholder="Write your article..." /></div>
                <Button onClick={addNews} disabled={saving || !newNews.title || !newNews.body} className="btn-gold px-6 py-2 rounded-lg font-bold uppercase tracking-wider">
                  {saving ? "Publishing..." : "Publish Article"}
                </Button>
              </div>
            </div>
          )}

          {/* Academy */}
          {activeTab === "academy" && (
            <div className="card-club overflow-hidden">
              <div className="p-4 border-b border-border font-heading font-bold text-primary uppercase">Academy Applications ({academy.length})</div>
              <div className="divide-y divide-border">
                {(academy as { id: string; full_name: string; position: string; parent_contact: string; date_of_birth: string; status: string; created_at: string }[]).map((a) => (
                  <div key={a.id} className="px-4 py-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{a.full_name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">Position: {a.position} • DOB: {new Date(a.date_of_birth).toLocaleDateString()}</p>
                        <p className="text-muted-foreground text-xs">Contact: {a.parent_contact}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${a.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {a.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">Submitted: {new Date(a.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                {academy.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No applications yet</div>}
              </div>
            </div>
          )}

          {/* Donations */}
          {activeTab === "donations" && (
            <div className="card-club overflow-hidden">
              <div className="p-4 border-b border-border font-heading font-bold text-primary uppercase">Donations ({donations.length})</div>
              <div className="divide-y divide-border">
                {(donations as { id: string; donor_name: string; amount: number; currency: string; payment_method: string | null; message: string | null; created_at: string }[]).map((d) => (
                  <div key={d.id} className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{d.donor_name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{d.payment_method} • {new Date(d.created_at).toLocaleDateString()}</p>
                        {d.message && <p className="text-muted-foreground text-xs mt-1 italic">"{d.message}"</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-heading font-bold text-gold text-xl">{d.currency} {d.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {donations.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No donations yet</div>}
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <div className="card-club p-6">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">User Management</h3>
              <p className="text-muted-foreground text-sm">
                User role management is available via the backend. Roles: CEO, Admin, Coach, Player, Fan. Contact the system administrator to assign elevated roles.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
