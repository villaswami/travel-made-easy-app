
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    // Get the messages from the request body
    const { messages, prompt } = await request.json();
    
    // Extract just the text content for the messages
    const history = messages.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Last user message
    const userMessage = history[history.length - 1].parts[0].text;
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('gemini-chat', {
      body: {
        message: userMessage,
        history: history.slice(0, -1), // All messages except the last one
        systemPrompt: prompt
      }
    });
    
    if (error) {
      console.error('Supabase function error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to process request' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      response: data.response 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error('Error processing request:', e);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
