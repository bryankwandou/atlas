interface Props {
  className?: string;
  size?: number;
}

export function OrbitalRings({ className = "", size = 680 }: Props) {
  return (
    <svg
      className={`orbital-rings ${className}`}
      viewBox="0 0 800 800"
      fill="none"
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: "none",
        opacity: 0.35,
      }}
    >
      <g className="orbit-spin">
        <circle cx="400" cy="400" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="400" cy="400" r="260" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="340" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="400" cy="400" r="390" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="585" cy="215" r="4" fill="var(--color-accent)" />
        <circle cx="740" cy="400" r="3.5" fill="currentColor" />
        <circle cx="215" cy="585" r="3" fill="var(--color-accent)" />
        <circle cx="400" cy="140" r="2.5" fill="currentColor" />
      </g>
    </svg>
  );
}
