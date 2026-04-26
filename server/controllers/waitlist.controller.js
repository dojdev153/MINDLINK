const supabase = require('../db/index');
const { sendWaitlistConfirmation, sendLaunchNotification } = require('../services/email.service');

const join = async (req, res) => {
  try {
    const { full_name, email, age_group, location } = req.body;

    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single();

    if (existingEntry) {
      return res.status(409).json({ error: 'This email is already on the waitlist' });
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ full_name, email, age_group, location }]);

    if (error) throw error;

    // Get position via count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    // Send async confirmation
    sendWaitlistConfirmation(email, full_name).catch(console.error);

    res.status(201).json({ message: 'Successfully joined waitlist', position: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
      
    res.json({ count: count || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const notifyAll = async (req, res) => {
  try {
    const { data: unnotifiedUsers, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('notified', false);

    if (error) throw error;

    let notifiedCount = 0;

    // Process in batches of 50
    const batchSize = 50;
    for (let i = 0; i < unnotifiedUsers.length; i += batchSize) {
      const batch = unnotifiedUsers.slice(i, i + batchSize);
      
      const promises = batch.map(async (user) => {
        try {
          await sendLaunchNotification(user.email, user.full_name);
          
          await supabase
            .from('waitlist')
            .update({ notified: true })
            .eq('id', user.id);
            
          notifiedCount++;
        } catch (err) {
          console.error(`Failed to notify ${user.email}:`, err);
        }
      });

      await Promise.all(promises);
      
      // Wait 1 second between batches to respect rate limits
      if (i + batchSize < unnotifiedUsers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    res.json({ notified: notifiedCount, totalPendingBefore: unnotifiedUsers.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { join, getCount, notifyAll };
