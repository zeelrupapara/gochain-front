import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Wallet, 
  Plus, 
  Copy, 
  QrCode, 
  ArrowUpRight, 
  ArrowDownLeft,
  Key,
  Eye,
  EyeOff,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WalletData {
  address: string;
  balance: number;
  privateKey: string;
}

const mockTransactionHistory = [
  { type: "in", amount: 5.2, from: "0x7a9f...3b2c", timestamp: Date.now() - 3600000 },
  { type: "out", amount: 1.5, to: "0x8b4e...2d1f", timestamp: Date.now() - 7200000 },
  { type: "in", amount: 10.0, from: "0x9c3d...4e2a", timestamp: Date.now() - 86400000 },
  { type: "out", amount: 2.3, to: "0x1a2b...3c4d", timestamp: Date.now() - 172800000 },
];

const WalletPage = () => {
  const [wallet, setWallet] = useState<WalletData | null>({
    address: "0x7a9f8b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a",
    balance: 125.4892,
    privateKey: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  });
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const createWallet = async () => {
    setIsCreating(true);
    
    // Simulate wallet creation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newWallet: WalletData = {
      address: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
      balance: 0,
      privateKey: "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    };
    
    setWallet(newWallet);
    setIsCreating(false);
    toast.success("New wallet created!");
  };

  const formatTime = (timestamp: number) => {
    const hours = Math.floor((Date.now() - timestamp) / 3600000);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Wallet
            </h1>
            <p className="text-muted-foreground">
              Manage your CGO tokens and keys
            </p>
          </div>

          {wallet ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Wallet Card with 3D tilt */}
              <div 
                className="perspective-1000"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
              >
                <div
                  className={cn(
                    "glass-card rounded-2xl p-8 transition-transform duration-200 ease-out",
                    "bg-gradient-to-br from-card via-card to-primary/5"
                  )}
                  style={{
                    transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/20 text-primary">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-foreground">My Wallet</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={createWallet}>
                      <RefreshCw className={cn("w-4 h-4", isCreating && "animate-spin")} />
                    </Button>
                  </div>

                  {/* Balance */}
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-4xl md:text-5xl font-bold text-foreground">
                      {wallet.balance.toFixed(4)}
                      <span className="text-xl text-primary ml-2">CGO</span>
                    </p>
                  </div>

                  {/* Address */}
                  <div className="p-4 rounded-xl bg-muted/30 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Address</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-sm text-foreground truncate">
                        {wallet.address}
                      </p>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(wallet.address, "Address")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="glow-primary">
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                    <Button variant="outline">
                      <ArrowDownLeft className="w-4 h-4 mr-2" />
                      Receive
                    </Button>
                  </div>
                </div>
              </div>

              {/* Key Management */}
              <div className="space-y-6 animate-slide-in-right">
                {/* Private Key Card */}
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="w-5 h-5 text-destructive" />
                    <h3 className="font-semibold text-foreground">Private Key</h3>
                  </div>

                  <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 mb-4">
                    <p className="text-xs text-destructive mb-2">⚠️ Never share your private key</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs text-foreground flex-1 truncate">
                        {showPrivateKey ? wallet.privateKey : "••••••••••••••••••••••••••••••••"}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                      >
                        {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      {showPrivateKey && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(wallet.privateKey, "Private key")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={createWallet}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Wallet
                  </Button>
                </div>

                {/* Transaction History */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {mockTransactionHistory.map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 animate-fade-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            tx.type === "in" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                          )}>
                            {tx.type === "in" ? (
                              <ArrowDownLeft className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {tx.type === "in" ? "Received" : "Sent"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(tx.timestamp)}
                            </p>
                          </div>
                        </div>
                        <p className={cn(
                          "font-mono font-semibold",
                          tx.type === "in" ? "text-primary" : "text-accent"
                        )}>
                          {tx.type === "in" ? "+" : "-"}{tx.amount.toFixed(4)} CGO
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* No Wallet State */
            <div className="text-center py-16 animate-fade-in">
              <div className="inline-flex p-6 rounded-full bg-primary/10 text-primary mb-6">
                <Wallet className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No Wallet Found</h2>
              <p className="text-muted-foreground mb-6">Create a new wallet to get started</p>
              <Button onClick={createWallet} className="glow-primary" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Wallet
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;
