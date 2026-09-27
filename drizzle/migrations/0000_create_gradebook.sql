-- Gradebook snapshot: one row per course holding activities + grades as JSON
CREATE TABLE public.gradebook (
  course_id text PRIMARY KEY DEFAULT 'english-classroom-2026-2',
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_by uuid REFERENCES auth.users(id),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.gradebook TO authenticated;
GRANT ALL ON public.gradebook TO service_role;

ALTER TABLE public.gradebook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Course members can read the gradebook"
  ON public.gradebook FOR SELECT TO authenticated
  USING (public.is_course_member(course_id, auth.uid()));

CREATE POLICY "Course teachers can insert the gradebook"
  ON public.gradebook FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.course_members cm
      WHERE cm.course_id = gradebook.course_id
        AND cm.user_id = auth.uid()
        AND cm.role = 'teacher'
    )
  );

CREATE POLICY "Course teachers can update the gradebook"
  ON public.gradebook FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.course_members cm
      WHERE cm.course_id = gradebook.course_id
        AND cm.user_id = auth.uid()
        AND cm.role = 'teacher'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.course_members cm
      WHERE cm.course_id = gradebook.course_id
        AND cm.user_id = auth.uid()
        AND cm.role = 'teacher'
    )
  );

ALTER PUBLICATION supabase_realtime ADD TABLE public.gradebook;