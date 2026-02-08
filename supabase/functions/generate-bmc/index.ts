import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')!
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 인증 확인
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! }
        }
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: '로그인이 필요합니다.' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 요청 데이터 파싱
    const body = await req.json()
    const { title, cs, vp, ...optionalInputs } = body

    // 필수 항목 검증
    if (!cs || !vp) {
      return new Response(
        JSON.stringify({ error: '필수 항목(고객, 가치 제안)을 입력해주세요.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 프롬프트 구성
    const prompt = `
Role: You are an expert Business Model Consultant with deep knowledge of the Business Model Canvas framework.

Task: Create a comprehensive Business Model Canvas (BMC) based on the user's input.

User Provided Inputs:
- Project Title: ${title || '(미입력)'}
- Customer Segments (CS): ${cs}
- Value Proposition (VP): ${vp}
${Object.entries(optionalInputs)
  .filter(([_, v]) => v)
  .map(([k, v]) => `- ${k.toUpperCase()}: ${v}`)
  .join('\n')}

Instructions:
1. Analyze the user's input thoroughly and fill out ALL 9 blocks of the BMC.
2. For blocks where the user provided input, add ADDITIONAL professional insights, specific examples, and actionable recommendations that complement their input. Do NOT simply repeat what they wrote.
3. For blocks without user input, infer logical and relevant content based on the provided customer segments and value proposition.
4. Return ONLY a valid JSON object with exactly these keys: "kp", "ka", "kr", "vp", "cr", "ch", "cs", "cost", "rev"
5. Each value must be an HTML string using <ul><li> format for better readability.
6. Language: Write everything in Korean (한국어).
7. Be specific, actionable, and business-focused. Avoid generic or vague statements.
8. Include relevant industry examples or benchmarks where appropriate.

Expected Output Format:
{
  "kp": "<ul><li>파트너 1</li><li>파트너 2</li></ul>",
  "ka": "<ul><li>활동 1</li><li>활동 2</li></ul>",
  "kr": "<ul><li>자원 1</li><li>자원 2</li></ul>",
  "vp": "<ul><li>가치 1</li><li>가치 2</li></ul>",
  "cr": "<ul><li>관계 1</li><li>관계 2</li></ul>",
  "ch": "<ul><li>채널 1</li><li>채널 2</li></ul>",
  "cs": "<ul><li>고객 1</li><li>고객 2</li></ul>",
  "cost": "<ul><li>비용 1</li><li>비용 2</li></ul>",
  "rev": "<ul><li>수익 1</li><li>수익 2</li></ul>"
}
`

    // Gemini API 호출
    const geminiResponse = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      })
    })

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API Error:', errorText)
      throw new Error(`Gemini API error: ${geminiResponse.status}`)
    }

    const geminiData = await geminiResponse.json()

    // 응답 텍스트 추출
    const textResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!textResponse) {
      throw new Error('Gemini API returned empty response')
    }

    // JSON 파싱 (마크다운 코드 블록 제거)
    const cleanJson = textResponse
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .trim()

    let bmcData
    try {
      bmcData = JSON.parse(cleanJson)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Raw response:', textResponse)
      throw new Error('Failed to parse AI response as JSON')
    }

    // 필수 키 검증
    const requiredKeys = ['kp', 'ka', 'kr', 'vp', 'cr', 'ch', 'cs', 'cost', 'rev']
    for (const key of requiredKeys) {
      if (!(key in bmcData)) {
        bmcData[key] = '<ul><li>-</li></ul>'
      }
    }

    return new Response(
      JSON.stringify(bmcData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Generate BMC Error:', error)

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'BMC 생성 중 오류가 발생했습니다.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
