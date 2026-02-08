// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id'>>
      }
      bmc_projects: {
        Row: BMCProject
        Insert: Omit<BMCProject, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BMCProject, 'id' | 'user_id'>>
      }
      bmc_blocks: {
        Row: BMCBlock
        Insert: Omit<BMCBlock, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BMCBlock, 'id' | 'project_id'>>
      }
    }
  }
}

// Profile
export interface Profile {
  id: string
  email: string
  display_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// BMC Project
export interface BMCProject {
  id: string
  user_id: string
  title: string
  description?: string
  created_at: string
  updated_at: string
}

// BMC Block
export interface BMCBlock {
  id: string
  project_id: string
  block_type: BMCBlockType
  user_content?: string
  ai_content?: string
  created_at: string
  updated_at: string
}

// BMC Block Types
export type BMCBlockType =
  | 'kp' | 'ka' | 'kr' | 'vp'
  | 'cr' | 'ch' | 'cs' | 'cost' | 'rev'

// BMC Block Configuration
export interface BMCBlockConfig {
  key: BMCBlockType
  code: string
  area: string
  name: string
  desc: string
  details?: string
}

// Generate BMC Input
export interface GenerateBMCInput {
  title?: string
  cs: string
  vp: string
  [key: string]: string | undefined
}

// Generate BMC Response
export interface GenerateBMCResponse {
  kp: string
  ka: string
  kr: string
  vp: string
  cr: string
  ch: string
  cs: string
  cost: string
  rev: string
}

// Course Data Types
export interface CourseSection {
  title: string
  items: { head: string; text: string }[]
}

export interface CourseBasics {
  title: string
  intro: string
  sections: CourseSection[]
}

export interface CourseBMCBlock {
  id: string
  code: string
  area: string
  name: string
  desc: string
  details: string
}

export interface CourseBMC {
  title: string
  intro: string
  blocks: CourseBMCBlock[]
}

export interface CoursePattern {
  title: string
  summary: string
  text: string
  hasChart?: boolean
}

export interface CoursePatterns {
  title: string
  intro: string
  list: CoursePattern[]
}

export interface CourseAILab {
  title: string
  intro: string
}

export interface CourseData {
  basics: CourseBasics
  bmc: CourseBMC
  patterns: CoursePatterns
  aiLab: CourseAILab
}
