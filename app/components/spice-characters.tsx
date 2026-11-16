/**
 * Pepper and Honey: the married couple who guide visitors through the Spice
 * check page. Pepper is a chilli, Honey is a drop of honey. Their faces change
 * with the mood, from 0 (half asleep) to 3 (on fire).
 */

export type Mood = 0 | 1 | 2 | 3;

function Eyes({ mood, left, right, y, lashes = false }: { mood: Mood; left: number; right: number; y: number; lashes?: boolean }) {
  if (mood === 0) {
    // Sleepy: closed lids.
    return (
      <g fill="none" stroke="#2A111E" strokeWidth="4" strokeLinecap="round">
        <path d={`M${left - 9} ${y} q9 7 18 0`} />
        <path d={`M${right - 9} ${y} q9 7 18 0`} />
      </g>
    );
  }
  if (mood === 3) {
    // On fire: one eye open, one cheeky wink.
    return (
      <g>
        <circle cx={left} cy={y} r="8" fill="#2A111E" />
        <circle cx={left + 3} cy={y - 3} r="2.6" fill="#fff" />
        <path d={`M${right - 9} ${y + 2} q9 -9 18 0`} fill="none" stroke="#2A111E" strokeWidth="4" strokeLinecap="round" />
        {lashes && <path d={`M${left - 9} ${y - 8} l-5 -5 M${left} ${y - 11} l0 -6`} stroke="#2A111E" strokeWidth="3" strokeLinecap="round" />}
      </g>
    );
  }
  const r = mood === 1 ? 6.5 : 8;
  return (
    <g>
      <circle cx={left} cy={y} r={r} fill="#2A111E" />
      <circle cx={right} cy={y} r={r} fill="#2A111E" />
      <circle cx={left + 2.5} cy={y - 2.5} r="2.4" fill="#fff" />
      <circle cx={right + 2.5} cy={y - 2.5} r="2.4" fill="#fff" />
      {lashes && (
        <path d={`M${left - 8} ${y - 7} l-5 -5 M${left} ${y - 10} l0 -6 M${right + 8} ${y - 7} l5 -5 M${right} ${y - 10} l0 -6`} stroke="#2A111E" strokeWidth="3" strokeLinecap="round" />
      )}
    </g>
  );
}

function Mouth({ mood, x, y }: { mood: Mood; x: number; y: number }) {
  if (mood === 0) return <path d={`M${x - 9} ${y} h18`} stroke="#2A111E" strokeWidth="4" strokeLinecap="round" />;
  if (mood === 1) return <path d={`M${x - 11} ${y - 2} q11 9 22 0`} fill="none" stroke="#2A111E" strokeWidth="4" strokeLinecap="round" />;
  if (mood === 2) return <path d={`M${x - 15} ${y - 4} q15 20 30 0 z`} fill="#2A111E" />;
  return (
    <g>
      <path d={`M${x - 18} ${y - 6} q18 26 36 0 z`} fill="#2A111E" />
      <path d={`M${x - 8} ${y + 4} q8 7 16 0`} fill="#F3708F" />
    </g>
  );
}

export function Pepper({ mood = 1, className = "" }: { mood?: Mood; className?: string }) {
  return (
    <svg viewBox="0 0 200 250" className={className} role="img" aria-label="Pepper, a chilli pepper character">
      {mood === 3 && (
        <g className="spice-flame" fill="#FF8A3D">
          <path d="M40 120 q-22 -34 4 -62 q-2 26 16 34 q-4 -28 18 -44 q-6 34 10 52 z" opacity="0.9" />
          <path d="M150 96 q24 -22 12 -54 q-16 18 -22 8 q-2 20 -10 30 z" opacity="0.75" />
        </g>
      )}
      {/* stem */}
      <path d="M104 52 q-2 -26 22 -34" fill="none" stroke="#2F8F4E" strokeWidth="11" strokeLinecap="round" />
      <path d="M68 62 q36 -30 74 2 q-12 16 -37 14 q-25 2 -37 -16 z" fill="#3FA85F" />
      {/* body */}
      <path d="M104 62 c44 0 66 40 60 92 c-6 50 -40 82 -76 86 c-16 2 -24 -8 -14 -18 c22 -22 -14 -58 -18 -100 c-4 -34 14 -60 48 -60 z" fill="#E0263C" />
      <path d="M74 106 c-2 -18 8 -30 22 -34" fill="none" stroke="#FF7F8F" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
      {mood >= 2 && (
        <g fill="#FF9AA8" opacity="0.85">
          <ellipse cx="80" cy="150" rx="10" ry="6" />
          <ellipse cx="140" cy="146" rx="10" ry="6" />
        </g>
      )}
      <Eyes mood={mood} left={92} right={128} y={128} />
      <Mouth mood={mood} x={111} y={158} />
      {/* arms */}
      <g fill="none" stroke="#B81B30" strokeWidth="7" strokeLinecap="round">
        {mood >= 2 ? <path d="M60 150 q-22 -10 -24 -32" /> : <path d="M62 152 q-16 12 -14 30" />}
        {mood >= 2 ? <path d="M164 146 q22 -12 22 -34" /> : <path d="M164 150 q14 12 10 30" />}
      </g>
      {mood === 0 && (
        <g fill="#F6B7C9" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" className="spice-zzz">
          <text x="150" y="66" fontSize="26">z</text>
          <text x="168" y="46" fontSize="18">z</text>
        </g>
      )}
    </svg>
  );
}

export function Honey({ mood = 1, className = "" }: { mood?: Mood; className?: string }) {
  return (
    <svg viewBox="0 0 200 250" className={className} role="img" aria-label="Honey, a drop of honey character">
      {mood === 3 && (
        <g className="spice-hearts" fill="#FF5C8A">
          <path d="M28 70 c-8 -12 -24 -2 -16 12 c4 8 16 16 16 16 s12 -8 16 -16 c8 -14 -8 -24 -16 -12 z" />
          <path d="M170 44 c-5 -8 -16 -1 -11 8 c3 5 11 11 11 11 s8 -6 11 -11 c5 -9 -6 -16 -11 -8 z" />
        </g>
      )}
      {/* body */}
      <path d="M100 26 c0 0 -58 82 -58 132 c0 44 26 74 58 74 c32 0 58 -30 58 -74 c0 -50 -58 -132 -58 -132 z" fill="#F5A623" />
      <path d="M100 26 c0 0 -58 82 -58 132 c0 22 6 40 16 54 c-2 -60 22 -128 42 -186 z" fill="#FFC552" opacity="0.8" />
      <path d="M70 150 c-2 -22 8 -46 18 -62" fill="none" stroke="#FFE7A8" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
      {mood >= 1 && (
        <g fill="#FF8FA3" opacity="0.8">
          <ellipse cx="72" cy="172" rx="10" ry="6" />
          <ellipse cx="128" cy="172" rx="10" ry="6" />
        </g>
      )}
      <Eyes mood={mood} left={82} right={118} y={152} lashes />
      <Mouth mood={mood} x={100} y={182} />
      {/* arms */}
      <g fill="none" stroke="#D98A12" strokeWidth="7" strokeLinecap="round">
        {mood >= 2 ? <path d="M46 168 q-22 -8 -26 -30" /> : <path d="M46 172 q-14 12 -10 28" />}
        {mood >= 2 ? <path d="M154 168 q22 -8 26 -30" /> : <path d="M154 172 q14 12 10 28" />}
      </g>
      {mood === 0 && (
        <g fill="#F6B7C9" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" className="spice-zzz">
          <text x="142" y="70" fontSize="24">z</text>
          <text x="160" y="50" fontSize="17">z</text>
        </g>
      )}
    </svg>
  );
}

/** The two of them side by side, leaning closer as the mood rises. */
export function SpiceCouple({ mood = 1, className = "" }: { mood?: Mood; className?: string }) {
  const lean = [0, 3, 7, 11][mood];
  const gap = ["gap-6", "gap-3", "gap-0", "-space-x-4"][mood];
  return (
    <div className={`flex items-end justify-center ${gap} ${className}`}>
      <div className="spice-bob w-[46%]" style={{ rotate: `${lean}deg` }}>
        <Pepper mood={mood} className="w-full" />
      </div>
      <div className="spice-bob spice-bob-late w-[46%]" style={{ rotate: `${-lean}deg` }}>
        <Honey mood={mood} className="w-full" />
      </div>
    </div>
  );
}
