import { useState } from 'react'
import { courseData } from '@/data/courseData'
import { X } from 'lucide-react'

export default function BMC() {
  const { bmc } = courseData
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

  const selectedBlockData = selectedBlock
    ? bmc.blocks.find((b) => b.id === selectedBlock)
    : null

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          {bmc.title}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {bmc.intro}
        </p>
      </div>

      {/* BMC Grid */}
      <div className="bmc-grid">
        {bmc.blocks.map((block) => (
          <div
            key={block.id}
            onClick={() => setSelectedBlock(block.id)}
            className={`${block.area} bmc-block p-4 cursor-pointer hover:bg-blue-50 relative group transition-colors`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">
                {block.code}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-700 transition-colors">
              {block.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-3">
              {block.desc}
            </p>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 text-sm">
              클릭하여 상세보기 →
            </div>
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      {selectedBlockData && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-6 animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-blue-900">
                {selectedBlockData.code} : {selectedBlockData.name}
              </h3>
              <p className="text-blue-700 mt-1">{selectedBlockData.desc}</p>
            </div>
            <button
              onClick={() => setSelectedBlock(null)}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-blue-600" />
            </button>
          </div>
          <div
            className="bg-white p-5 rounded-lg border border-blue-100 prose prose-sm max-w-none prose-blue"
            dangerouslySetInnerHTML={{ __html: selectedBlockData.details }}
          />
        </div>
      )}

      {/* Guide Text */}
      {!selectedBlock && (
        <div className="text-center py-8 text-slate-500">
          <p className="text-lg mb-2">👆 위 캔버스의 블록을 클릭하세요</p>
          <p className="text-sm">각 블록의 상세 설명과 실제 사례를 확인할 수 있습니다.</p>
        </div>
      )}
    </div>
  )
}
