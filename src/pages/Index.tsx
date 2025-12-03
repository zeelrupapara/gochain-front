import { Layout } from "@/components/layout/Layout";
import { AnimatedBlockchainGSAP } from "@/components/dashboard/AnimatedBlockchainGSAP";
import { AnimatedBackground } from "@/components/dashboard/AnimatedBackground";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TransactionPool } from "@/components/dashboard/TransactionPool";
import { MiningStatus } from "@/components/dashboard/MiningStatus";

import { Blocks, Clock, Activity, Users } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">ChainGo</span> Dashboard
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time blockchain visualization and management
          </p>
        </div>

        {/* Animated Blockchain */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground/90">Blockchain Explorer</h2>
          <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
            <AnimatedBlockchainGSAP />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Block Height"
            value={2847}
            icon={Blocks}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Avg Block Time"
            value="4.2s"
            icon={Clock}
            trend={{ value: 8, isPositive: false }}
          />
          <StatsCard
            title="Network Hash"
            value="1.24 TH/s"
            icon={Activity}
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="Active Peers"
            value={42}
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
        </section>

        {/* Transaction Pool & Mining Status */}
        <section className="grid lg:grid-cols-2 gap-6">
          <TransactionPool />
          <MiningStatus />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
