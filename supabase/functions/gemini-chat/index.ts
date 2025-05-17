
// Follow the instructions in the Supabase Dashboard to deploy this Edge Function
// Don't forget to set your API key as a secret: supabase secrets set GEMINI_API_KEY=your-key

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

interface Message {
  role: string;
  parts: { text: string }[];
}

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, history = [], systemPrompt = '' } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // Build the messages array for the API request
    const messages = [];
    
    // Add system prompt as first assistant message if provided
    if (systemPrompt) {
      messages.push({
        role: 'model',
        parts: [{ text: systemPrompt }]
      });
    }
    
    // Add conversation history
    if (history && history.length > 0) {
      messages.push(...history);
    }
    
    // Add the current message
    messages.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call the Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          }
        }),
      }
    );
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'Gemini API error');
    }

    // Extract the response text
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        'Sorry, I couldn\'t generate a response.';
    
    return new Response(
      JSON.stringify({ response: responseText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
