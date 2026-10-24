export const CALENDLY_SCRIPT_SRC =
  'https://assets.calendly.com/assets/external/widget.js';
export const CALENDLY_WIDGET_CSS =
  'https://assets.calendly.com/assets/external/widget.css';
export const CALENDLY_PRIMARY_COLOR = '6a1b4d';
export const CALENDLY_USER = 'https://calendly.com/drjanduffy';

/**
 * Booking URL with UTM tags. utm_source = bare domain so the Calendly → FUB
 * worker can attribute the booking; utm_campaign = page path ("home" for /).
 */
export function calendlyUrl(slug: string, medium = 'inline', campaign = 'site'): string {
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    primary_color: CALENDLY_PRIMARY_COLOR,
    utm_source: 'painteddesertestates.com',
    utm_medium: medium,
    utm_campaign: campaign,
  });
  return `${CALENDLY_USER}/${slug}?${params.toString()}`;
}

/** utm_campaign value for a pathname. */
export function campaignForPath(pathname: string): string {
  const path = pathname.replace(/^\/|\/$/g, '');
  return path || 'home';
}

function embedUrl(slug: string): string {
  return calendlyUrl(slug);
}

export const CALENDLY_WIDGETS = [
  {
    id: 'listing',
    slug: 'listing-consultation',
    heading: 'How do I book a Las Vegas listing consultation?',
    title: 'Listing Consultation',
    duration: '30 min',
    description:
      'Price your home to neighborhood comps and walk the listing plan — photos, launch, and net sheet.',
    url: embedUrl('listing-consultation'),
  },
  {
    id: 'strategy',
    slug: '15min',
    heading: 'What is a 15-minute Las Vegas market strategy call?',
    title: 'Free Market Strategy Call',
    duration: '15 min',
    description:
      'A short read on your neighborhood: inventory, timing, and what buyers are touring this week.',
    url: embedUrl('15min'),
  },
  {
    id: 'buyer',
    slug: 'buyer-consultation-30-min',
    heading: 'How do I book a Las Vegas buyer consultation?',
    title: 'Buyer Consultation',
    duration: '30 min',
    description:
      'Selling and buying in the same move? We map the next home before you list.',
    url: embedUrl('buyer-consultation-30-min'),
  },
] as const;

export type CalendlyWidget = (typeof CALENDLY_WIDGETS)[number];

export const CALENDLY_LISTING_URL = CALENDLY_WIDGETS[0].url;
