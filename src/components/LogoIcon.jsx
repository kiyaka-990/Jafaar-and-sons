export default function LogoIcon({ size = 38 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#B8922A',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.68}
        height={size * 0.68}
        viewBox="0 0 26 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left tower */}
        <rect x="1" y="10" width="7" height="13" fill="#09192E" />
        {/* Centre tower (tallest) */}
        <rect x="7" y="5" width="8" height="18" fill="#09192E" />
        {/* Right tower */}
        <rect x="14" y="8" width="7" height="15" fill="#09192E" />
        {/* Ground line */}
        <rect x="0" y="22" width="22" height="2" fill="#09192E" />
        {/* Gold windows */}
        <rect x="3"  y="13" width="2" height="2" fill="#D4AA45" />
        <rect x="9"  y="8"  width="2" height="2" fill="#D4AA45" />
        <rect x="9"  y="13" width="2" height="2" fill="#D4AA45" />
        <rect x="12" y="8"  width="2" height="2" fill="#D4AA45" />
        <rect x="12" y="13" width="2" height="2" fill="#D4AA45" />
        <rect x="16" y="11" width="2" height="2" fill="#D4AA45" />
      </svg>
    </div>
  )
}
