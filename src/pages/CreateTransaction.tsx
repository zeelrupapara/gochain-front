import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  ArrowLeft, 
  Send, 
  Wallet, 
  Key, 
  ArrowRight,
  Loader2,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
    privateKey: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.from || !formData.to || !formData.amount || !formData.privateKey) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Transaction created successfully!");

    // Navigate after success animation
    setTimeout(() => {
      navigate("/transactions");
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back button */}
        <Link to="/transactions">
          <Button variant="ghost" className="mb-6 animate-fade-in">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Transactions
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4">
            <Send className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create Transaction
          </h1>
          <p className="text-muted-foreground">
            Send CGO tokens to another address
          </p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-xl p-6 md:p-8 animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Address */}
            <div className="space-y-2">
              <Label htmlFor="from" className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                From Address
              </Label>
              <Input
                id="from"
                placeholder="0x..."
                value={formData.from}
                onChange={(e) => handleChange("from", e.target.value)}
                className={cn(
                  "font-mono bg-muted/30 border-border/50 transition-all duration-300",
                  "focus:ring-2 focus:ring-primary/50 focus:border-primary"
                )}
                disabled={isSubmitting || isSuccess}
              />
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="p-2 rounded-full bg-primary/10">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </div>

            {/* To Address */}
            <div className="space-y-2">
              <Label htmlFor="to" className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-accent" />
                To Address
              </Label>
              <Input
                id="to"
                placeholder="0x..."
                value={formData.to}
                onChange={(e) => handleChange("to", e.target.value)}
                className={cn(
                  "font-mono bg-muted/30 border-border/50 transition-all duration-300",
                  "focus:ring-2 focus:ring-primary/50 focus:border-primary"
                )}
                disabled={isSubmitting || isSuccess}
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (CGO)</Label>
              <Input
                id="amount"
                type="number"
                step="0.0001"
                placeholder="0.0000"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className={cn(
                  "bg-muted/30 border-border/50 transition-all duration-300",
                  "focus:ring-2 focus:ring-primary/50 focus:border-primary"
                )}
                disabled={isSubmitting || isSuccess}
              />
            </div>

            {/* Private Key */}
            <div className="space-y-2">
              <Label htmlFor="privateKey" className="flex items-center gap-2">
                <Key className="w-4 h-4 text-destructive" />
                Private Key
              </Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="Enter your private key"
                value={formData.privateKey}
                onChange={(e) => handleChange("privateKey", e.target.value)}
                className={cn(
                  "font-mono bg-muted/30 border-border/50 transition-all duration-300",
                  "focus:ring-2 focus:ring-primary/50 focus:border-primary"
                )}
                disabled={isSubmitting || isSuccess}
              />
              <p className="text-xs text-destructive/70">
                Never share your private key. This is stored locally only.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={cn(
                "w-full h-12 text-lg transition-all duration-300",
                isSuccess ? "bg-primary" : "glow-primary"
              )}
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing & Broadcasting...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Transaction Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Create & Sign Transaction
                </>
              )}
            </Button>
          </form>

          {/* Success Animation Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl animate-fade-in">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-primary/20 text-primary mb-4 animate-scale-in">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <p className="text-lg font-semibold text-foreground">
                  Transaction Created!
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirecting to transactions...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 glass-card rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <h3 className="font-semibold text-foreground mb-2">Transaction Info</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Transactions are broadcast to all network nodes</li>
            <li>• Pending transactions are included in the next mined block</li>
            <li>• Transaction fees are calculated automatically</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTransaction;
