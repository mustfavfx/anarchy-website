import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Contact form submission
export async function submitToSupabase(data: {
  name: string;
  email: string;
  message: string;
  source: string;
}) {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        message: data.message,
        source: data.source,
        created_at: new Date().toISOString(),
      }]);

    if (error) throw error;
    return { success: true, message: 'Message sent successfully!' };
  } catch (err) {
    console.error('Supabase error:', err);
    return { success: false, message: 'Failed to send message. Please try again.' };
  }
}

// Email notification via Supabase Edge Function
export async function sendEmailNotification(data: {
  to: string;
  subject: string;
  body: string;
}) {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: data,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Email error:', err);
    return { success: false };
  }
}
