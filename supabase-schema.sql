-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Tasks table
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text default '',
  priority text check (priority in ('high', 'medium', 'low')) not null default 'medium',
  effort text check (effort in ('quick-win', 'steady', 'heavy-lift')) not null default 'steady',
  date date not null default current_date,
  time text,
  all_day boolean default true,
  done boolean default false,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.tasks enable row level security;

-- Users can only see their own tasks
create policy "Users can view own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

-- Users can insert their own tasks
create policy "Users can insert own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

-- Users can update their own tasks
create policy "Users can update own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

-- Users can delete their own tasks
create policy "Users can delete own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- Index for fast user lookups
create index if not exists tasks_user_id_idx on public.tasks(user_id);
create index if not exists tasks_date_idx on public.tasks(user_id, date);
