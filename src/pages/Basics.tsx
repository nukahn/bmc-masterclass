import { courseData } from '@/data/courseData'

export default function Basics() {
  const { basics } = courseData

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          {basics.title}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {basics.intro}
        </p>
      </div>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {basics.sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold text-blue-800 mb-4 pb-2 border-b border-blue-100">
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex gap-3">
                  <span className="text-blue-500 font-bold mt-0.5">▪</span>
                  <div>
                    <span className="font-semibold text-slate-800">{item.head}:</span>{' '}
                    <span className="text-slate-600">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span> 핵심 요약
        </h3>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            비즈니스 모델은 가치를 창출, 전달, 획득하는 시스템 설계도입니다.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            전략은 '어떻게 경쟁할 것인가', 모델은 '어떻게 작동하는가'를 설명합니다.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            성공적인 모델은 가치 제안, 수익 메커니즘, 운영 체계를 갖춥니다.
          </li>
        </ul>
      </div>
    </div>
  )
}
