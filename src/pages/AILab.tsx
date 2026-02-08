import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '@/hooks/useProjects'
import { courseData, OPTIONAL_BLOCK_OPTIONS } from '@/data/courseData'
import BMCCanvas from '@/components/bmc/BMCCanvas'
import { Sparkles, Plus, X, Save } from 'lucide-react'
import type { GenerateBMCResponse } from '@/lib/types'

interface DynamicInput {
  id: string
  type: string
  label: string
  value: string
}

export default function AILab() {
  const { aiLab } = courseData
  const navigate = useNavigate()
  const { loading, error, generateBMC, saveProject } = useProjects()

  const [title, setTitle] = useState('')
  const [cs, setCs] = useState('')
  const [vp, setVp] = useState('')
  const [dynamicInputs, setDynamicInputs] = useState<DynamicInput[]>([])
  const [selectedOptional, setSelectedOptional] = useState('ch')
  const [result, setResult] = useState<GenerateBMCResponse | null>(null)
  const [saving, setSaving] = useState(false)

  const addDynamicInput = () => {
    const option = OPTIONAL_BLOCK_OPTIONS.find((o) => o.value === selectedOptional)
    if (!option) return

    // 중복 체크
    if (dynamicInputs.some((d) => d.type === selectedOptional)) {
      alert('이미 추가된 항목입니다.')
      return
    }

    setDynamicInputs([
      ...dynamicInputs,
      {
        id: Math.random().toString(36).substr(2, 9),
        type: option.value,
        label: option.label,
        value: ''
      }
    ])
  }

  const removeDynamicInput = (id: string) => {
    setDynamicInputs(dynamicInputs.filter((d) => d.id !== id))
  }

  const updateDynamicInput = (id: string, value: string) => {
    setDynamicInputs(
      dynamicInputs.map((d) => (d.id === id ? { ...d, value } : d))
    )
  }

  const handleGenerate = async () => {
    if (!cs.trim() || !vp.trim()) {
      alert('필수 항목(고객, 가치 제안)을 입력해주세요.')
      return
    }

    try {
      const input: Record<string, string> = {
        title: title.trim(),
        cs: cs.trim(),
        vp: vp.trim()
      }

      dynamicInputs.forEach((d) => {
        if (d.value.trim()) {
          input[d.type] = d.value.trim()
        }
      })

      const data = await generateBMC(input)
      setResult(data)
    } catch (err) {
      console.error('Generate error:', err)
    }
  }

  const handleSave = async () => {
    if (!result) return

    setSaving(true)
    try {
      const userInputs: Record<string, string> = {
        cs,
        vp
      }
      dynamicInputs.forEach((d) => {
        if (d.value.trim()) {
          userInputs[d.type] = d.value.trim()
        }
      })

      const projectId = await saveProject(
        title || '새 프로젝트',
        userInputs,
        result
      )

      alert('프로젝트가 저장되었습니다!')
      navigate(`/projects/${projectId}`)
    } catch (err) {
      alert('저장 실패: ' + (err instanceof Error ? err.message : '오류'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 flex justify-center items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          {aiLab.title}
        </h1>
        <p
          className="text-slate-600 max-w-2xl mx-auto"
          dangerouslySetInnerHTML={{ __html: aiLab.intro }}
        />
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-6 max-w-3xl mx-auto">
        <div className="space-y-5">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              프로젝트/사업명 <span className="text-slate-400 font-normal">(선택)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              placeholder="예: 직장인 샐러드 구독 서비스"
            />
          </div>

          {/* Mandatory: Customer Segments */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              핵심 고객 (CS) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={cs}
              onChange={(e) => setCs(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
              placeholder="예: 바쁜 30대 직장인, 건강을 챙기고 싶은 1인 가구"
            />
          </div>

          {/* Mandatory: Value Proposition */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              가치 제안 (VP) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={vp}
              onChange={(e) => setVp(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
              placeholder="예: 매일 아침 문 앞으로 배송되는 신선한 유기농 샐러드"
            />
          </div>

          {/* Dynamic Optional Inputs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-700">
                추가 정보 입력 <span className="text-slate-400 font-normal">(선택)</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedOptional}
                  onChange={(e) => setSelectedOptional(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-purple-500"
                >
                  {OPTIONAL_BLOCK_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addDynamicInput}
                  className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-1.5 px-3 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </button>
              </div>
            </div>

            {dynamicInputs.length > 0 && (
              <div className="space-y-3">
                {dynamicInputs.map((input) => (
                  <div key={input.id} className="flex gap-2 items-center animate-fade-in">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-2 rounded w-36 text-center shrink-0">
                      {input.label}
                    </span>
                    <input
                      type="text"
                      value={input.value}
                      onChange={(e) => updateDynamicInput(input.id, e.target.value)}
                      className="flex-1 p-2 text-sm rounded-lg border border-slate-200 focus:border-purple-500 outline-none"
                      placeholder="내용을 입력하세요"
                    />
                    <button
                      onClick={() => removeDynamicInput(input.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <div className="mt-6 flex justify-end border-t border-purple-50 pt-4">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                생성 중...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Gemini로 BMC 생성하기
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>📋</span> 생성된 비즈니스 모델 캔버스
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    프로젝트 저장
                  </>
                )}
              </button>
            </div>
          </div>

          <BMCCanvas
            title={title}
            userInputs={{
              cs,
              vp,
              ...Object.fromEntries(
                dynamicInputs
                  .filter((d) => d.value.trim())
                  .map((d) => [d.type, d.value])
              )
            }}
            aiOutputs={result}
          />
        </div>
      )}
    </div>
  )
}
