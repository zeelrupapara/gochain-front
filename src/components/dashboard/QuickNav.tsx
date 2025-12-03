import { Link } from "react-router-dom";
import { 
  Box, 
  ArrowLeftRight, 
  Wallet, 
  Pickaxe, 
  Network, 
  Activity,
  Plus,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickNavItems = [
  { 
    path: "/blocks", 
    label: "Blocks", 
    icon: Box, 
    description: "Explore blockchain",
    color: "from-primary/20 to-primary/5"
  },
  { 
    path: "/transactions", 
    label: "Transactions", 
    icon: ArrowLeftRight, 
    description: "View all transactions",
    color: "from-accent/20 to-accent/5"
  },
  { 
    path: "/transactions/create", 
    label: "Send", 
    icon: Plus, 
    description: "Create transaction",
    color: "from-primary/20 to-accent/10"
  },
  { 
    path: "/wallet", 
    label: "Wallet", 
    icon: Wallet, 
    description: "Manage wallet",
    color: "from-accent/20 to-primary/5"
  },
  { 
    path: "/mining", 
    label: "Mining", 
    icon: Pickaxe, 
    description: "Mine blocks",
    color: "from-primary/20 to-primary/5"
  },
  { 
    path: "/network", 
    label: "Network", 
    icon: Network, 
    description: "View peers",
    color: "from-accent/20 to-accent/5"
  },
];

export const QuickNav = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {quickNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "group relative glass-card p-4 rounded-xl border border-border/50",
            "hover:border-primary/50 transition-all duration-300",
            "hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
          )}
        >
          {/* Background gradient */}
          <div className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            item.color
          )} />
          
          <div className="relative flex flex-col items-center text-center gap-2">
            <div className="p-3 rounded-lg bg-secondary/50 group-hover:bg-primary/20 transition-colors duration-300">
              <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium text-sm text-foreground">{item.label}</span>
            <span className="text-xs text-muted-foreground hidden md:block">{item.description}</span>
          </div>
          
          {/* Arrow indicator */}
          <ChevronRight className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </Link>
      ))}
    </div>
  );
};
