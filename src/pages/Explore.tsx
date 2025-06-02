
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { BookOpen, TrendingUp, Target, Clock, Star, Users, DollarSign, Building, Calendar, Award, Sparkles } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import CaseStudyModal from "@/components/CaseStudyModal";
import EnhancedTrendingInsights from "@/components/EnhancedTrendingInsights";
import Gamification from "@/components/Gamification";
import { DataLoader } from "@/components/LoadingAnimations";

type IndustryType = Database["public"]["Enums"]["industry_type"];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'case-studies' | 'insights' | 'gamification'>('case-studies');
  
  const categories = [
    "All", 
    "fintech", 
    "edtech", 
    "healthtech", 
    "ecommerce", 
    "saas", 
    "marketplace", 
    "social", 
    "gaming", 
    "ai_ml", 
    "blockchain", 
    "iot", 
    "other"
  ];
  
  const { data: dbCaseStudies = [], isLoading: isLoadingDB } = useQuery({
    queryKey: ['case-studies', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (selectedCategory !== "All") {
        query = query.eq('industry', selectedCategory as IndustryType);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching case studies:', error);
        return [];
      }
      
      return data || [];
    },
  });

  // Function to open case study modal
  const openCaseStudyModal = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const allCaseStudies = dbCaseStudies;

  if (isLoadingDB && activeTab === 'case-studies') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <DataLoader message="Loading success stories..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <h1 className="text-4xl font-bold">Discover, Learn & Grow</h1>
            </div>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl">
              Explore success stories, get AI-powered insights, and gamify your entrepreneurial journey with real-time market trends.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Building className="w-5 h-5" />
                <span>{allCaseStudies.length} Success Stories</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Award className="w-5 h-5" />
                <span>Live AI Insights</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
                <span>Gamified Learning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-1 bg-white/80 backdrop-blur-sm p-1 rounded-xl w-fit shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab('case-studies')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'case-studies'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2 inline" />
              Case Studies
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'insights'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              AI Insights
            </button>
            <button
              onClick={() => setActiveTab('gamification')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'gamification'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Star className="w-4 h-4 mr-2 inline" />
              Achievements
            </button>
          </div>
        </div>

        {activeTab === 'case-studies' && (
          <>
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Success Stories</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {allCaseStudies.length}
                      </p>
                      <p className="text-xs text-emerald-600 mt-1 font-medium">Recently updated</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Industries</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {categories.length - 1}
                      </p>
                      <p className="text-xs text-emerald-600 mt-1 font-medium">All major sectors</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Community</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Active
                      </p>
                      <p className="text-xs text-purple-600 mt-1 font-medium">Growing daily</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">AI Insights</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Live
                      </p>
                      <p className="text-xs text-orange-600 mt-1 font-medium">Real-time data</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                Explore by Industry
              </h2>
              <p className="text-slate-600 mb-6 text-lg">
                Discover real startup journeys from successful entrepreneurs.
              </p>
              
              {/* Enhanced Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant={category === selectedCategory ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 px-4 py-2 text-sm font-medium rounded-full ${
                      category === selectedCategory 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" 
                        : "hover:bg-slate-100 hover:scale-105"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "ai_ml" ? "AI/ML" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCaseStudies.map((caseStudy, index) => (
                <Card 
                  key={caseStudy.id} 
                  className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
                  onClick={() => openCaseStudyModal(caseStudy)}
                >
                  <div className="relative">
                    {caseStudy.image_url && (
                      <img 
                        src={caseStudy.image_url} 
                        alt={caseStudy.company_name}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-black/70 text-white backdrop-blur-sm">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors duration-300">
                      {caseStudy.company_name}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="capitalize bg-white/50">
                        {caseStudy.industry}
                      </Badge>
                      {caseStudy.current_valuation && (
                        <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                          {caseStudy.current_valuation}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                      {caseStudy.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{caseStudy.timeline || 'Timeline TBD'}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-700 p-0 hover:bg-transparent"
                      >
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'insights' && <EnhancedTrendingInsights />}
        {activeTab === 'gamification' && <Gamification />}

        {/* Enhanced Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-0 shadow-2xl">
          <CardContent className="p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-purple-100 mb-6 text-lg max-w-2xl mx-auto">
              Join thousands of entrepreneurs, share your ideas, and build the next big thing with AI-powered insights.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/submit'}
            >
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </main>

      <CaseStudyModal 
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Explore;
