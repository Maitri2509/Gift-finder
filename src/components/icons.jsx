export function GiftIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="9" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 9v11M4 13.5h16" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 9c0-2.2 1.4-3.7 3.5-3.7S15.5 6.8 15.5 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 9c1.2 0 2.4-.6 3.5-1.6C13.1 8.4 14.3 9 15.5 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FeatureIcon({ type }) {
  if (type === 'heart') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (type === 'people') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="8" r="2.4" fill="currentColor" />
        <circle cx="15.5" cy="8.5" r="2" fill="currentColor" />
        <path
          d="M3.8 18.2c.6-2.6 2.7-4 5.2-4s4.6 1.4 5.2 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M14.2 14.5c1.5.2 2.9 1.1 3.5 3.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.8 12.2 12 4l8.2 8.2-8.2 8.2L3.8 12.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9.2" cy="9.4" r="1.35" fill="currentColor" />
    </svg>
  )
}
