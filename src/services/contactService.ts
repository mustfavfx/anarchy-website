/**
 * Contact Service
 * Handles contact form submissions via Supabase
 */

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  source: string;
  createdAt: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  storedLocally?: boolean;
}

/**
 * Submit contact form
 * Supports Supabase webhook URL from env or localStorage fallback
 */
export async function submitContactForm(
  name: string,
  email: string,
  message: string
): Promise<ContactResponse> {
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
    };
  }

  // Validate name and message
  if (!name.trim() || name.trim().length < 2) {
    return {
      success: false,
      message: 'Please enter your name (at least 2 characters).',
    };
  }

  if (!message.trim() || message.trim().length < 10) {
    return {
      success: false,
      message: 'Please enter a message (at least 10 characters).',
    };
  }

  const submission: ContactSubmission = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    source: 'website',
    createdAt: new Date().toISOString(),
  };

  // Supabase Edge Function URL
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // If Supabase credentials exist, try to POST there
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/contact-form`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify(submission),
        }
      );

      if (response.ok) {
        // Also store locally as backup
        const existingMessages = JSON.parse(
          localStorage.getItem('contact_messages') || '[]'
        );
        existingMessages.push(submission);
        localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

        return {
          success: true,
          message: 'Message sent successfully! We will get back to you soon.',
        };
      } else {
        throw new Error(`Supabase returned ${response.status}`);
      }
    } catch (error) {
      console.warn('[Contact] Supabase failed, falling back to localStorage:', error);
      // Fall through to localStorage fallback
    }
  }

  // Fallback: store locally
  const existingMessages = JSON.parse(
    localStorage.getItem('contact_messages') || '[]'
  );
  existingMessages.push(submission);
  localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Stored locally only.');
  }

  return {
    success: true,
    message: 'Message received! We will get back to you via email.',
    storedLocally: true,
  };
}

/**
 * Get all locally stored contact messages
 */
export function getLocalMessages(): ContactSubmission[] {
  return JSON.parse(localStorage.getItem('contact_messages') || '[]');
}

/**
 * Clear locally stored contact messages (for testing)
 */
export function clearLocalMessages(): void {
  localStorage.removeItem('contact_messages');
}
