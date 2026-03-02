import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Users, Target, School, Trophy, Loader2, CheckCircle } from "lucide-react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const programs = [
  { icon: GraduationCap, title: "U16 Academy", desc: "Developing the next generation of Victoria FC talent with structured coaching and mentorship.", age: "Under 16" },
  { icon: Users, title: "U21 Development Squad", desc: "Advanced training for top youth prospects ready to step up to competitive football.", age: "Under 21" },
  { icon: Target, title: "Talent Scouting Program", desc: "Identifying exceptional talent across Orom and Northern Uganda.", age: "All Ages" },
  { icon: School, title: "Primary School Exploration", desc: "Partnering with Orom Primary School to discover football talent at a young age.", age: "Ages 8-13" },
  { icon: Trophy, title: "Intercultural Institutional Games", desc: "Cross-institution competitions fostering community unity through sport.", age: "Mixed" },
];

export default function AcademyPage() {
  const [form, setForm] = useState({
    full_name: "",
    date_of_birth: "",
    parent_contact: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("academy_applications").insert([{
        full_name: form.full_name,
        date_of_birth: form.date_of_birth,
        parent_contact: form.parent_contact,
        position: form.position,
      }]);
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Application submitted!", description: "We'll contact you soon." });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Develop Your Talent</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">Academy</h1>
          <div className="gold-line" />
          <p className="text-primary-foreground/80 text-lg mt-6 max-w-2xl">
            We believe every young talent deserves a chance. Join the Victoria FC Academy and become part of something special.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold text-sm uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="section-heading">Academy Programs</h2>
            <div className="gold-line mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(({ icon: Icon, title, desc, age }) => (
              <div key={title} className="card-club p-6 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-gold/10 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-7 h-7 text-primary group-hover:text-gold transition-colors" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading text-xl font-bold text-primary">{title}</h3>
                </div>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-3">
                  {age}
                </span>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-gold text-sm uppercase tracking-widest mb-2">Take The First Step</p>
              <h2 className="section-heading">Apply Now</h2>
              <div className="gold-line mx-auto mt-3" />
            </div>

            {submitted ? (
              <div className="card-club p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading text-3xl font-bold text-primary mb-3">Application Received!</h3>
                <p className="text-muted-foreground">
                  Thank you for applying to the Victoria FC Academy. Our coaching staff will review your application and contact you shortly.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold mt-8 px-8 py-3 rounded-xl font-bold uppercase tracking-wider"
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <div className="card-club p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      placeholder="Player's full name"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={form.date_of_birth}
                      onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="parent_contact">Parent / Guardian Contact *</Label>
                    <Input
                      id="parent_contact"
                      placeholder="+256 7XX XXX XXX"
                      value={form.parent_contact}
                      onChange={(e) => setForm({ ...form, parent_contact: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Position Applying For *</Label>
                    <Select
                      value={form.position}
                      onValueChange={(val) => setForm({ ...form, position: val })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Goalkeeper", "Defender", "Midfielder", "Forward", "Any Position"].map((pos) => (
                          <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !form.position}
                    className="btn-gold w-full py-4 rounded-xl text-base font-bold uppercase tracking-wider"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    Submit Application
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
