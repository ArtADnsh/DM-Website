const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ExternalIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function TelegramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m21 3-7.2 18-4.1-7.1L3 10.6 21 3Z" />
      <path d="m9.7 13.9 4.2-3.8" />
    </svg>
  );
}

export function EmailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export function ChatIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8.5 8.5 0 1 1 21 12Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  );
}

export function CodeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" />
    </svg>
  );
}

export function MapPinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function DocumentIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v6h5" />
      <path d="M9 14h6M9 18h4" />
    </svg>
  );
}

export function VideoIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return (
    <svg {...ICON_PROPS} strokeWidth={2} {...props}>
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <svg {...ICON_PROPS} strokeWidth={2} {...props}>
      <path d="M8 5.5v13l10.5-6.5z" />
    </svg>
  );
}

export function ClassIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v12H7.5A2.5 2.5 0 0 1 5 16.5z" />
      <path d="M8 8h7M8 12h7" />
      <path d="M18 8.5h1A1.5 1.5 0 0 1 20.5 10v7.5A1.5 1.5 0 0 1 19 19h-1" />
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg {...ICON_PROPS} strokeWidth={2} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function FolderIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.5 6.5h6l2 2h9v9A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5z" />
      <path d="M3.5 9h17" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6.5 12.5 3.2 3.2 7.8-8" />
    </svg>
  );
}

export function MaterialsFolderIcon({
  backClassName,
  frontClassName,
  lineClassName,
  ...props
}) {
  return (
    <svg viewBox="0 0 32 32" {...props} aria-hidden="true">
      <path
        className={backClassName}
        d="M3.5 8.75A3.25 3.25 0 0 1 6.75 5.5h6.1c.85 0 1.67.34 2.27.94l1.88 1.88h8.25a3.25 3.25 0 0 1 3.25 3.25v1.18h-25Z"
      />

      <path
        className={frontClassName}
        d="M3.5 12.25h25v10.5A3.75 3.75 0 0 1 24.75 26.5H7.25a3.75 3.75 0 0 1-3.75-3.75Z"
      />

      <path className={lineClassName} d="M7.25 16.25h17.5" />
    </svg>
  );
}

export function SendIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ImageIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="9" cy="10" r="2" />
      <path d="m5 18 4.5-4.5 3.2 3.2 2.1-2.1L19 18" />
    </svg>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function BulletIcon({
  isActive,
  ringRadius,
  circumference,
  strokeDashoffset,
  centerDotClassName,
  ...props
}) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      {isActive ? (
        <>
          {/* Subtle hairline track ring */}
          <circle
            cx="12"
            cy="12"
            r={ringRadius}
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Crisp white countdown stroke ring */}
          <circle
            cx="12"
            cy="12"
            r={ringRadius}
            stroke="#ffffff"
            strokeWidth="1.8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
          {/* Active solid white center dot */}
          <circle cx="12" cy="12" r="3.5" fill="#ffffff" />
        </>
      ) : (
        /* Inactive bullet dot */
        <circle cx="12" cy="12" r="3" className={centerDotClassName} />
      )}
    </svg>
  );
}

export function AnnouncementIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}
