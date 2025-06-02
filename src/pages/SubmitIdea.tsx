
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUserIdeas } from "@/hooks/useUserIdeas";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Target, Users, TrendingUp } from "lucide-react";

const SubmitIdea = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { createIdea } = useUserIdeas();
  const { toast } = useToast();

  // Pre-fill form from URL parameters (when coming from idea suggestions)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const titleParam = urlParams.get('title');
    const descriptionParam = urlParams.get('description');
    const industryParam = urlParams.get('industry');
    
    if (titleParam) setTitle(titleParam);
    if (descriptionParam) setDescription(descriptionParam);
    if (industryParam) setIndustry(industryParam);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await createIdea({
        title,
        description,
        target_audience: targetAudience,
        problem_solved: problemSolved,
        industry,
        status: 'submitted',
      });

      if (error) {
        const errorMessage = typeof error === 'string' ? error : 'Failed to submit idea';
        toast({
          variant: "destructive",
          title: "Error submitting idea",
          description: errorMessage,
        });
      } else {
        toast({
          title: "Idea submitted successfully!",
          description: "Your startup idea has been submitted for validation.",
        });
        
        // Reset form
        setTitle("");
        setDescription("");
        setTargetAudience("");
        setProblemSolved("");
        setIndustry("");
        
        // Redirect to ideas page
        setTimeout(() => {
          window.location.href = '/ideas';
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Share Your Startup Idea</h1>
                <p className="text-green-100">Transform your vision into reality</p>
              </div>
            </div>
            <p className="text-lg">Fill out the form below to submit your idea for validation and expert feedback from our community.</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Get Validation</h3>
            </div>
            <p className="text-sm text-gray-600">Receive expert feedback and validation from experienced entrepreneurs and investors.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Join Community</h3>
            </div>
            <p className="text-sm text-gray-600">Connect with like-minded founders and build valuable networking relationships.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Track Progress</h3>
            </div>
            <p className="text-sm text-gray-600">Monitor your idea's development and iterate based on community insights.</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title" className="text-base font-medium">Idea Title *</Label>
                  <Input 
                    id="title"
                    placeholder="Enter a concise title for your startup idea"
                    className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-base font-medium">Detailed Description *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Provide a comprehensive description of your startup idea, including its core features and functionality"
                    rows={6}
                    className="mt-2 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="industry" className="text-base font-medium">Industry</Label>
                  <Input 
                    id="industry"
                    placeholder="e.g., Technology, Healthcare, Education"
                    className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="targetAudience" className="text-base font-medium">Target Audience</Label>
                  <Textarea 
                    id="targetAudience"
                    placeholder="Specify the demographic or group of people your startup aims to serve"
                    rows={3}
                    className="mt-2 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="problemSolved" className="text-base font-medium">Problem Solved</Label>
                  <Textarea 
                    id="problemSolved"
                    placeholder="Describe the specific problem your startup addresses and how it solves it"
                    rows={4}
                    className="mt-2 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={problemSolved}
                    onChange={(e) => setProblemSolved(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-base font-medium"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Idea'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SubmitIdea;
