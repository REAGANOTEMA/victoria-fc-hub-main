import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Phone, Mail, Building2, Loader2, CheckCircle, Globe } from "lucide-react";

export default function DonatePage() {
  const [form, setForm] = useState({
    donor_name: "",
    amount: "",
    currency: "UGX",
    message: "",
    payment_method: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("donations").insert([{
        donor_name: form.donor_name,
        amount: parseFloat(form.amount),
        currency: form.currency,
        message: form.message || null,
        payment_method: form.payment_method,
      }]);
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Thank you!", description: "Your donation has been recorded. We appreciate your support!" });
    } catch (error: unknown) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: "mtn", label: "MTN Mobile Money", number: "0770828224", icon: "📱", color: "bg-yellow-50 border-yellow-300" },
    { id: "airtel", label: "Airtel Money", number: "0745000648", icon: "📱", color: "bg-red-50 border-red-300" },
    { id: "bank", label: "Stanbic Bank", number: "Account: Victoria", icon: "🏦", color: "bg-blue-50 border-blue-300" },
    { id: "international", label: "International (Stripe)", number: "Coming Soon", icon: "💳", color: "bg-gray-50 border-gray-300" },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-club text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Support The Club</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">Donate</h1>
          <div className="gold-line" />
          <p className="text-primary-foreground/80 text-lg mt-6 max-w-2xl">
            Your contribution helps us develop young talent in Orom and leave no one behind.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Why Donate */}
          <div>
            <h2 className="section-heading mb-4">Why Support Victoria FC?</h2>
            <div className="gold-line mb-6" />
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>Victoria Football Club Orom is more than just a football club – it's a beacon of hope for talented youth in Northern Uganda. Your support directly impacts:</p>
              <ul className="space-y-3">
                {[
                  "Providing quality football training for talented young players",
                  "Purchasing training equipment and football kits",
                  "Covering tournament registration and travel fees",
                  "Supporting families who cannot afford football-related costs",
                  "Building a permanent home ground for the club",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Heart className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Methods */}
            <h3 className="font-heading text-xl font-bold text-primary uppercase mb-4">Payment Methods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className={`rounded-xl p-4 border ${method.color}`}>
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <p className="font-semibold text-sm text-foreground">{method.label}</p>
                  <p className="text-muted-foreground text-xs mt-1">{method.number}</p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-primary text-sm mb-3">Questions? Contact Us:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-gold" />
                  WhatsApp: 0761720262
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-gold" />
                  victoriafootballafair@gmail.com
                </div>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div>
            {submitted ? (
              <div className="card-club p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading text-3xl font-bold text-primary mb-3">Thank You!</h3>
                <p className="text-muted-foreground">Your generosity helps Victoria FC develop the next generation of Ugandan football talent. God bless you!</p>
                <Button onClick={() => setSubmitted(false)} className="btn-gold mt-8 px-8 py-3 rounded-xl font-bold uppercase tracking-wider">
                  Donate Again
                </Button>
              </div>
            ) : (
              <div className="card-club p-8">
                <h3 className="font-heading text-2xl font-bold text-primary uppercase mb-6">Make a Donation</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="donor_name">Your Name *</Label>
                    <Input
                      id="donor_name"
                      placeholder="Your full name"
                      value={form.donor_name}
                      onChange={(e) => setForm({ ...form, donor_name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="amount">Amount *</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                        min="1"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        value={form.currency}
                        onChange={(e) => setForm({ ...form, currency: e.target.value })}
                        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background"
                      >
                        <option value="UGX">UGX (Uganda Shilling)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="GBP">GBP (British Pound)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="payment_method">Payment Method *</Label>
                    <select
                      id="payment_method"
                      value={form.payment_method}
                      onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                      required
                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background"
                    >
                      <option value="">Select payment method</option>
                      <option value="MTN Mobile Money">MTN Mobile Money</option>
                      <option value="Airtel Money">Airtel Money</option>
                      <option value="Stanbic Bank">Stanbic Bank Transfer</option>
                      <option value="Flutterwave">Flutterwave</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="A message of support..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !form.payment_method}
                    className="btn-gold w-full py-4 rounded-xl text-base font-bold uppercase tracking-wider"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Heart className="w-5 h-5 mr-2" />}
                    Confirm Donation
                  </Button>
                </form>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
              <Globe className="w-5 h-5 text-gold flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong>International donors:</strong> Stripe payment integration coming soon. For now, please use bank transfer or contact us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
