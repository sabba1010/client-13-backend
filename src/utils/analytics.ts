import { track } from '@vercel/analytics/server';
import { Request } from 'express';

/**
 * Track custom server-side events with Vercel Analytics
 * Only tracks when deployed on Vercel
 * 
 * @param eventName - Name of the event to track (e.g., "Email Sent", "API Called")
 * @param properties - Additional properties to track with the event
 * @param req - Express request object (optional, used to pass headers for better tracking)
 */
export async function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | null>,
  req?: Request
): Promise<void> {
  // Only track in production on Vercel
  if (!process.env.VERCEL) {
    return;
  }

  try {
    const options = req ? {
      headers: req.headers as Record<string, string | string[] | undefined>
    } : undefined;

    await track(eventName, properties, options);
  } catch (error) {
    // Silently fail to not disrupt the application flow
    console.error('Failed to track analytics event:', error);
  }
}
