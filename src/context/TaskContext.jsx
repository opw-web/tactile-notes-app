import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const TaskContext = createContext(null);

const PRIORITY_COLORS = {
  high: "var(--color-primary)",
  medium: "var(--color-brass)",
  low: "var(--color-teal)",
};

const PRIORITY_LABELS = { high: "High", medium: "Medium", low: "Low" };
const EFFORT_LABELS = { "quick-win": "Quick Win", steady: "Steady Climb", "heavy-lift": "Heavy Lift" };
const PRIORITY_BADGE_KIND = { high: "primary", medium: "brass", low: "teal" };
const EFFORT_BADGE_KIND = { "quick-win": "teal", steady: "muted", "heavy-lift": "muted" };

function rowToTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    priority: row.priority,
    effort: row.effort,
    date: row.date,
    time: row.time,
    allDay: row.all_day,
    done: row.done,
    createdAt: row.created_at,
  };
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const onboarded = localStorage.getItem(`tactile-onboarded-${session.user.id}`);
        setHasOnboarded(!!onboarded);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const onboarded = localStorage.getItem(`tactile-onboarded-${session.user.id}`);
        setHasOnboarded(!!onboarded);
      } else {
        setHasOnboarded(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!user) { setTasks([]); return; }
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) setTasks(data.map(rowToTask));
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/matrix',
      },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setTasks([]);
  };

  const completeOnboarding = () => {
    if (user) {
      localStorage.setItem(`tactile-onboarded-${user.id}`, 'true');
    }
    setHasOnboarded(true);
  };

  const addTask = async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        effort: task.effort,
        date: task.date,
        time: task.time || null,
        all_day: task.allDay,
        done: false,
      })
      .select()
      .single();
    if (!error && data) setTasks(prev => [...prev, rowToTask(data)]);
  };

  const updateTask = async (id, updates) => {
    const dbUpdates = {};
    if ('title' in updates) dbUpdates.title = updates.title;
    if ('description' in updates) dbUpdates.description = updates.description;
    if ('priority' in updates) dbUpdates.priority = updates.priority;
    if ('effort' in updates) dbUpdates.effort = updates.effort;
    if ('date' in updates) dbUpdates.date = updates.date;
    if ('time' in updates) dbUpdates.time = updates.time;
    if ('allDay' in updates) dbUpdates.all_day = updates.allDay;
    if ('done' in updates) dbUpdates.done = updates.done;

    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

    await supabase.from('tasks').update(dbUpdates).eq('id', id);
  };

  const deleteTask = async (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    await supabase.from('tasks').delete().eq('id', id);
  };

  const toggleDone = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newDone = !task.done;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: newDone } : t));
    await supabase.from('tasks').update({ done: newDone }).eq('id', id);
  };

  const auth = {
    isLoggedIn: !!user,
    hasOnboarded,
    user: user ? {
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      email: user.email,
      initials: (user.user_metadata?.full_name || user.email || 'U')
        .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      avatar: user.user_metadata?.avatar_url,
    } : null,
  };

  return (
    <TaskContext.Provider value={{
      tasks, addTask, updateTask, deleteTask, toggleDone,
      auth, login, logout, completeOnboarding, loading,
      PRIORITY_COLORS, PRIORITY_LABELS, EFFORT_LABELS,
      PRIORITY_BADGE_KIND, EFFORT_BADGE_KIND,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}
