import { supabase } from '../lib/supabase';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  AuthUser,
  User,
  UpdateProfileCredentials,
  UpdatePasswordCredentials,
  NotificationSettings
} from '../types/auth';

const mapSupabaseUser = (user: AuthUser): User => ({
  id: user.id,
  email: user.email || '',
  name: user.user_metadata.name,
  tenant: user.user_metadata.tenant || 'NBA',
  isEmailVerified: user.email_confirmed_at !== null
});

export const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: credentials.redirectTo,
        data: { 
          name: credentials.name, 
          tenant: 'NBA' 
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new Error('This email is already registered. Please try logging in.');
      }
      throw error;
    }

    if (!data.user) {
      throw new Error('Registration failed. Please try again.');
    }
    
    return {
      user: mapSupabaseUser(data.user as AuthUser),
      token: data.session?.access_token || ''
    };
  },

  async resendVerificationEmail(email: string): Promise<void> {
    // Check if we've sent too many emails recently
    const lastAttempt = localStorage.getItem(`verification_${email}`);
    const cooldownPeriod = 60000; // 1 minute cooldown

    if (lastAttempt) {
      const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt);
      if (timeSinceLastAttempt < cooldownPeriod) {
        throw new Error('Please wait a minute before requesting another verification email.');
      }
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    
    if (error) {
      console.error('Resend verification error:', error);
      throw error;
    }

    // Store the timestamp of this attempt
    localStorage.setItem(`verification_${email}`, Date.now().toString());
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
      options: {
        redirectTo: credentials.redirectTo
      }
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Please verify your email before logging in');
      }
      throw error;
    }
    
    if (!data.user || !data.session) {
      throw new Error('Login failed');
    }
    
    return {
      user: mapSupabaseUser(data.user as AuthUser),
      token: data.session.access_token
    };
  },

  async forgotPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  async verifyForgotPassword(credentials: EmailVerificationCredentials): Promise<void> {
    // This is handled by Supabase's built-in email verification
    return;
  },

  async verifyTwoFactor(credentials: TwoFactorVerifyCredentials): Promise<void> {
    // This is handled by Supabase's built-in 2FA if enabled
    return;
  },

  async sendTwoFactorCode(email: string): Promise<void> {
    // This is handled by Supabase's built-in 2FA if enabled
    return;
  },

  async resetPassword(credentials: { password: string }): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: credentials.password
    });
    if (error) throw error;
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getProfile(): Promise<User> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) throw new Error('No user found');
    return mapSupabaseUser(user as AuthUser);
  },

  async updateProfile(credentials: UpdateProfileCredentials): Promise<User> {
    const { data: { user }, error } = await supabase.auth.updateUser({
      email: credentials.email,
      data: {
        name: credentials.name,
        phone: credentials.phone
      }
    });

    if (error) throw error;
    if (!user) throw new Error('No user returned from update');
    return mapSupabaseUser(user as AuthUser);
  },

  async updatePassword(credentials: UpdatePasswordCredentials): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: credentials.new_password
    });
    if (error) throw error;
  },

  async getNotificationSettings(): Promise<NotificationSettings> {
    const { data, error } = await supabase
      .from('notification_settings')
      .select('*')
      .single();

    if (error) throw error;
    return {
      email: data.email,
      sms: data.sms,
      push: data.push
    };
  },

  async updateNotificationSettings(settings: NotificationSettings): Promise<void> {
    const { error } = await supabase
      .from('notification_settings')
      .update(settings)
      .eq('user_id', (await this.getProfile()).id);

    if (error) throw error;
  },
};