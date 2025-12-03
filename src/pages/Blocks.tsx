import { useState } from "react";
import { Search, Copy, ExternalLink, Filter, Box, Clock, Hash, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Block {
  height: number;
  hash: string;
  timestamp: number;
  txCount: number;
  miner: string;
  size: number;
  difficulty: number;
}

const generateBlocks = (count: number): Block[] => {
  return Array.from({ length: count }, (_, i) => ({
    height: 1247 - i,
    hash: "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    timestamp: Date.now() - i * 10000,
    txCount: Math.floor(Math.random() * 50) + 1,
    miner: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    size: Math.floor(Math.random() * 5000) + 1000,
    difficulty: 24,
  }));
};

const Blocks = () => {
  const [blocks] = useState<Block[]>(generateBlocks(20));
  const [searchQuery, setSearchQuery] = useState("");

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast.success("Hash copied to clipboard");
  };

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const filteredBlocks = blocks.filter(
    (block) =>
      block.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.height.toString().includes(searchQuery)
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Blocks Explorer
          </h1>
          <p className="text-muted-foreground">
            Browse and search all blocks on the chain
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Filters</h3>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by hash or height"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/30 border-border/50"
                />
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Quick Filters</p>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Last 24 hours
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  High TX count
                </Button>
              </div>
            </div>

            {/* Stats Mini Panel */}
            <div className="glass-card rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Chain Stats</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Blocks</span>
                <span className="font-mono text-primary">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Block Time</span>
                <span className="font-mono text-primary">10.2s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg TX/Block</span>
                <span className="font-mono text-primary">28</span>
              </div>
            </div>
          </div>

          {/* Blocks List */}
          <div className="lg:col-span-3">
            <ScrollArea className="h-[700px]">
              <div className="space-y-3">
                {filteredBlocks.map((block, index) => (
                  <Link
                    key={block.height}
                    to={`/blocks/${block.hash}`}
                    className={cn(
                      "glass-card rounded-xl p-4 block transition-all duration-300 hover:scale-[1.01] hover:border-primary/50 animate-fade-in group"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Box className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Block #{block.height}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(block.timestamp)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.preventDefault();
                            copyHash(block.hash);
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Hash className="w-3 h-3 text-muted-foreground" />
                      <p className="font-mono text-xs text-muted-foreground truncate">
                        {block.hash}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Transactions</p>
                        <p className="font-semibold text-foreground">{block.txCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Size</p>
                        <p className="font-semibold text-foreground">{(block.size / 1000).toFixed(2)} KB</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Difficulty</p>
                        <p className="font-semibold text-foreground">{block.difficulty}</p>
                      </div>
                    </div>

                    {/* Shimmer effect on hash */}
                    <div className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="animate-shimmer w-full h-full" />
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blocks;
