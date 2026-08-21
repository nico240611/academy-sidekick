CREATE TABLE public.course_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id text NOT NULL DEFAULT 'english-classroom-2026-2',
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'student',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (course_id, user_id)
);

GRANT SELECT ON public.course_members TO authenticated;
GRANT ALL ON public.course_members TO service_role;

ALTER TABLE public.course_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read own membership"
ON public.course_members FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.is_course_member(_course_id text, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.course_members
    WHERE course_id = _course_id AND user_id = _user_id
  )
$$;

INSERT INTO public.course_members (course_id, user_id, role)
SELECT 'english-classroom-2026-2', u.id,
  CASE WHEN u.email = 'teacher@englishclassroom.local' THEN 'teacher' ELSE 'student' END
FROM auth.users u
WHERE u.email IN (
  'teacher@englishclassroom.local',
  'andy@englishclassroom.local',
  'tommy@englishclassroom.local'
)
ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "Users can read course messages" ON public.messages;
CREATE POLICY "Course members can read course messages"
ON public.messages FOR SELECT TO authenticated
USING (public.is_course_member(course_id, auth.uid()));

DROP POLICY IF EXISTS "Users can insert their own messages" ON public.messages;
CREATE POLICY "Course members can insert their own messages"
ON public.messages FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND public.is_course_member(course_id, auth.uid()));