'use client';

import { ButtonHTMLAttributes, MouseEvent, useCallback } from 'react';

import { OPEN_CONSENT_MANAGER_EVENT } from '@/lib/consent';

type ConsentManagerButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ConsentManagerButton({
  className,
  children = 'Manage Cookie Preferences',
  onClick,
  ...props
}: ConsentManagerButtonProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const cmpOpener =
        typeof window !== 'undefined' ? (window as any).openConsentManager : undefined;
      if (typeof cmpOpener === 'function') {
        cmpOpener();
        return;
      }

      window.dispatchEvent(new Event(OPEN_CONSENT_MANAGER_EVENT));
    },
    [onClick]
  );

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-haspopup="dialog"
      {...props}
    >
      {children}
    </button>
  );
}
