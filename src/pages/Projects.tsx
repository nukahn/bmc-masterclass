import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '@/hooks/useProjects'
import { FolderOpen, Plus, Trash2, Calendar, ArrowRight } from 'lucide-react'
import type { BMCProject } from '@/lib/types'

export default function Projects() {
  const { loading, error, getProjects, deleteProject } = useProjects()
  const [projects, setProjects] = useState<BMCProject[]>([])
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error('Load projects error:', err)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 프로젝트를 삭제하시겠습니까?`)) {
      return
    }

    setDeleting(id)
    try {
      await deleteProject(id)
      setProjects(projects.filter((p) => p.id !== id))
    } catch (err) {
      alert('삭제 실패: ' + (err instanceof Error ? err.message : '오류'))
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            내 프로젝트
          </h1>
          <p className="text-slate-600">
            저장된 비즈니스 모델 캔버스를 관리하세요.
          </p>
        </div>
        <Link
          to="/ai-lab"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          새 프로젝트
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            아직 저장된 프로젝트가 없습니다
          </h3>
          <p className="text-slate-500 mb-6">
            AI Lab에서 새로운 비즈니스 모델을 만들어보세요.
          </p>
          <Link
            to="/ai-lab"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            첫 프로젝트 만들기
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-purple-200 transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete(project.id, project.title)
                  }}
                  disabled={deleting === project.id}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  {deleting === project.id ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {project.description && (
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(project.updated_at)}
                </span>
                <Link
                  to={`/projects/${project.id}`}
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium"
                >
                  보기
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
