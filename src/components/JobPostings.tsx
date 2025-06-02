
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Plus,
  Building,
  Users,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface JobPosting {
  id: string;
  company_name: string;
  job_title: string;
  job_description: string;
  location: string | null;
  job_type: string;
  experience_level: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string;
  skills_required: string[] | null;
  benefits: string[] | null;
  application_deadline: string | null;
  application_url: string | null;
  application_email: string | null;
  featured: boolean;
  created_at: string;
}

const JobPostings = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [newJob, setNewJob] = useState({
    company_name: '',
    job_title: '',
    job_description: '',
    location: '',
    job_type: 'full-time',
    experience_level: 'mid',
    salary_min: '',
    salary_max: '',
    skills_required: '',
    benefits: '',
    application_deadline: '',
    application_url: '',
    application_email: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('is_active', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load job postings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post a job",
        variant: "destructive"
      });
      return;
    }

    try {
      const jobData = {
        user_id: user.id,
        company_name: newJob.company_name,
        job_title: newJob.job_title,
        job_description: newJob.job_description,
        location: newJob.location || null,
        job_type: newJob.job_type,
        experience_level: newJob.experience_level,
        salary_min: newJob.salary_min ? parseInt(newJob.salary_min) : null,
        salary_max: newJob.salary_max ? parseInt(newJob.salary_max) : null,
        skills_required: newJob.skills_required ? newJob.skills_required.split(',').map(s => s.trim()) : null,
        benefits: newJob.benefits ? newJob.benefits.split(',').map(s => s.trim()) : null,
        application_deadline: newJob.application_deadline || null,
        application_url: newJob.application_url || null,
        application_email: newJob.application_email || null
      };

      const { error } = await supabase
        .from('job_postings')
        .insert([jobData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job posting created successfully!"
      });

      setIsCreateModalOpen(false);
      setNewJob({
        company_name: '',
        job_title: '',
        job_description: '',
        location: '',
        job_type: 'full-time',
        experience_level: 'mid',
        salary_min: '',
        salary_max: '',
        skills_required: '',
        benefits: '',
        application_deadline: '',
        application_url: '',
        application_email: ''
      });
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "Failed to create job posting",
        variant: "destructive"
      });
    }
  };

  const formatSalary = (min: number | null, max: number | null, currency: string) => {
    if (!min && !max) return null;
    if (min && max) return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    if (min) return `${currency} ${min.toLocaleString()}+`;
    if (max) return `Up to ${currency} ${max.toLocaleString()}`;
    return null;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Job Opportunities
          </h2>
        </div>
        
        {user && (
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Post a Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Job Posting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      value={newJob.company_name}
                      onChange={(e) => setNewJob({ ...newJob, company_name: e.target.value })}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Job Title</label>
                    <Input
                      value={newJob.job_title}
                      onChange={(e) => setNewJob({ ...newJob, job_title: e.target.value })}
                      placeholder="e.g. Senior Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Job Description</label>
                  <Textarea
                    value={newJob.job_description}
                    onChange={(e) => setNewJob({ ...newJob, job_description: e.target.value })}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      placeholder="e.g. San Francisco, CA or Remote"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Job Type</label>
                    <Select value={newJob.job_type} onValueChange={(value) => setNewJob({ ...newJob, job_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select value={newJob.experience_level} onValueChange={(value) => setNewJob({ ...newJob, experience_level: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry</SelectItem>
                        <SelectItem value="mid">Mid</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Min Salary</label>
                    <Input
                      type="number"
                      value={newJob.salary_min}
                      onChange={(e) => setNewJob({ ...newJob, salary_min: e.target.value })}
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Max Salary</label>
                    <Input
                      type="number"
                      value={newJob.salary_max}
                      onChange={(e) => setNewJob({ ...newJob, salary_max: e.target.value })}
                      placeholder="100000"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Required Skills (comma-separated)</label>
                  <Input
                    value={newJob.skills_required}
                    onChange={(e) => setNewJob({ ...newJob, skills_required: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Benefits (comma-separated)</label>
                  <Input
                    value={newJob.benefits}
                    onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
                    placeholder="Health insurance, 401k, Remote work"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Application URL</label>
                    <Input
                      value={newJob.application_url}
                      onChange={(e) => setNewJob({ ...newJob, application_url: e.target.value })}
                      placeholder="https://company.com/apply"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Application Email</label>
                    <Input
                      value={newJob.application_email}
                      onChange={(e) => setNewJob({ ...newJob, application_email: e.target.value })}
                      placeholder="jobs@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Application Deadline</label>
                  <Input
                    type="date"
                    value={newJob.application_deadline}
                    onChange={(e) => setNewJob({ ...newJob, application_deadline: e.target.value })}
                  />
                </div>

                <Button onClick={handleCreateJob} className="w-full">
                  Create Job Posting
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {jobs.length === 0 ? (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Jobs Posted Yet</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Be the first to post a job opportunity and help connect talented individuals with great companies.
            </p>
            {user && (
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Post the First Job
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className={`hover:shadow-lg transition-shadow ${job.featured ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.job_title}</h3>
                      {job.featured && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{job.company_name}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{job.job_description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {job.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="capitalize">{job.experience_level} level</span>
                  </div>

                  {formatSalary(job.salary_min, job.salary_max, job.currency) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatSalary(job.salary_min, job.salary_max, job.currency)}</span>
                    </div>
                  )}
                </div>

                {job.skills_required && job.skills_required.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills_required.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills_required.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills_required.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {job.application_url && (
                      <Button asChild size="sm">
                        <a href={job.application_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </a>
                      </Button>
                    )}
                    {job.application_email && !job.application_url && (
                      <Button asChild size="sm">
                        <a href={`mailto:${job.application_email}`}>
                          Apply via Email
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostings;
