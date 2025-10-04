import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, jobDescription } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!resumeText || !jobDescription) {
      return new Response(
        JSON.stringify({ error: "Missing resumeText or jobDescription" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert resume analyzer and ATS (Applicant Tracking System) specialist. 
Analyze the provided resume against the job description and provide:
1. A match score from 0-100
2. Key insights about alignment
3. Missing keywords that should be added
4. Skills to emphasize

Return your analysis in the following JSON structure:
{
  "match_score": <number 0-100>,
  "insights": {
    "strengths": ["list of matching strengths"],
    "weaknesses": ["list of gaps or misalignments"],
    "recommendations": ["actionable suggestions"]
  },
  "missing_keywords": ["list of important keywords from JD not in resume"]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nPlease analyze and provide the scoring in the specified JSON format.`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_resume_match",
              description: "Analyze how well a resume matches a job description",
              parameters: {
                type: "object",
                properties: {
                  match_score: {
                    type: "number",
                    minimum: 0,
                    maximum: 100,
                    description: "Overall match score from 0-100"
                  },
                  insights: {
                    type: "object",
                    properties: {
                      strengths: {
                        type: "array",
                        items: { type: "string" },
                        description: "Key strengths and matching points"
                      },
                      weaknesses: {
                        type: "array",
                        items: { type: "string" },
                        description: "Gaps or areas of misalignment"
                      },
                      recommendations: {
                        type: "array",
                        items: { type: "string" },
                        description: "Actionable recommendations"
                      }
                    },
                    required: ["strengths", "weaknesses", "recommendations"]
                  },
                  missing_keywords: {
                    type: "array",
                    items: { type: "string" },
                    description: "Important keywords from JD missing in resume"
                  }
                },
                required: ["match_score", "insights", "missing_keywords"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_resume_match" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data));

    // Extract the function call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall && toolCall.function) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error("No valid tool call in response");

  } catch (error) {
    console.error("Error in score-resume function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});