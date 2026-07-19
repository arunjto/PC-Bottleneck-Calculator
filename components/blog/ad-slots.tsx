// =============================================================================
// components/blog/ad-slots.tsx
// Server component — Three named-export ad slot components used to embed
// Google AdSense (or similar) ad units within blog pages. Each slot only
// renders when advertising and a certified consent platform are both enabled.
// =============================================================================

/** Optional className override */
interface AdSlotProps {
  /** Additional CSS class names to apply to the wrapper */
  className?: string;
}

/**
 * Advertising remains disabled unless the deployment explicitly confirms that
 * both AdSense and the required Google-certified consent platform are ready.
 */
function isAdsEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_CONFIGURED === "true"
  );
}

// -----------------------------------------------------------------------------
// AdSlotTop — placed at the top of blog post pages, above the content.
// -----------------------------------------------------------------------------
/**
 * AdSlotTop renders an ad placeholder at the top of the page.
 * Returns null if ads are disabled.
 */
export function AdSlotTop({ className }: AdSlotProps = {}) {
  if (!isAdsEnabled()) return null;

  return (
    <div
      className={`mx-auto my-4 flex min-h-[90px] w-full max-w-4xl items-center justify-center ${className ?? ""}`}
      data-ad-slot="blog-top"
      aria-label="Advertisement"
      role="complementary"
    >
      {/* Ad script / unit will be injected by the ad provider */}
    </div>
  );
}

// -----------------------------------------------------------------------------
// AdSlotMiddle — placed in the middle of blog post content.
// -----------------------------------------------------------------------------
/**
 * AdSlotMiddle renders an ad placeholder in the middle of article content.
 * Returns null if ads are disabled.
 */
export function AdSlotMiddle({ className }: AdSlotProps = {}) {
  if (!isAdsEnabled()) return null;

  return (
    <div
      className={`mx-auto my-8 flex min-h-[250px] w-full max-w-3xl items-center justify-center rounded-lg border border-border/50 bg-muted/30 ${className ?? ""}`}
      data-ad-slot="blog-middle"
      aria-label="Advertisement"
      role="complementary"
    >
      {/* Ad script / unit will be injected by the ad provider */}
    </div>
  );
}

// -----------------------------------------------------------------------------
// AdSlotBottom — placed at the bottom of blog post pages, below the content.
// -----------------------------------------------------------------------------
/**
 * AdSlotBottom renders an ad placeholder at the bottom of the page.
 * Returns null if ads are disabled.
 */
export function AdSlotBottom({ className }: AdSlotProps = {}) {
  if (!isAdsEnabled()) return null;

  return (
    <div
      className={`mx-auto my-4 flex min-h-[90px] w-full max-w-4xl items-center justify-center ${className ?? ""}`}
      data-ad-slot="blog-bottom"
      aria-label="Advertisement"
      role="complementary"
    >
      {/* Ad script / unit will be injected by the ad provider */}
    </div>
  );
}
