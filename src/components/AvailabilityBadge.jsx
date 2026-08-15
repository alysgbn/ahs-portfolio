import React from "react";

const ArrowRight = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 15 15"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
    />
  </svg>
);

export default function AvailabilityBadge() {
  return (
    <div className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-white/80 dark:border-white/10 dark:bg-black/30 dark:hover:bg-black/40">
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
      <ArrowRight className="size-3 text-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 dark:text-neutral-400" />
    </div>
  );
}
