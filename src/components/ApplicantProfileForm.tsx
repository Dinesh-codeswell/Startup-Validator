import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useApplicantProfile } from '@/hooks/useApplicantProfile';
import { useToast } from '@/hooks/use-toast';
import { User, Briefcase, DollarSign, Globe, Plus, X } from 'lucide-react';

const ApplicantProfileForm = () => {
  const { profile, loading, createProfile, updateProfile } = useApplicantProfile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    portfolio_url: '',
    github_url: '',
    resume_url: '',
    cover_letter_template: '',
    experience_years: 0,
    availability: 'flexible' as 'immediate' | 'two_weeks' | 'one_month' | 'flexible',
    salary_expectation_min: '',
    salary_expectation_max: '',
    preferred_currency: 'USD',
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        linkedin_url: profile.linkedin_url || '',
        portfolio_url: profile.portfolio_url || '',
        github_url: profile.github_url || '',
        resume_url: profile.resume_url || '',
        cover_letter_template: profile.cover_letter_template || '',
        experience_years: profile.experience_years || 0,
        availability: profile.availability || 'flexible',
        salary_expectation_min: profile.salary_expectation_min?.toString() || '',
        salary_expectation_max: profile.salary_expectation_max?.toString() || '',
        preferred_currency: profile.preferred_currency || 'USD',
      });
      setSkills(profile.skills || []);
      setEducation(profile.education || []);
      setCertifications(profile.certifications || []);
      setLanguages(profile.languages || []);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = {
      ...formData,
      experience_years: Number(formData.experience_years),
      salary_expectation_min: formData.salary_expectation_min ? Number(formData.salary_expectation_min) : undefined,
      salary_expectation_max: formData.salary_expectation_max ? Number(formData.salary_expectation_max) : undefined,
      skills,
      education,
      certifications,
      languages,
    };

    try {
      if (profile) {
        await updateProfile(profileData);
        toast({
          title: "Profile Updated",
          description: "Your applicant profile has been updated successfully.",
        });
      } else {
        await createProfile(profileData);
        toast({
          title: "Profile Created",
          description: "Your applicant profile has been created successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addItem = (item: string, setItem: (value: string) => void, list: string[], setList: (value: string[]) => void) => {
    if (item.trim() && !list.includes(item.trim())) {
      setList([...list, item.trim()]);
      setItem('');
    }
  };

  const removeItem = (item: string, list: string[], setList: (value: string[]) => void) => {
    setList(list.filter(i => i !== item));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {profile ? 'Update' : 'Create'} Applicant Profile
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select value={formData.availability} onValueChange={(value: 'immediate' | 'two_weeks' | 'one_month' | 'flexible') => setFormData({ ...formData, availability: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="two_weeks">2 Weeks Notice</SelectItem>
                    <SelectItem value="one_month">1 Month Notice</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Professional Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <Label htmlFor="portfolio_url">Portfolio URL</Label>
                <Input
                  id="portfolio_url"
                  value={formData.portfolio_url}
                  onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div>
                <Label htmlFor="resume_url">Resume URL</Label>
                <Input
                  id="resume_url"
                  value={formData.resume_url}
                  onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                  placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience & Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Experience & Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="experience_years">Years of Experience</Label>
              <Input
                id="experience_years"
                type="number"
                min="0"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label>Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem(newSkill, setNewSkill, skills, setSkills);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem(newSkill, setNewSkill, skills, setSkills)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem(skill, skills, setSkills)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Education</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newEducation}
                  onChange={(e) => setNewEducation(e.target.value)}
                  placeholder="Add education (e.g., BS Computer Science, MIT)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem(newEducation, setNewEducation, education, setEducation);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem(newEducation, setNewEducation, education, setEducation)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {education.map((edu, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {edu}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem(edu, education, setEducation)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Certifications</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add certification"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem(newCertification, setNewCertification, certifications, setCertifications);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem(newCertification, setNewCertification, certifications, setCertifications)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {cert}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem(cert, certifications, setCertifications)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Languages</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add language"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem(newLanguage, setNewLanguage, languages, setLanguages);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem(newLanguage, setNewLanguage, languages, setLanguages)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {lang}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem(lang, languages, setLanguages)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Expectations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Salary Expectations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="salary_min">Minimum Salary</Label>
                <Input
                  id="salary_min"
                  type="number"
                  value={formData.salary_expectation_min}
                  onChange={(e) => setFormData({ ...formData, salary_expectation_min: e.target.value })}
                  placeholder="50000"
                />
              </div>
              <div>
                <Label htmlFor="salary_max">Maximum Salary</Label>
                <Input
                  id="salary_max"
                  type="number"
                  value={formData.salary_expectation_max}
                  onChange={(e) => setFormData({ ...formData, salary_expectation_max: e.target.value })}
                  placeholder="80000"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.preferred_currency} onValueChange={(value) => setFormData({ ...formData, preferred_currency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cover Letter Template */}
        <Card>
          <CardHeader>
            <CardTitle>Cover Letter Template</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.cover_letter_template}
              onChange={(e) => setFormData({ ...formData, cover_letter_template: e.target.value })}
              placeholder="Write a template cover letter that can be customized for different job applications..."
              rows={6}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
            {profile ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantProfileForm;
