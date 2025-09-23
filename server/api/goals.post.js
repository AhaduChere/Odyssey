import { defineEventHandler, readBody, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  try {
    const body = await readBody(event);
    const { action, userID, goalname, goaldesc, deadline, goalID } = body;

    if (action === 'add') {
      if (!userID || !goalname || !deadline) {
        throw createError({ statusCode: 400, message: 'Missing required fields' });
      }

      const { data, error } = await supabase
        .from('goals')
        .insert({
          user_id: userID,
          goal_name: goalname,
          description: goaldesc ?? null,
          deadline,
          completed: false,
          created_at: new Date().toISOString(),
        })
        .select('goal_id')
        .single();

      if (error) throw createError({ statusCode: 500, message: 'Failed to add goal: ' + error.message });

      return { success: true, goalId: data.goal_id };
    }

    if (action === 'complete') {
      if (!goalID) throw createError({ statusCode: 400, message: 'Missing goalID' });

      const { data, error } = await supabase
        .from('goals')
        .update({ completed: true, completed_date: new Date().toISOString() })
        .eq('goal_id', goalID)
        .select();

      if (error) throw createError({ statusCode: 500, message: 'Failed to complete goal: ' + error.message });
      if (!data || data.length === 0) return { success: false, message: 'No rows updated' };
      return { success: true };
    }

    if (action === 'undo') {
      if (!goalID) throw createError({ statusCode: 400, message: 'Missing goalID' });

      const { data, error } = await supabase
        .from('goals')
        .update({ completed: false, completed_date: null })
        .eq('goal_id', goalID)
        .select();

      if (error) throw createError({ statusCode: 500, message: 'Failed to undo goal: ' + error.message });
      if (!data || data.length === 0) return { success: false, message: 'No rows updated' };
      return { success: true };
    }

    if (action === 'delete') {
      if (!goalID) throw createError({ statusCode: 400, message: 'Missing goalID' });

      const { data, error } = await supabase.from('goals').delete().eq('goal_id', goalID).select();

      if (error) throw createError({ statusCode: 500, message: 'Failed to delete goal: ' + error.message });
      if (!data || data.length === 0) return { success: false, message: 'No rows deleted' };
      return { success: true };
    }

    if (action === 'edit') {
      if (!goalID) throw createError({ statusCode: 400, message: 'Missing goal ID' });
      if (!userID) throw createError({ statusCode: 400, message: 'Missing user ID' });

      const { data, error } = await supabase
        .from('goals')
        .update({
          goal_name: goalname,
          description: goaldesc ?? null,
          deadline,
        })
        .match({ goal_id: goalID, user_id: userID })
        .select();

      if (error) throw createError({ statusCode: 500, message: 'Failed to edit goal: ' + error.message });
      if (!data || data.length === 0) return { success: false, message: 'No rows updated' };
      return { success: true };
    }

    throw createError({ statusCode: 400, message: 'Invalid action' });
  } catch (err) {
    throw createError({ statusCode: 500, message: 'Failed to process request.' });
  }
});
