import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env['SUPABASE_URL'],
  process.env['SUPABASE_SERVICE_ROLE_KEY'],
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const users = [
  { email: 'teacher@englishclassroom.local', password: 'profe2026', name: 'Nicolás', local_id: 't1', role: 'teacher' },
  { email: 'andy@englishclassroom.local', password: 'andy2026', name: 'Andy', local_id: 'andy', role: 'student' },
  { email: 'tommy@englishclassroom.local', password: 'tommy2026', name: 'Tommy', local_id: 'tommy', role: 'student' },
];

for (const u of users) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: u.email,
    password: u.password,
    email_confirm: true,
    user_metadata: { name: u.name, local_id: u.local_id, role: u.role },
  });
  if (error) {
    if (error.message.includes('already been registered') || error.message.includes('already exists')) {
      console.log(`${u.email}: already exists`);
    } else {
      console.error(`${u.email}: ${error.message}`);
      process.exitCode = 1;
    }
  } else {
    console.log(`${u.email}: created ${data.user.id}`);
  }
}
