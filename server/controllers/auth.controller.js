const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../db/index');
const crypto = require('crypto');

const generateTokens = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  const refreshToken = crypto.randomBytes(40).toString('hex');
  
  // Store refresh token
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration
  
  const { error } = await supabase
    .from('refresh_tokens')
    .insert([{ user_id: userId, token: refreshToken, expires_at: expiresAt.toISOString() }]);
    
  if (error) console.error('Error saving refresh token:', error);
  
  return { token, refreshToken };
};

const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    console.log('Signup attempt for:', email);

    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle(); // maybeSingle doesn't error on 0 rows

    if (findError) {
      console.error('Error finding user:', findError);
      throw findError;
    }

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ full_name, email, password_hash: hashedPassword }])
      .select('id, full_name, email')
      .single();

    if (insertError) {
      console.error('Insert Error:', insertError);
      throw insertError;
    }

    const tokens = await generateTokens(newUser.id);

    console.log('Signup successful for:', email);
    res.status(201).json({ ...tokens, user: newUser });
  } catch (error) {
    console.error('Signup Catch Block:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokens = await generateTokens(user.id);
    res.json({ 
      token: tokens.token, 
      refreshToken: tokens.refreshToken,
      user: { id: user.id, full_name: user.full_name, email: user.email } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required' });

    const { data: tokenRecord } = await supabase
      .from('refresh_tokens')
      .select('*')
      .eq('token', refreshToken)
      .gte('expires_at', new Date().toISOString())
      .single();

    if (!tokenRecord) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    const userId = tokenRecord.user_id;
    
    // Remove old refresh token
    await supabase
      .from('refresh_tokens')
      .delete()
      .eq('token', refreshToken);
    
    const tokens = await generateTokens(userId);
    res.json(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, full_name, email')
      .eq('id', req.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signup, login, refresh, getMe };
