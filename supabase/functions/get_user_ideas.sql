
-- Function to get user ideas
CREATE OR REPLACE FUNCTION get_user_ideas(p_user_id UUID)
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
BEGIN
    RETURN QUERY
    SELECT 
        ui.id,
        ui.title,
        ui.description,
        ui.target_audience,
        ui.problem_solved,
        ui.industry,
        ui.status,
        ui.created_at,
        ui.updated_at,
        ui.user_id
    FROM public.user_ideas ui
    WHERE ui.user_id = p_user_id
    ORDER BY ui.created_at DESC;
END;
$$;
