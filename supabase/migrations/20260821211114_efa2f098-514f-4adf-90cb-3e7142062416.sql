REVOKE ALL ON FUNCTION public.is_course_member(text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_course_member(text, uuid) TO authenticated, service_role;