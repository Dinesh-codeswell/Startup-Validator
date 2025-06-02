
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, query, context } = await req.json();
    const perplexityApiKey = "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";

    let prompt = "";
    
    if (action === "startup_news") {
      prompt = `Get the latest startup news, funding announcements, and tech industry trends from the past week. Focus on significant funding rounds, new product launches, and market insights. Format as JSON with: title, summary, date, source, category.`;
    } else if (action === "trending_ideas") {
      prompt = `Generate 5 trending startup ideas for 2024 based on current market trends, emerging technologies, and consumer behavior changes. Include: title, description, target_market, potential_challenges, estimated_market_size.`;
    } else if (action === "ai_suggestions") {
      prompt = `Based on this startup idea: "${query}", provide specific AI-powered suggestions for: market validation strategies, MVP features, potential competitors, revenue models, and growth tactics. Be specific and actionable.`;
    } else {
      prompt = query || "Get general startup and entrepreneurship insights";
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert startup advisor and market analyst. Provide detailed, actionable insights based on current market data and trends.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        return_citations: true,
        search_domain_filter: ["techcrunch.com", "venturebeat.com", "crunchbase.com", "forbes.com", "bloomberg.com"]
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        success: true,
        content: data.choices[0].message.content,
        citations: data.citations || [],
        action: action
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
