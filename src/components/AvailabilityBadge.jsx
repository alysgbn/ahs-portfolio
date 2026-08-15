import React from "react";

const ChevronRight = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function AvailabilityBadge() {
  return (
    <div className="group relative inline-flex items-center justify-center rounded-full bg-white/70 px-4 py-1.5 shadow-[inset_0_-8px_10px_#f321701f] backdrop-blur-sm transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#f321703f]">
      <span
        className="animate-gradient pointer-events-none absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#f32170]/60 via-[#ff6b08]/60 to-[#cf23cf]/60 bg-[length:300%_100%] p-[1px]"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
        }}
      />
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <hr className="mx-2 h-4 w-px shrink-0 border-0 bg-neutral-400" />
      <span className="animate-gradient bg-gradient-to-r from-[#f32170] via-[#ff6b08] to-[#cf23cf] bg-[length:300%_100%] bg-clip-text text-sm font-medium text-transparent">
        Available for new projects
      </span>
      <ChevronRight className="ml-1 h-4 w-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>
  );
}
