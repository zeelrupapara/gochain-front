import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  isNew: boolean;
}

const generateAddress = () => {
  return "0x" + [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
};

export const TransactionPool = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Initialize with some transactions
    const initial: Transaction[] = Array.from({ length: 5 }, (_, i) => ({
      id: `tx-${i}`,
      from: generateAddress(),
      to: generateAddress(),
      amount: Math.random() * 10,
      timestamp: Date.now() - i * 5000,
      isNew: false,
    }));
    setTransactions(initial);

    // Add new transactions periodically
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const newTx: Transaction = {
          id: `tx-${Date.now()}`,
          from: generateAddress(),
          to: generateAddress(),
          amount: Math.random() * 10,
          timestamp: Date.now(),
          isNew: true,
        };

        // Keep only last 10 transactions
        const updated = [newTx, ...prev.slice(0, 9)];

        // Reset isNew flag
        setTimeout(() => {
          setTransactions((current) =>
            current.map((t) => (t.id === newTx.id ? { ...t, isNew: false } : t))
          );
        }, 800);

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className="glass-card rounded-xl h-full">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Transaction Pool</h3>
          <span className="text-xs text-primary font-mono">{transactions.length} pending</span>
        </div>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="p-4 space-y-3">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className={cn(
                "p-3 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300",
                tx.isNew && "animate-slide-in-left border-accent bg-accent/10"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-muted-foreground truncate max-w-[80px]">
                  {tx.from}
                </span>
                <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="font-mono text-xs text-muted-foreground truncate max-w-[80px]">
                  {tx.to}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {tx.amount.toFixed(4)} <span className="text-primary">CGO</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatTime(tx.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
