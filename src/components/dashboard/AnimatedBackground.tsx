import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate floating orbs
    orbsRef.current.forEach((orb, index) => {
      if (orb) {
        gsap.to(orb, {
          x: `random(-50, 50)`,
          y: `random(-50, 50)`,
          duration: 8 + index * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(orb, {
          scale: `random(0.8, 1.2)`,
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      
      {/* Animated gradient orbs */}
      <div
        ref={(el) => el && (orbsRef.current[0] = el)}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]"
      />
      <div
        ref={(el) => el && (orbsRef.current[1] = el)}
        className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px]"
      />
      <div
        ref={(el) => el && (orbsRef.current[2] = el)}
        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-primary/5 blur-[80px]"
      />
      <div
        ref={(el) => el && (orbsRef.current[3] = el)}
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-accent/8 blur-[90px]"
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
