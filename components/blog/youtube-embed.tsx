// =============================================================================
// components/blog/youtube-embed.tsx
// Client component for MDX — Responsive YouTube video embed that uses the
// privacy-enhanced mode (youtube-nocookie.com) and lazy loads the iframe.
//
// Usage in MDX:
//   <YouTubeEmbed videoId="dQw4w9WgXcQ" title="My Video" />
// =============================================================================
"use client";

/** Props for YouTubeEmbed */
interface YouTubeEmbedProps {
  /** The YouTube video ID (the part after ?v= in the URL) */
  videoId: string;
  /** Accessible title for the iframe (defaults to 'YouTube video') */
  title?: string;
}

/**
 * YouTubeEmbed renders a responsive 16:9 YouTube iframe.
 *
 * Key features:
 * - Privacy-enhanced mode (youtube-nocookie.com prevents tracking cookies)
 * - Lazy loading to improve initial page performance
 * - Fullscreen support
 * - Responsive sizing via aspect-ratio utility
 */
export default function YouTubeEmbed({
  videoId,
  title = "YouTube video",
}: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="my-6 overflow-hidden rounded-lg shadow-md">
      <div className="relative aspect-video w-full">
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
