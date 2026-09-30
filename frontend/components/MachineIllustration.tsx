"use client";

type Props = {
  code: string;
  name: string;
};

export default function MachineIllustration({ code, name }: Props) {
  const id = code.replace(/[^a-zA-Z0-9]/g, "");

  const metal = `url(#metal-${id})`;
  const dark = "#667789";
  const edge = "#8d9bab";
  const accent = "#4b78a8";
  const pipe = "#8fa0af";
  const bottle = "#926b3f";

  const artwork = (() => {
    switch (code) {
      case "RM-01":
        return (
          <>
            <path d="M23 18h31l-5 42H28z" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M29 60h20l-8 16h-4z" fill={metal} stroke={edge} strokeWidth="2" />
            <rect x="66" y="23" width="28" height="38" rx="5" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M70 61h20l-7 15h-6z" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M54 38h12" stroke={pipe} strokeWidth="5" strokeLinecap="round" />
            <path d="M35 14h8M75 18h10" stroke={dark} strokeWidth="4" strokeLinecap="round" />
          </>
        );
      case "MX-01":
        return (
          <>
            <rect x="38" y="12" width="44" height="12" rx="5" fill={dark} />
            <path d="M34 25h52v40c0 10-8 18-18 18H52c-10 0-18-8-18-18z" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M60 24v42" stroke={dark} strokeWidth="4" />
            <path d="M49 50h22M53 59h14" stroke={accent} strokeWidth="4" strokeLinecap="round" />
            <path d="M41 82v5M79 82v5" stroke={dark} strokeWidth="4" />
          </>
        );
      case "BK-01":
        return (
          <>
            <path d="M35 25c2-11 12-17 25-17s23 6 25 17" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M30 25h60v39c0 12-9 21-21 21H51c-12 0-21-9-21-21z" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M43 84c4-9 10-14 17-14s13 5 17 14" fill="#f0a34a" opacity=".85" />
            <path d="M49 84c3-6 7-10 11-10s8 4 11 10" fill="#ef6a3d" />
            <path d="M91 37h9v24H90" fill="none" stroke={pipe} strokeWidth="5" strokeLinecap="round" />
          </>
        );
      case "PM-02":
        return (
          <>
            <rect x="66" y="34" width="35" height="28" rx="6" fill={metal} stroke={edge} strokeWidth="2" />
            <circle cx="47" cy="49" r="22" fill={metal} stroke={edge} strokeWidth="2" />
            <circle cx="47" cy="49" r="10" fill={accent} opacity=".9" />
            <path d="M22 49H10M47 27V17M47 71v10" stroke={pipe} strokeWidth="6" strokeLinecap="round" />
            <path d="M68 49H58" stroke={dark} strokeWidth="6" />
            <path d="M72 64v9M95 64v9" stroke={dark} strokeWidth="4" />
          </>
        );
      case "HX-01":
        return (
          <>
            <rect x="28" y="16" width="64" height="58" rx="7" fill="#dfe6eb" stroke={edge} strokeWidth="2" />
            {[24, 32, 40, 48, 56, 64].map((y) => (
              <path key={y} d={`M34 ${y}h52`} stroke={y % 16 === 0 ? accent : "#9aa9b8"} strokeWidth="4" strokeLinecap="round" />
            ))}
            <circle cx="22" cy="29" r="6" fill={dark} />
            <circle cx="98" cy="61" r="6" fill={dark} />
            <path d="M22 29H8M98 61h14" stroke={pipe} strokeWidth="5" strokeLinecap="round" />
            <path d="M38 75v10M82 75v10" stroke={dark} strokeWidth="4" />
          </>
        );
      case "FV-04":
        return (
          <>
            <ellipse cx="60" cy="17" rx="25" ry="10" fill={metal} stroke={edge} strokeWidth="2" />
            <rect x="35" y="17" width="50" height="46" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M35 63h50L65 82H55z" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M46 28h28" stroke="#ffffff" strokeWidth="3" opacity=".75" />
            <path d="M42 80v8M78 80v8" stroke={dark} strokeWidth="4" />
            <path d="M60 7V2M85 33h12" stroke={pipe} strokeWidth="5" strokeLinecap="round" />
          </>
        );
      case "GC-01":
        return (
          <>
            <rect x="23" y="16" width="74" height="61" rx="8" fill={metal} stroke={edge} strokeWidth="2" />
            <circle cx="49" cy="46" r="18" fill="#c7d3dc" stroke={dark} strokeWidth="3" />
            <path d="M49 29c6 7 7 12 3 17M65 47c-8 4-13 3-17-1M48 63c-4-8-3-13 1-17M32 45c8-4 13-3 17 1" stroke={accent} strokeWidth="4" strokeLinecap="round" />
            <rect x="72" y="28" width="15" height="7" rx="2" fill={dark} />
            <rect x="72" y="41" width="15" height="7" rx="2" fill={dark} />
            <path d="M31 78v8M89 78v8" stroke={dark} strokeWidth="4" />
          </>
        );
      case "CIP-01":
        return (
          <>
            <rect x="18" y="65" width="84" height="8" rx="4" fill={dark} />
            <path d="M25 27h28v35H25zM67 27h28v35H67z" fill={metal} stroke={edge} strokeWidth="2" />
            <ellipse cx="39" cy="27" rx="14" ry="6" fill={metal} stroke={edge} strokeWidth="2" />
            <ellipse cx="81" cy="27" rx="14" ry="6" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M39 21v-9h42v9M53 45h14" fill="none" stroke={pipe} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="60" cy="45" r="5" fill={accent} />
            <path d="M28 73v10M92 73v10" stroke={dark} strokeWidth="4" />
          </>
        );
      case "FLT-01":
        return (
          <>
            {[28, 60].map((x) => (
              <g key={x}>
                <rect x={x} y="22" width="28" height="49" rx="12" fill={metal} stroke={edge} strokeWidth="2" />
                <path d={`M${x + 5} 34h18M${x + 5} 57h18`} stroke={accent} strokeWidth="3" strokeLinecap="round" opacity=".8" />
              </g>
            ))}
            <path d="M42 22V12h32v10M42 71v10h32V71" fill="none" stroke={pipe} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="74" cy="12" r="5" fill={dark} />
          </>
        );
      case "FL-01":
        return (
          <>
            <rect x="20" y="18" width="80" height="18" rx="6" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M31 36v24M47 36v24M63 36v24M79 36v24M95 36v24" stroke={dark} strokeWidth="4" strokeLinecap="round" />
            {[31, 47, 63, 79, 95].map((x) => (
              <path key={x} d={`M${x - 4} 61h8l3 17h-14z`} fill="#a67845" stroke="#6c4c2c" strokeWidth="1.5" />
            ))}
            <path d="M14 79h92" stroke={dark} strokeWidth="6" strokeLinecap="round" />
            <circle cx="29" cy="84" r="4" fill={edge} />
            <circle cx="91" cy="84" r="4" fill={edge} />
          </>
        );
      case "CP-01":
        return (
          <>
            <rect x="30" y="15" width="60" height="18" rx="7" fill={metal} stroke={edge} strokeWidth="2" />
            <path d="M60 33v21" stroke={dark} strokeWidth="7" strokeLinecap="round" />
            <path d="M51 53h18l-3 11H54z" fill={accent} />
            <path d="M54 65h12l4 17H50z" fill={bottle} stroke="#6c4c2c" strokeWidth="2" />
            <path d="M18 82h84" stroke={dark} strokeWidth="6" strokeLinecap="round" />
            <path d="M33 33v31M87 33v31" stroke={pipe} strokeWidth="4" />
          </>
        );
      case "CV-01":
        return (
          <>
            <path d="M13 61h94" stroke={dark} strokeWidth="9" strokeLinecap="round" />
            {[21, 37, 53, 69, 85, 101].map((x) => <circle key={x} cx={x} cy="66" r="4" fill="#aab4bf" />)}
            {[30, 54, 78].map((x) => (
              <g key={x}>
                <path d={`M${x - 5} 34h10l4 22h-18z`} fill={bottle} stroke="#6c4c2c" strokeWidth="1.5" />
                <rect x={x - 4} y="28" width="8" height="8" rx="2" fill="#4f667c" />
              </g>
            ))}
            <path d="M22 72v11M98 72v11" stroke={dark} strokeWidth="4" />
          </>
        );
      case "AC-01":
        return (
          <>
            <rect x="20" y="43" width="74" height="30" rx="15" fill={metal} stroke={edge} strokeWidth="2" />
            <rect x="31" y="23" width="31" height="24" rx="5" fill={dark} />
            <path d="M67 27h20l7 16H67z" fill={accent} opacity=".9" />
            <circle cx="42" cy="72" r="8" fill="#4f5e6d" />
            <circle cx="82" cy="72" r="8" fill="#4f5e6d" />
            <path d="M92 38v-9h10" fill="none" stroke={pipe} strokeWidth="5" strokeLinecap="round" />
            <circle cx="102" cy="25" r="5" fill="#dfe7ee" stroke={dark} strokeWidth="2" />
          </>
        );
      case "PKG-01":
        return (
          <>
            <rect x="70" y="62" width="33" height="22" rx="3" fill="#c79a61" stroke="#8d663b" strokeWidth="2" />
            <circle cx="31" cy="72" r="10" fill={dark} />
            <path d="M31 62L44 42l17 9 11-21" fill="none" stroke={metal === "" ? edge : "#9eabb7"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="44" cy="42" r="7" fill={accent} />
            <circle cx="61" cy="51" r="7" fill={accent} />
            <path d="M72 30l12-8 8 8-10 11" fill="none" stroke={dark} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 84h96" stroke={dark} strokeWidth="5" strokeLinecap="round" opacity=".8" />
          </>
        );
      default:
        return (
          <>
            <rect x="24" y="20" width="72" height="58" rx="12" fill={metal} stroke={edge} strokeWidth="2" />
            <circle cx="60" cy="49" r="14" fill={accent} opacity=".75" />
          </>
        );
    }
  })();

  return (
    <svg
      className="machine-illustration"
      viewBox="0 0 120 90"
      role="img"
      aria-label={name}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{name}</title>
      <defs>
        <linearGradient id={`metal-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6f8fa" />
          <stop offset="48%" stopColor="#d3dce4" />
          <stop offset="100%" stopColor="#aebbc7" />
        </linearGradient>
      </defs>
      {artwork}
    </svg>
  );
}
