type Props = {
  className?: string;
  /** Color de la marca de sabor sobre la masa */
  marca?: string;
};

/** Empanada ilustrada en SVG, con repulgue y marca de sabor. */
export default function EmpanadaIcon({ className, marca = "#b5532f" }: Props) {
  const pliegues = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 220 140" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="masa" cx="45%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#f6d9a0" />
          <stop offset="55%" stopColor="#e3b26a" />
          <stop offset="100%" stopColor="#b97a35" />
        </radialGradient>
        <linearGradient id="repulgue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1c98a" />
          <stop offset="100%" stopColor="#a8682b" />
        </linearGradient>
      </defs>

      {/* sombra */}
      <ellipse cx="110" cy="128" rx="88" ry="8" fill="#1d1a16" opacity="0.12" />

      {/* cuerpo */}
      <path
        d="M14 112 C 14 50, 70 18, 110 18 C 150 18, 206 50, 206 112 Z"
        fill="url(#masa)"
      />

      {/* repulgue */}
      {pliegues.map((i) => {
        const t = i / (pliegues.length - 1);
        const angle = Math.PI - t * Math.PI;
        const cx = 110 + Math.cos(angle) * 92;
        const cy = 112 - Math.sin(angle) * 88;
        const rot = (angle * 180) / Math.PI - 90;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="11"
            ry="7"
            fill="url(#repulgue)"
            stroke="#9a5d25"
            strokeOpacity="0.35"
            transform={`rotate(${-rot} ${cx} ${cy})`}
          />
        );
      })}

      {/* base */}
      <path d="M14 112 L 206 112" stroke="#9a5d25" strokeOpacity="0.4" strokeWidth="2" />

      {/* brillo */}
      <path
        d="M60 70 C 75 48, 100 40, 120 40"
        stroke="#fff6e0"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* marca de sabor */}
      <circle cx="110" cy="82" r="7" fill={marca} opacity="0.9" />
      <circle cx="96" cy="88" r="3" fill={marca} opacity="0.6" />
      <circle cx="124" cy="88" r="3" fill={marca} opacity="0.6" />
    </svg>
  );
}
