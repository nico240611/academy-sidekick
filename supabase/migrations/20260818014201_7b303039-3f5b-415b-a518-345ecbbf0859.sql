-- Tabla de mensajes y avisos del curso (chat en tiempo real)
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id text NOT NULL DEFAULT 'english-classroom-2026-2',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  local_id text NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('teacher', 'student')),
  type text NOT NULL CHECK (type IN ('chat', 'announcement')),
  title text,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Grants: authenticated users read/write their own messages; service_role for admin/seed
GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Todos los usuarios autenticados pueden leer los mensajes del curso
CREATE POLICY "Users can read course messages"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (course_id = 'english-classroom-2026-2');

-- Cada usuario solo puede insertar mensajes asociados a su propia cuenta
CREATE POLICY "Users can insert their own messages"
  ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- El profesor puede eliminar sus propios avisos
CREATE POLICY "Teachers can delete own announcements"
  ON public.messages
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND role = 'teacher' AND type = 'announcement');

-- Habilitar realtime para la tabla
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;