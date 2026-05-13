/**
 * Waitlist Service
 * Handles email submission for early access requests
 */

export interface WaitlistSubmission {
  email: string;
  source: string;
  createdAt: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  storedLocally?: boolean;
}

/**
 * Submit email to waitlist
 * Supports webhook URL from env or localStorage fallback
 */
export async function submitWaitlistEmail(email: string): Promise<WaitlistResponse> {
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
    };
  }

  // Check for duplicates in localStorage
  const existingEmails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
  if (existingEmails.some((entry: WaitlistSubmission) => entry.email.toLowerCase() === email.toLowerCase())) {
    return {
      success: false,
      message: 'This email is already on the waitlist.',
    };
  }

  const submission: WaitlistSubmission = {
    email,
    source: 'website',
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = import.meta.env.VITE_WAITLIST_WEBHOOK_URL;

  // If webhook URL exists, try to POST there
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        // Also store locally as backup
        existingEmails.push(submission);
        localStorage.setItem('waitlist_emails', JSON.stringify(existingEmails));
        
        return {
          success: true,
          message: 'You\'re on the list! We\'ll notify you when early access is available.',
        };
      } else {
        throw new Error(`Webhook returned ${response.status}`);
      }
    } catch (error) {
      console.warn('[Waitlist] Webhook failed, falling back to localStorage:', error);
      // Fall through to localStorage fallback
    }
  }

  // Fallback: store locally
  existingEmails.push(submission);
  localStorage.setItem('waitlist_emails', JSON.stringify(existingEmails));

  if (!webhookUrl) {
    console.warn('WAITLIST_WEBHOOK_URL missing. Stored locally only.');
  }

  return {
    success: true,
    message: 'You\'re on the list! We\'ll notify you when early access is available.',
    storedLocally: true,
  };
}

/**
 * Get all locally stored waitlist emails
 */
export function getLocalWaitlist(): WaitlistSubmission[] {
  return JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
}

/**
 * Clear locally stored waitlist (for testing)
 */
export function clearLocalWaitlist(): void {
  localStorage.removeItem('waitlist_emails');
}
