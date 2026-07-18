// =============================================================================
// components/blog/share-buttons.tsx
// Client component — Social share buttons for blog posts.
// Uses Share2, Globe, Briefcase, Link2, Check icons from lucide-react.
// Supports Twitter/X, Facebook, LinkedIn, and Copy-to-clipboard.
// =============================================================================
"use client";

import { useState, useCallback } from "react";
import { Share2, Globe, Briefcase, Link2, Check } from "lucide-react";

/** Props for ShareButtons */
interface ShareButtonsProps {
  /** The full canonical URL of the page to share */
  url: string;
  /** The title of the content being shared */
  title: string;
  /** Optional description for platforms that support it */
  description?: string;
}

/**
 * ShareButtons renders a horizontal row of social sharing icon buttons.
 *
 * - Twitter/X: opens a tweet compose window (Share2 icon)
 * - Facebook: opens the Facebook share dialog (Globe icon)
 * - LinkedIn: opens the LinkedIn share page (Briefcase icon)
 * - Copy Link: copies the URL to clipboard and briefly shows a ✓ (Link2 / Check icon)
 */
export default function ShareButtons({
  url,
  title,
  description,
}: ShareButtonsProps) {
  /** Whether the "Copied!" feedback is currently showing */
  const [copied, setCopied] = useState<boolean>(false);

  /**
   * Opens a share URL in a centered popup window.
   */
  const openShareWindow = useCallback((shareUrl: string) => {
    const width = 600;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      shareUrl,
      "share",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );
  }, []);

  /**
   * Shares on Twitter/X via intent URL.
   */
  const shareTwitter = useCallback(() => {
    const text = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    openShareWindow(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`
    );
  }, [title, url, openShareWindow]);

  /**
   * Shares on Facebook via the sharer endpoint.
   */
  const shareFacebook = useCallback(() => {
    const encodedUrl = encodeURIComponent(url);
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    );
  }, [url, openShareWindow]);

  /**
   * Shares on LinkedIn via the share URL.
   */
  const shareLinkedIn = useCallback(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description ?? "");
    openShareWindow(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`
    );
  }, [url, title, description, openShareWindow]);

  /**
   * Copies the URL to the clipboard and shows a brief "Copied!" indicator.
   */
  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: if clipboard API fails, try execCommand
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  /** Shared button class */
  const btnClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Share this article">
      {/* Twitter / X */}
      <button
        type="button"
        onClick={shareTwitter}
        className={btnClass}
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Share2 className="h-4 w-4" />
      </button>

      {/* Facebook */}
      <button
        type="button"
        onClick={shareFacebook}
        className={btnClass}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Globe className="h-4 w-4" />
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={shareLinkedIn}
        className={btnClass}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Briefcase className="h-4 w-4" />
      </button>

      {/* Copy link */}
      <button
        type="button"
        onClick={copyLink}
        className={`${btnClass} ${copied ? "border-green-500 text-green-500" : ""}`}
        aria-label={copied ? "Link copied" : "Copy link to clipboard"}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
