
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import EnhancedAnalytics from "@/components/EnhancedAnalytics";
import SocialFeed from "@/components/SocialFeed";
import TrendingIdeas from "@/components/TrendingIdeas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useUserIdeas } from "@/hooks/useUserIdeas";
import { useRealTimeAnalytics } from "@/hooks/useRealTimeAnalytics";
import { useNotifications } from "@/hooks/useNotifications";
import { BarChart3, Users, TrendingUp, Zap, Plus, Target, Clock, Award } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { ideas: userIdeas } = useUserIdeas();
  const { analytics, trackEvent } = useRealTimeAnalytics();
  const { unreadCount } = useNotifications();

  const totalIdeas = userIdeas.length;
  const submittedIdeas = userIdeas.filter(idea => idea.status === 'submitted').length;
  const approvedIdeas = userIdeas.filter(idea => idea.status === 'approved').length;

  const handleCreateIdea = () => {
    trackEvent('create_idea_clicked');
    window.location.href = '/submit';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}! 👋</h1>
                <p className="text-xl text-blue-100">Ready to innovate and transform your ideas into reality?</p>
              </div>
              {unreadCount > 0 && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-sm font-medium">You have</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                  <p className="text-sm">new notifications</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Community Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Real-time Insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-dashed border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100" onClick={handleCreateIdea}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Create New Idea</h3>
              <p className="text-blue-700 text-sm">Start your next innovation journey</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/explore'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">Explore Case Studies</h3>
              <p className="text-emerald-700 text-sm">Learn from successful startups</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/feedback'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Get Feedback</h3>
              <p className="text-purple-700 text-sm">Connect with the community</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="w-4 h-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Zap className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Innovation Analytics</h2>
              <p className="text-gray-600">Track your progress and validate your startup ideas with real-time insights.</p>
            </div>

            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Ideas</p>
                      <p className="text-3xl font-bold text-blue-900">{totalIdeas}</p>
                      <p className="text-xs text-blue-600 mt-1">Your innovations</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      💡
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 text-sm font-medium">Submitted</p>
                      <p className="text-3xl font-bold text-emerald-900">{submittedIdeas}</p>
                      <p className="text-xs text-emerald-600 mt-1">Under review</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                      📝
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Engagement</p>
                      <p className="text-3xl font-bold text-purple-900">{Math.round(analytics.engagement_score)}</p>
                      <p className="text-xs text-purple-600 mt-1">Activity score</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      ⭐
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Time Spent</p>
                      <p className="text-3xl font-bold text-orange-900">{Math.round(analytics.time_spent / 60)}h</p>
                      <p className="text-xs text-orange-600 mt-1">Platform usage</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <EnhancedAnalytics />

            {/* Action Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Ready to Launch Your Next Idea?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 leading-relaxed mb-4">
                  {totalIdeas > 0 
                    ? `You have created ${totalIdeas} startup idea${totalIdeas > 1 ? 's' : ''}. ${submittedIdeas > 0 ? `${submittedIdeas} are submitted for review.` : 'Consider submitting your ideas for validation.'}`
                    : 'Start by creating your first startup idea. Use our AI-powered validation system to get detailed feedback and market insights.'
                  }
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleCreateIdea}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {totalIdeas > 0 ? 'Create Another Idea' : 'Create Your First Idea'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <SocialFeed />
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <TrendingIdeas />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI-Powered Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-purple-900">Emerging Trend: AI-Powered Solutions</h4>
                        <p className="text-purple-700 text-sm">Market opportunity increased by 45% this quarter. Focus on automation and intelligent systems.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-purple-900">Rising Demand: Sustainable Tech</h4>
                        <p className="text-purple-700 text-sm">ESG-focused startups are attracting 67% more investment. Consider environmental impact.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-purple-900">Market Gap: Remote Work Tools</h4>
                        <p className="text-purple-700 text-sm">Remote work solutions show 40% growth potential in the next 12 months.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Success Patterns Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-900 mb-3">Top Industries This Quarter</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">AI/ML</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-green-200 rounded-full">
                              <div className="w-16 h-2 bg-green-600 rounded-full"></div>
                            </div>
                            <span className="text-xs text-green-600">82%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">HealthTech</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-green-200 rounded-full">
                              <div className="w-14 h-2 bg-green-600 rounded-full"></div>
                            </div>
                            <span className="text-xs text-green-600">75%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">FinTech</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-green-200 rounded-full">
                              <div className="w-12 h-2 bg-green-600 rounded-full"></div>
                            </div>
                            <span className="text-xs text-green-600">68%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900 mb-3">Key Success Factors</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          Strong problem-solution fit
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          Early user validation
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          Scalable business model
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          Technical feasibility
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
