
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ApplicantProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  github_url?: string;
  resume_url?: string;
  cover_letter_template?: string;
  skills: string[];
  experience_years: number;
  education: string[];
  work_experience: any[];
  certifications: string[];
  languages: string[];
  availability: 'immediate' | 'two_weeks' | 'one_month' | 'flexible';
  salary_expectation_min?: number;
  salary_expectation_max?: number;
  preferred_currency: string;
  job_preferences: any;
  created_at: string;
  updated_at: string;
}

export const useApplicantProfile = () => {
  const [profile, setProfile] = useState<ApplicantProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('applicant_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          ...data,
          work_experience: Array.isArray(data.work_experience) ? data.work_experience : [],
          job_preferences: typeof data.job_preferences === 'object' ? data.job_preferences : {},
          availability: (data.availability as 'immediate' | 'two_weeks' | 'one_month' | 'flexible') || 'flexible',
          skills: data.skills || [],
          education: data.education || [],
          certifications: data.certifications || [],
          languages: data.languages || []
        });
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error fetching applicant profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Partial<ApplicantProfile>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('applicant_profiles')
        .insert({
          user_id: user.id,
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          email: profileData.email || '',
          phone: profileData.phone,
          location: profileData.location,
          linkedin_url: profileData.linkedin_url,
          portfolio_url: profileData.portfolio_url,
          github_url: profileData.github_url,
          resume_url: profileData.resume_url,
          cover_letter_template: profileData.cover_letter_template,
          skills: profileData.skills || [],
          experience_years: profileData.experience_years || 0,
          education: profileData.education || [],
          work_experience: profileData.work_experience || [],
          certifications: profileData.certifications || [],
          languages: profileData.languages || [],
          availability: profileData.availability || 'flexible',
          salary_expectation_min: profileData.salary_expectation_min,
          salary_expectation_max: profileData.salary_expectation_max,
          preferred_currency: profileData.preferred_currency || 'USD',
          job_preferences: profileData.job_preferences || {}
        })
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile({
          ...data,
          work_experience: Array.isArray(data.work_experience) ? data.work_experience : [],
          job_preferences: typeof data.job_preferences === 'object' ? data.job_preferences : {},
          availability: (data.availability as 'immediate' | 'two_weeks' | 'one_month' | 'flexible') || 'flexible',
          skills: data.skills || [],
          education: data.education || [],
          certifications: data.certifications || [],
          languages: data.languages || []
        });
      }
      return data;
    } catch (error) {
      console.error('Error creating applicant profile:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<ApplicantProfile>) => {
    if (!user || !profile) return;

    try {
      const { data, error } = await supabase
        .from('applicant_profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          email: profileData.email,
          phone: profileData.phone,
          location: profileData.location,
          linkedin_url: profileData.linkedin_url,
          portfolio_url: profileData.portfolio_url,
          github_url: profileData.github_url,
          resume_url: profileData.resume_url,
          cover_letter_template: profileData.cover_letter_template,
          skills: profileData.skills,
          experience_years: profileData.experience_years,
          education: profileData.education,
          work_experience: profileData.work_experience,
          certifications: profileData.certifications,
          languages: profileData.languages,
          availability: profileData.availability,
          salary_expectation_min: profileData.salary_expectation_min,
          salary_expectation_max: profileData.salary_expectation_max,
          preferred_currency: profileData.preferred_currency,
          job_preferences: profileData.job_preferences
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile({
          ...data,
          work_experience: Array.isArray(data.work_experience) ? data.work_experience : [],
          job_preferences: typeof data.job_preferences === 'object' ? data.job_preferences : {},
          availability: (data.availability as 'immediate' | 'two_weeks' | 'one_month' | 'flexible') || 'flexible',
          skills: data.skills || [],
          education: data.education || [],
          certifications: data.certifications || [],
          languages: data.languages || []
        });
      }
      return data;
    } catch (error) {
      console.error('Error updating applicant profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
    refreshProfile: fetchProfile,
  };
};
