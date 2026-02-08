import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { BMCProject, BMCBlock, GenerateBMCInput, GenerateBMCResponse } from '@/lib/types'

export function useProjects() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // AI BMC 생성 (Supabase Edge Function 호출)
  const generateBMC = useCallback(async (input: GenerateBMCInput): Promise<GenerateBMCResponse> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-bmc', {
        body: input
      })

      if (fnError) throw fnError
      return data as GenerateBMCResponse
    } catch (err) {
      const message = err instanceof Error ? err.message : 'BMC 생성 실패'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 프로젝트 저장
  const saveProject = useCallback(async (
    title: string,
    userInputs: Record<string, string>,
    aiOutputs: GenerateBMCResponse,
    projectId?: string
  ): Promise<string> => {
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('로그인이 필요합니다.')

      let savedProjectId = projectId

      // 프로젝트 생성 또는 수정
      if (projectId) {
        const { error: updateError } = await supabase
          .from('bmc_projects')
          .update({ title, updated_at: new Date().toISOString() })
          .eq('id', projectId)

        if (updateError) throw updateError
      } else {
        const { data, error: insertError } = await supabase
          .from('bmc_projects')
          .insert({ user_id: user.id, title })
          .select('id')
          .single()

        if (insertError) throw insertError
        savedProjectId = data.id
      }

      // 기존 블록 삭제 후 새로 생성
      if (projectId) {
        await supabase.from('bmc_blocks').delete().eq('project_id', projectId)
      }

      // 블록 데이터 생성
      const blockTypes = ['kp', 'ka', 'kr', 'vp', 'cr', 'ch', 'cs', 'cost', 'rev'] as const
      const blocks = blockTypes.map(type => ({
        project_id: savedProjectId!,
        block_type: type,
        user_content: userInputs[type] || null,
        ai_content: aiOutputs[type] || null
      }))

      const { error: blocksError } = await supabase.from('bmc_blocks').insert(blocks)
      if (blocksError) throw blocksError

      return savedProjectId!
    } catch (err) {
      const message = err instanceof Error ? err.message : '저장 실패'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 프로젝트 목록 조회
  const getProjects = useCallback(async (): Promise<BMCProject[]> => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('bmc_projects')
        .select('*')
        .order('updated_at', { ascending: false })

      if (fetchError) throw fetchError
      return data || []
    } catch (err) {
      const message = err instanceof Error ? err.message : '프로젝트 조회 실패'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 프로젝트 상세 조회
  const getProject = useCallback(async (id: string): Promise<BMCProject & { blocks: BMCBlock[] }> => {
    setLoading(true)
    setError(null)

    try {
      const { data: project, error: projectError } = await supabase
        .from('bmc_projects')
        .select('*')
        .eq('id', id)
        .single()

      if (projectError) throw projectError

      const { data: blocks, error: blocksError } = await supabase
        .from('bmc_blocks')
        .select('*')
        .eq('project_id', id)

      if (blocksError) throw blocksError

      return { ...project, blocks: blocks || [] }
    } catch (err) {
      const message = err instanceof Error ? err.message : '프로젝트 조회 실패'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 프로젝트 삭제
  const deleteProject = useCallback(async (id: string): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase
        .from('bmc_projects')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
    } catch (err) {
      const message = err instanceof Error ? err.message : '삭제 실패'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    generateBMC,
    saveProject,
    getProjects,
    getProject,
    deleteProject
  }
}
