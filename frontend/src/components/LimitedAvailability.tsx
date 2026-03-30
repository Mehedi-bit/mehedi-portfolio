import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const LimitedAvailability = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Connect to API
    toast({
      title: "Request received!",
      description: "I'll follow up within 12 hours.",
    });
    setEmail("");
  };

  return (
    <section className="py-16 px-4 border-b border-border/50">
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-2 py-2 mb-6 border border-foreground/20 rounded-full cursor-pointer ">
          <span className="text-sm font-medium text-foreground">
            <span className="bg-foreground text-background px-2 py-0.5 rounded-full focus:ring-2">Limited Availability This Month</span>
          </span>
        </div>

        {/* Main Text */}
        <p className="text-foreground/80 text-base leading-relaxed mb-8 max-w-xl mx-auto">
          I'm currently taking on a limited number of projects to ensure proper time, focus, and clean execution.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border-foreground/20 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 font-medium"
            >
              Request Project Slot
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Drop your email — I'll follow up within 12 hours.
          </p>
        </form>
      </div>
    </section>
  );
};
