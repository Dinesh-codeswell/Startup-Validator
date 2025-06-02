
-- Function to create user idea
CREATE OR REPLACE FUNCTION create_user_idea(
    p_user_id UUID,
    p_title TEXT,
    p_description TEXT,
    p_target_audience TEXT DEFAULT NULL,
    p_problem_solved TEXT DEFAULT NULL,
    p_industry TEXT DEFAULT NULL,
    p_status TEXT DEFAULT 'draft'
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    target_audience TEXT,
    problem_solved TEXT,
    industry TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    user_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_idea public.user_ideas%ROWTYPE;
BEGIN
    INSERT INTO public.user_ideas (
        user_id,
        title,
        description,
        target_audience,
        problem_solved,
        industry,
        status
    ) VALUES (
        p_user_id,
        p_title,
        p_description,
        p_target_audience,
        p_problem_solved,
        p_industry,
        p_status
    ) RETURNING * INTO new_idea;
    
    RETURN QUERY
    SELECT 
        new_idea.id,
        new_idea.title,
        new_idea.description,
        new_idea.target_audience,
        new_idea.problem_solved,
        new_idea.industry,
        new_idea.status,
        new_idea.created_at,
        new_idea.updated_at,
        new_idea.user_id;
END;
$$;
