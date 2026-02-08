import { useRef } from 'react'
import { BMC_BLOCK_CONFIG } from '@/data/courseData'
import { Download, User, Sparkles } from 'lucide-react'
import type { GenerateBMCResponse } from '@/lib/types'

interface BMCCanvasProps {
  title?: string
  userInputs: Record<string, string>
  aiOutputs: GenerateBMCResponse
}

export default function BMCCanvas({ title, userInputs, aiOutputs }: BMCCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (!canvasRef.current) return

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      })

      const link = document.createElement('a')
      link.download = `${title || 'bmc'}-canvas.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
      alert('이미지 저장에 실패했습니다.')
    }
  }

  return (
    <div className="space-y-4">
      {/* Legend and Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
            <User className="w-3.5 h-3.5" />
            내 입력
          </span>
          <span className="flex items-center gap-1.5 bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            AI 제안
          </span>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          이미지 저장
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200"
      >
        {/* Title */}
        {title && (
          <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-800 mb-6 pb-4 border-b border-slate-100">
            {title}
          </h2>
        )}

        {/* BMC Grid */}
        <div className="bmc-grid">
          {BMC_BLOCK_CONFIG.map((block) => {
            const userContent = userInputs[block.key]
            const aiContent = aiOutputs[block.key]

            return (
              <div
                key={block.key}
                className={`${block.area} bmc-block p-3 sm:p-4`}
              >
                {/* Block Header */}
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
                    {block.name}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                    {block.code}
                  </span>
                </div>

                {/* Block Content */}
                <div className="space-y-3 overflow-y-auto max-h-60 pr-1 custom-scrollbar">
                  {/* User Input */}
                  {userContent && (
                    <div className="bg-slate-50 border-l-4 border-slate-400 p-2 sm:p-3 rounded-r">
                      <div className="font-bold text-slate-500 text-xs mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        내 입력
                      </div>
                      <div className="text-slate-700 text-xs sm:text-sm">
                        {userContent}
                      </div>
                    </div>
                  )}

                  {/* AI Content */}
                  {aiContent && (
                    <div className="bg-purple-50 border-l-4 border-purple-400 p-2 sm:p-3 rounded-r">
                      <div className="font-bold text-purple-600 text-xs mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI 제안
                      </div>
                      <div
                        className="text-slate-700 text-xs sm:text-sm prose prose-sm max-w-none prose-purple [&_ul]:my-1 [&_li]:my-0.5"
                        dangerouslySetInnerHTML={{ __html: aiContent }}
                      />
                    </div>
                  )}

                  {/* Empty State */}
                  {!userContent && !aiContent && (
                    <p className="text-slate-400 text-xs italic">내용 없음</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
