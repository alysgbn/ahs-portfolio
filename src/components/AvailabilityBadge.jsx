import React from "react";

// Static status label: no link, so no pointer cursor, hover state or arrow.
export default function AvailabilityBadge() {
  return (
    <div className="inline-flex select-none items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-black/30">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span
        style={{ "--shiny-width": "80px" }}
        className="animate-shiny-text bg-gradient-to-r from-transparent via-black/80 to-transparent bg-clip-text bg-no-repeat text-sm font-medium text-neutral-600/70 [background-position:0_0] [background-size:var(--shiny-width)_100%] dark:via-white/80 dark:text-neutral-400/70"
      >
        Available for new projects
      </span>
    </div>
  );
}
