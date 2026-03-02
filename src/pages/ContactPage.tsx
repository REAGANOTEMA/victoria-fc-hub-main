import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, Loader2, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    toast({ title: "Message Sent!", description: "We'll get back to you within 48 hours." });
    setLoading(false);
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">Contact Us</h1>
          <div className="gold-line" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="section-heading mb-4">Reach Out</h2>
            <div className="gold-line mb-6" />
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you want to support us, join our academy, partner with us, or just learn more about Victoria FC Orom — we'd love to hear from you.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Our Ground</p>
                  <p className="text-muted-foreground text-sm">Laditooywee Cell, Lolia Ward</p>
                  <p className="text-muted-foreground text-sm">Orom Town Council, Kitgum District</p>
                  <p className="text-muted-foreground text-sm">Northern Uganda</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <Phone className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Phone / WhatsApp</p>
                  <p className="text-muted-foreground text-sm">MTN: +256 770 828 224</p>
                  <p className="text-muted-foreground text-sm">Airtel: +256 745 000 648</p>
                  <p className="text-muted-foreground text-sm">WhatsApp: +256 761 720 262</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <Mail className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Email</p>
                  <a href="mailto:victoriafootballafair@gmail.com" className="text-primary hover:text-gold text-sm transition-colors">
                    victoriafootballafair@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="card-club p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading text-3xl font-bold text-primary mb-3">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We'll respond within 48 hours.</p>
                <Button onClick={() => setSent(false)} className="btn-gold mt-8 px-8 py-3 rounded-xl font-bold uppercase tracking-wider">
                  Send Another
                </Button>
              </div>
            ) : (
              <div className="card-club p-8">
                <h3 className="font-heading text-2xl font-bold text-primary uppercase mb-6 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-gold" />
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="mt-1" />
                  </div>
                  <Button type="submit" disabled={loading} className="btn-gold w-full py-4 rounded-xl text-base font-bold uppercase tracking-wider">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Mail className="w-5 h-5 mr-2" />}
                    Send Message
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
