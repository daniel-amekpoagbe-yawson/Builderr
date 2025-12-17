


export default function Divider({ flip = false }) {
  return (
    <div className={`overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="w-full h-[180px]"
      >
        <path
          d="
            M0,0
            H1440
            V120
            C1380,110 1320,130 1260,120
            C1180,100 1120,150 1040,135
            C960,120 900,90 820,110
            C760,125 740,40 700,35
            C660,40 640,130 580,115
            C520,100 480,140 420,125
            C360,110 300,140 240,125
            C160,105 100,135 40,120
            L0,120
            Z
          "
          fill="var(--bg)"
        />
      </svg>
    </div>
  );
}
