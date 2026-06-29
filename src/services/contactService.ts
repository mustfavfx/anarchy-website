/**
 * Contact Service
 * Handles contact form submissions via EmailJS
 * Sends emails directly to anarchy.lat@gmail.com
 */

import emailjs from '@emailjs/browser';

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

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_lq3e769';
const EMAILJS_TEMPLATE_ID = 'template_1eta83h';
const EMAILJS_PUBLIC_KEY = 'XFWWLNuDKLiB9cf5c';

/**
 * Submit contact form
 * Sends email via EmailJS (works immediately)
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

  // Send via EmailJS
  try {
    const templateParams = {
      from_name: submission.name,
      from_email: submission.email,
      message: submission.message,
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    // Store locally as backup
    const existingMessages = JSON.parse(
      localStorage.getItem('contact_messages') || '[]'
    );
    existingMessages.push(submission);
    localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

    return {
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
    };
  } catch (error) {
    console.error('[Contact] EmailJS failed:', error);
    
    // Show actual error to user
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMsg);
    
    // Store locally
    const existingMessages = JSON.parse(
      localStorage.getItem('contact_messages') || '[]'
    );
    existingMessages.push(submission);
    localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

    return {
      success: false,
      message: `Email failed: ${errorMsg}. Please email us directly at anarchy.lat@gmail.com`,
      storedLocally: true,
    };
  }
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
