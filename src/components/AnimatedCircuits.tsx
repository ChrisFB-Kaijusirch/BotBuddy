const AnimatedCircuits = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circuit Pattern SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal Circuit Lines */}
        <g className="animate-circuit-pulse">
          <path
            d="M100 200 L300 200 L320 180 L340 200 L500 200"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            className="animate-circuit-flow-1"
          />
          <circle cx="320" cy="180" r="4" fill="hsl(var(--primary))" className="animate-pulse" />
          <rect x="490" y="195" width="20" height="10" fill="hsl(var(--primary))" />
        </g>

        <g className="animate-circuit-pulse delay-1000">
          <path
            d="M700 300 L900 300 L920 280 L940 300 L1100 300"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            className="animate-circuit-flow-2"
          />
          <circle cx="920" cy="280" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-500" />
          <rect x="1090" y="295" width="20" height="10" fill="hsl(var(--primary))" />
        </g>

        {/* Vertical Circuit Lines */}
        <g className="animate-circuit-pulse delay-2000">
          <path
            d="M200 100 L200 300 L180 320 L200 340 L200 500"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            className="animate-circuit-flow-3"
          />
          <circle cx="180" cy="320" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-1000" />
          <rect x="195" y="490" width="10" height="20" fill="hsl(var(--primary))" />
        </g>

        <g className="animate-circuit-pulse delay-3000">
          <path
            d="M800 150 L800 350 L780 370 L800 390 L800 550"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            className="animate-circuit-flow-4"
          />
          <circle cx="780" cy="370" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-1500" />
          <rect x="795" y="540" width="10" height="20" fill="hsl(var(--primary))" />
        </g>

        {/* Diagonal Circuit Lines */}
        <g className="animate-circuit-pulse delay-1500">
          <path
            d="M50 50 L200 200 L220 180 L240 200 L350 350"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            className="animate-circuit-flow-5"
          />
          <circle cx="220" cy="180" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-750" />
        </g>

        <g className="animate-circuit-pulse delay-2500">
          <path
            d="M950 100 L800 250 L780 230 L760 250 L650 350"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            className="animate-circuit-flow-6"
          />
          <circle cx="780" cy="230" r="4" fill="hsl(var(--primary))" className="animate-pulse delay-1250" />
        </g>

        {/* Circuit Nodes */}
        <g className="animate-pulse">
          <circle cx="100" cy="200" r="6" fill="hsl(var(--primary))" className="animate-glow" />
          <circle cx="700" cy="300" r="6" fill="hsl(var(--primary))" className="animate-glow delay-500" />
          <circle cx="200" cy="100" r="6" fill="hsl(var(--primary))" className="animate-glow delay-1000" />
          <circle cx="800" cy="150" r="6" fill="hsl(var(--primary))" className="animate-glow delay-1500" />
        </g>

        {/* Flowing Particles */}
        <g className="animate-flow-particles">
          <circle cx="0" cy="200" r="3" fill="hsl(var(--accent))" className="animate-particle-flow-1" />
          <circle cx="0" cy="300" r="3" fill="hsl(var(--accent))" className="animate-particle-flow-2" />
          <circle cx="200" cy="0" r="3" fill="hsl(var(--accent))" className="animate-particle-flow-3" />
          <circle cx="800" cy="0" r="3" fill="hsl(var(--accent))" className="animate-particle-flow-4" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedCircuits;