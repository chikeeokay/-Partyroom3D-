/**
 * GA4 Event Tracking Utility for 池記桌遊
 * Measurement ID: G-7T249LNTST
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackGAEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
}

// Pre-defined conversion events
export function trackWhatsAppClick(location: string, label: string = 'WhatsApp預約諮詢') {
  trackGAEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: label,
    button_location: location,
  });
}

export function trackEventRegistrationClick(eventTitle: string) {
  trackGAEvent('event_register_click', {
    event_category: 'conversion',
    event_label: eventTitle,
  });
}

export function trackMapClick() {
  trackGAEvent('google_maps_click', {
    event_category: 'engagement',
    event_label: '查看荔枝角場地Google地圖',
  });
}
