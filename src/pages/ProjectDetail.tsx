import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProjects } from '@/hooks/useProjects'
import BMCCanvas from '@/components/bmc/BMCCanvas'
import { ArrowLeft, Trash2, Calendar } from 'lucide-react'
import type { BMCProject, BMCBlock, GenerateBMCResponse } from '@/lib/types'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { loading, error, getProject, deleteProject } = useProjects()

  const [project, setProject] = useState<(BMCProject & { blocks: BMCBlock[] }) | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (id) {
      loadProject(id)
    }
  }, [id])

  const loadProject = async (projectId: string) => {
    try {
      const data = await getProject(projectId)
      setProject(data)
    } catch (err) {
      console.error('Load project error:', err)
    }
  }

  const handleDelete = async () => {
    if (!project) return
    if (!confirm(`"${project.title}" 프로젝트를 삭제하시겠습니까?`)) {
      return
    }

    setDeleting(true)
    try {
      await deleteProject(project.id)
      navigate('/projects')
    } catch (err) {
      alert('삭제 실패: ' + (err instanceof Error ? err.message : '오류'))
      setDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Convert blocks to user inputs and AI outputs
  const getUserInputs = (): Record<string, string> => {
    if (!project) return {}
    const inputs: Record<string, string> = {}
    project.blocks.forEach((block) => {
      if (block.user_content) {
        inputs[block.block_type] = block.user_content
      }
    })
    return inputs
  }

  const getAIOutputs = (): GenerateBMCResponse => {
    if (!project) {
      return { kp: '', ka: '', kr: '', vp: '', cr: '', ch: '', cs: '', cost: '', rev: '' }
    }
    const outputs: Record<string, string> = {}
    project.blocks.forEach((block) => {
      outputs[block.block_type] = block.ai_content || ''
    })
    return outputs as GenerateBMCResponse
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error || '프로젝트를 찾을 수 없습니다.'}</p>
        <Link
          to="/projects"
          className="text-purple-600 hover:underline font-medium"
        >
          프로젝트 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/projects"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {project.title}
            </h1>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
              <Calendar className="w-4 h-4" />
              {formatDate(project.updated_at)}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors disabled:opacity-50"
        >
          {deleting ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          삭제
        </button>
      </div>

      {/* BMC Canvas */}
      <BMCCanvas
        title={project.title}
        userInputs={getUserInputs()}
        aiOutputs={getAIOutputs()}
      />
    </div>
  )
}
