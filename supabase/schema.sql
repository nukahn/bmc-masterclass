-- =====================================================
-- BMC Masterclass Database Schema
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. 사용자 프로필 테이블
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BMC 프로젝트 테이블
CREATE TABLE IF NOT EXISTS public.bmc_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BMC 블록 데이터 테이블
CREATE TABLE IF NOT EXISTS public.bmc_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.bmc_projects(id) ON DELETE CASCADE NOT NULL,
    block_type TEXT NOT NULL CHECK (
        block_type IN ('kp', 'ka', 'kr', 'vp', 'cr', 'ch', 'cs', 'cost', 'rev')
    ),
    user_content TEXT,
    ai_content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.bmc_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON public.bmc_projects(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_blocks_project_id ON public.bmc_blocks(project_id);

-- 5. 새 사용자 등록 시 프로필 자동 생성 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(
            NEW.raw_user_meta_data->>'display_name',
            NEW.raw_user_meta_data->>'name',
            split_part(NEW.email, '@', 1)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. 트리거 생성 (기존 트리거 삭제 후 재생성)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. updated_at 트리거 적용
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_bmc_projects_updated_at ON public.bmc_projects;
CREATE TRIGGER update_bmc_projects_updated_at
    BEFORE UPDATE ON public.bmc_projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_bmc_blocks_updated_at ON public.bmc_blocks;
CREATE TRIGGER update_bmc_blocks_updated_at
    BEFORE UPDATE ON public.bmc_blocks
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 9. Row Level Security (RLS) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bmc_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bmc_blocks ENABLE ROW LEVEL SECURITY;

-- 10. RLS 정책 (기존 정책 삭제 후 재생성)

-- Profiles 정책
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Projects 정책
DROP POLICY IF EXISTS "Users can view own projects" ON public.bmc_projects;
CREATE POLICY "Users can view own projects"
    ON public.bmc_projects FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own projects" ON public.bmc_projects;
CREATE POLICY "Users can create own projects"
    ON public.bmc_projects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own projects" ON public.bmc_projects;
CREATE POLICY "Users can update own projects"
    ON public.bmc_projects FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own projects" ON public.bmc_projects;
CREATE POLICY "Users can delete own projects"
    ON public.bmc_projects FOR DELETE
    USING (auth.uid() = user_id);

-- Blocks 정책
DROP POLICY IF EXISTS "Users can view own blocks" ON public.bmc_blocks;
CREATE POLICY "Users can view own blocks"
    ON public.bmc_blocks FOR SELECT
    USING (
        project_id IN (
            SELECT id FROM public.bmc_projects WHERE user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can create own blocks" ON public.bmc_blocks;
CREATE POLICY "Users can create own blocks"
    ON public.bmc_blocks FOR INSERT
    WITH CHECK (
        project_id IN (
            SELECT id FROM public.bmc_projects WHERE user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can update own blocks" ON public.bmc_blocks;
CREATE POLICY "Users can update own blocks"
    ON public.bmc_blocks FOR UPDATE
    USING (
        project_id IN (
            SELECT id FROM public.bmc_projects WHERE user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can delete own blocks" ON public.bmc_blocks;
CREATE POLICY "Users can delete own blocks"
    ON public.bmc_blocks FOR DELETE
    USING (
        project_id IN (
            SELECT id FROM public.bmc_projects WHERE user_id = auth.uid()
        )
    );

-- 11. 완료 메시지
DO $$
BEGIN
    RAISE NOTICE 'BMC Masterclass 데이터베이스 스키마가 성공적으로 생성되었습니다!';
END $$;
