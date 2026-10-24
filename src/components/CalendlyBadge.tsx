'use client';

import { useEffect } from 'react';
import { calendlyUrl, campaignForPath } from '@/config/calendly';
import { usePathname } from 'next/navigation';

type CalendlyApi = {
  initBadgeWidget: (options: {
    url: string;
    text: string;
    color: string;
    textColor: string;
    branding: boolean;
  }) => void;
  initPopupWidget: (options: { url: string }) => void;
};

function getCalendly(): CalendlyApi | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { Calendly?: CalendlyApi }).Calendly;
}

/**
 * Calendly pop-up badge (floating button) on every page.
 */
export default function CalendlyBadge() {
  const pathname = usePathname() || '/';

  useEffect(() => {
    // Rebuild the badge on route change so its utm_campaign matches the page.
    document.querySelector('.calendly-badge-widget')?.remove();
    const start = Date.now();
    const timer = window.setInterval(() => {
      if (document.querySelector('.calendly-badge-widget')) {
        window.clearInterval(timer);
        return;
      }
      const calendly = getCalendly();
      if (calendly) {
        calendly.initBadgeWidget({
          url: calendlyUrl('listing-consultation', 'badge', campaignForPath(pathname)),
          text: 'Schedule with Dr. Duffy',
          color: '#6a1b4d',
          textColor: '#ffffff',
          branding: true,
        });
        window.clearInterval(timer);
        return;
      }
      if (Date.now() - start > 30000) {
        window.clearInterval(timer);
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, [pathname]);

  return null;
}

export function openCalendlyPopup(
  url: string = calendlyUrl('listing-consultation', 'popup', campaignForPath(window.location.pathname)),
): void {
  const calendly = getCalendly();
  if (calendly) {
    calendly.initPopupWidget({ url });
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}
