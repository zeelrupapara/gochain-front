import { Blocks, Github, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

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
                href="https://github.com/zeelrupapara"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.upwork.com/freelancers/~0122232418cbabcf61"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                title="Upwork Profile"
              >
                <Briefcase className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/zeelrupapara/gochain-front"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                title="Project Repository"
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
              <li>
                <a
                  href="https://github.com/zeelrupapara/gochain-front"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/zeelrupapara/gochain-front/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://www.upwork.com/freelancers/~0122232418cbabcf61"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Hire on Upwork
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/zeelrupapara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Developer Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-xs text-muted-foreground">
                © {currentYear} ChainGo. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Developed by</span>
                <a
                  href="https://www.upwork.com/freelancers/~0122232418cbabcf61"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  title="Hire Jeel on Upwork"
                >
                  Jeel Rupapara
                </a>
              </div>
            </div>
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
      </div>
    </footer>
  );
};
