import { useState } from 'react'
import { courseData } from '@/data/courseData'

export default function Patterns() {
  const { patterns } = courseData
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null)

  const selected = selectedPattern !== null ? patterns.list[selectedPattern] : null

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          {patterns.title}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {patterns.intro}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Pattern List */}
        <div className="space-y-4">
          {patterns.list.map((pattern, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPattern(idx)}
              className={`bg-white p-5 rounded-xl shadow-sm border-2 cursor-pointer transition-all group ${
                selectedPattern === idx
                  ? 'border-blue-500 shadow-md'
                  : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">
                    Pattern {idx + 1}
                  </span>
                  {pattern.title}
                </h3>
                <span className={`transition-colors ${
                  selectedPattern === idx ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'
                }`}>
                  →
                </span>
              </div>
              <p className="text-sm text-slate-500">{pattern.summary}</p>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 min-h-[400px] sticky top-4">
          {selected ? (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b border-blue-100">
                {selected.title}
              </h3>
              <div
                className="text-slate-700 leading-7 text-sm mb-6 bg-white p-4 rounded-lg border border-blue-50 shadow-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selected.text }}
              />

              {/* Long Tail Chart Placeholder */}
              {selected.hasChart && (
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
                    <span>📊</span> 롱테일 분포 시각화
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-slate-100">
                    <div className="h-48 bg-gradient-to-r from-blue-100 via-blue-50 to-slate-50 rounded flex items-end justify-center gap-1 p-4">
                      {/* Simple bar chart visualization */}
                      {[100, 80, 60, 45, 35, 28, 22, 18, 15, 13, 11, 10, 9, 8, 7, 6, 5, 5, 4, 4].map((h, i) => (
                        <div
                          key={i}
                          className={`w-3 rounded-t transition-all ${
                            i < 4 ? 'bg-red-400' : 'bg-blue-400'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-red-400 rounded" /> Head (인기 상품)
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-blue-400 rounded" /> Tail (틈새 상품)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-5xl mb-4 opacity-20">💡</p>
              <p className="text-slate-500 font-medium">
                좌측의 패턴 목록을 클릭하여
                <br />
                상세 학습 내용과 시각화 자료를 확인하세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
