import { defineEventHandler, getQuery, sendError, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const query = getQuery(event);
  const id = query.id;
  const method = query.method;

  if (!id) return sendError(event, createError({ statusCode: 400, message: 'Missing user ID' }));
  if (!method) return sendError(event, createError({ statusCode: 400, message: 'Missing method type' }));

  try {
    const today = new Date().toISOString().split('T')[0];

    if (method === 'dashboard') {
      const { data: deadlines, error: dErr } = await supabase
        .from('goals')
        .select('deadline', { distinct: true })
        .eq('user_id', id)
        .gte('deadline', today)
        .order('deadline', { ascending: true })
        .limit(30);

      if (dErr) throw dErr;

      let upcomingGoals = [];
      if (deadlines && deadlines.length > 0) {
        const maxDeadline = deadlines[deadlines.length - 1].deadline;
        const { data: upcoming, error: uErr } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', id)
          .eq('completed', false)
          .gte('deadline', today)
          .lte('deadline', maxDeadline)
          .order('deadline', { ascending: true });

        if (uErr) throw uErr;
        upcomingGoals = upcoming;
      }

      const { data: pastDueGoals, error: pErr } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', id)
        .eq('completed', false)
        .lt('deadline', today)
        .order('deadline', { ascending: true });

      if (pErr) throw pErr;

      return { upcoming: upcomingGoals, pastdue: pastDueGoals };
    } else if (method === 'account') {
      const { count: incompleteCount, error: icErr } = await supabase
        .from('goals')
        .select('user_id', { count: 'exact' })
        .eq('user_id', id)
        .eq('completed', false);

      if (icErr) throw icErr;

      const { count: completedCount, error: cErr } = await supabase
        .from('goals')
        .select('user_id', { count: 'exact' })
        .eq('user_id', id)
        .eq('completed', true);

      if (cErr) throw cErr;

      return { incomplete: incompleteCount ?? 0, completed: completedCount ?? 0 };
    } else if (method === 'archive') {
      const { data: allGoals, error: aErr } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', id)
        .order('deadline', { ascending: false });

      if (aErr) throw aErr;
      return allGoals;
    } else {
      return sendError(event, createError({ statusCode: 400, message: 'Unknown method type' }));
    }
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, message: 'Error: ' + err }));
  }
});
