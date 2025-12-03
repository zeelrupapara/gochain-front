import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { 
  Box, 
  Hash,
  Clock, 
  Layers, 
  GitBranch, 
  FileCode, 
  ArrowLeft,
  Copy,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mockBlock = {
  height: 1247,
  hash: "0x8f3a9b7c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
  previousHash: "0x7e2b8a6c1d0e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
  timestamp: Date.now() - 120000,
  nonce: 234891,
  difficulty: 24,
  merkleRoot: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
  txCount: 15,
  size: 3456,
  transactions: Array.from({ length: 15 }, (_, i) => ({
    hash: "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    from: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    to: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    amount: Math.random() * 10,
  })),
};

const BlockDetail = () => {
  const { hash } = useParams();
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [animatedNonce, setAnimatedNonce] = useState(0);

  // Animate nonce counter on load
  useState(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10000) + 5000;
      if (current >= mockBlock.nonce) {
        setAnimatedNonce(mockBlock.nonce);
        clearInterval(interval);
      } else {
        setAnimatedNonce(current);
      }
    }, 50);
    return () => clearInterval(interval);
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/blocks">
          <Button variant="ghost" className="mb-4 animate-fade-in">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blocks
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Box className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Block #{mockBlock.height}
              </h1>
              <p className="text-muted-foreground text-sm">
                {formatTime(mockBlock.timestamp)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Block Visualization */}
          <div className="glass-card rounded-xl p-6 animate-slide-in-left">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Block Structure
            </h2>

            {/* Visual Block */}
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/30 mb-6">
              {/* Header Section */}
              <div className="mb-4 p-3 rounded-lg bg-card/50 border border-border/50 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <p className="text-xs text-muted-foreground mb-1">Block Header</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Height:</span>
                    <span className="ml-2 font-mono text-foreground">{mockBlock.height}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="ml-2 font-mono text-foreground">{mockBlock.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Nonce Section */}
              <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/30 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <p className="text-xs text-accent mb-1">Nonce (Proof of Work)</p>
                <p className="font-mono text-2xl text-accent font-bold">
                  {animatedNonce.toLocaleString()}
                </p>
              </div>

              {/* Merkle Root */}
              <div className="mb-4 p-3 rounded-lg bg-card/50 border border-border/50 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <p className="text-xs text-muted-foreground mb-1">Merkle Root</p>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-primary" />
                  <p className="font-mono text-xs text-foreground truncate">
                    {mockBlock.merkleRoot}
                  </p>
                </div>
              </div>

              {/* TX Count */}
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transactions</span>
                  <span className="text-2xl font-bold text-primary">{mockBlock.txCount}</span>
                </div>
              </div>
            </div>

            {/* Block Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Size</span>
                <span className="font-mono text-foreground">{(mockBlock.size / 1000).toFixed(2)} KB</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Timestamp</span>
                <span className="font-mono text-foreground text-xs">{formatTime(mockBlock.timestamp)}</span>
              </div>
            </div>
          </div>

          {/* Details & Transactions */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Hash Info */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Hash Details
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Block Hash</p>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <p className="font-mono text-xs text-foreground truncate flex-1">
                      {mockBlock.hash}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(mockBlock.hash, "Hash")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Previous Block Hash</p>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <p className="font-mono text-xs text-foreground truncate flex-1">
                      {mockBlock.previousHash}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(mockBlock.previousHash, "Previous hash")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* JSON Viewer */}
            <Collapsible open={isJsonOpen} onOpenChange={setIsJsonOpen}>
              <div className="glass-card rounded-xl overflow-hidden">
                <CollapsibleTrigger asChild>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      <FileCode className="w-5 h-5 text-primary" />
                      Raw JSON
                    </span>
                    <ChevronDown className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      isJsonOpen && "rotate-180"
                    )} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 border-t border-border/50">
                    <pre className="font-mono text-xs text-muted-foreground overflow-x-auto p-4 rounded-lg bg-muted/30">
                      {JSON.stringify(mockBlock, null, 2)}
                    </pre>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Transactions List */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Transactions ({mockBlock.txCount})
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockBlock.transactions.map((tx, i) => (
                  <Link
                    key={tx.hash}
                    to={`/transactions/${tx.hash}`}
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <p className="font-mono text-xs text-muted-foreground truncate">
                      {tx.hash}
                    </p>
                    <p className="text-sm text-primary mt-1">
                      {tx.amount.toFixed(4)} CGO
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlockDetail;
