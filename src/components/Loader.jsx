// Loader.jsx
const loaderStyles = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes bar { 0%,100%{transform:scaleY(.4)} 50%{transform:scaleY(1)} }
`;

function SpinnerIcon() {
  return (
    <div style={{
      width: 40, height: 40,
      border: "3px solid #e5e7eb",
      borderTopColor: "#534AB7",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
  );
}

function DotsIcon() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <div key={i} style={{
          width: 10, height: 10,
          borderRadius: "50%",
          background: "#534AB7",
          animation: `pulse 1.2s ease-in-out ${delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function BounceIcon() {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "flex-end", height: 36 }}>
      {[0, 0.15, 0.3].map((delay, i) => (
        <div key={i} style={{
          width: 10, height: 10,
          borderRadius: "50%",
          background: "#1D9E75",
          animation: `bounce 0.8s ease-in-out ${delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function BarsIcon() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 32 }}>
      {[0, 0.15, 0.3, 0.45].map((delay, i) => (
        <div key={i} style={{
          width: 6, height: 32,
          background: "#D85A30",
          borderRadius: 3,
          transformOrigin: "bottom",
          animation: `bar 1s ease-in-out ${delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

const variants = { spinner: SpinnerIcon, dots: DotsIcon, bounce: BounceIcon, bars: BarsIcon };

export default function Loader({
  loading = true,
  variant = "spinner",   // "spinner" | "dots" | "bounce" | "bars"
  fullPage = false,       // true = fixed overlay, false = inline
  text = "Loading...",
  subText = "",
}) {
  if (!loading) return null;

  const Icon = variants[variant] ?? SpinnerIcon;  // '??' is nullish coalescing operator to provide fallback(if left side doesn't work use right side)

  const overlayStyle = fullPage
    ? {
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(3px)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }
    : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "2rem",
      };

  return (
    <>
      <style>{loaderStyles}</style>
      <div style={overlayStyle} role="status" aria-label="Loading">
        <Icon />
        {text && (
          <p style={{ fontSize: 15, color: "#777e89", margin: 0 }}>{text}</p>
        )}
        {subText && (
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{subText}</p>
        )}
      </div>
    </>
  );
}