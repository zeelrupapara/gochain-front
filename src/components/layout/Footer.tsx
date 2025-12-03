import { Blocks, Github, Twitter, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About ChainGo */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Blocks className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-gradient">ChainGo</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              ChainGo is a modern, developer-focused blockchain dashboard providing 
              real-time insights into your blockchain network. Monitor blocks, 
              transactions, mining operations, and network health with an intuitive interface.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Dashboard", path: "/" },
                { label: "Blocks Explorer", path: "/blocks" },
                { label: "Transactions", path: "/transactions" },
                { label: "Wallet", path: "/wallet" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "Documentation", href: "#" },
                { label: "API Reference", href: "#" },
                { label: "GitHub", href: "#" },
                { label: "Support", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 ChainGo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Network: <span className="text-primary font-mono">Mainnet</span>
            </span>
            <span className="text-xs text-muted-foreground">
              Version: <span className="text-primary font-mono">v1.0.0</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
