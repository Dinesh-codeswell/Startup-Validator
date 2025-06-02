
import Header from "@/components/Header";
import IdeaCard from "@/components/IdeaCard";
import BusinessIdeaSuggestions from "@/components/BusinessIdeaSuggestions";
import EditProfile from "@/components/EditProfile";
import SocialFeed from "@/components/SocialFeed";
import TrendingIdeas from "@/components/TrendingIdeas";
import Gamification from "@/components/Gamification";
import StartupNews from "@/components/StartupNews";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useUserIdeas } from "@/hooks/useUserIdeas";
import { useUserStats } from "@/hooks/useUserStats";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Lightbulb, 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Plus, 
  Target, 
  Trophy,
  Newspaper,
  Award
} from "lucide-react";

const Ideas = () => {
  const { profile } = useProfile();
  const { ideas, loading } = useUserIdeas();
  const { stats } = useUserStats();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("my-ideas");
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const handleViewIdea = (title: string) => {
    toast({
      title: "Idea Details",
      description: `Viewing details for: ${title}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your innovation hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section with Background */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-8 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Innovation Ecosystem</h1>
            <p className="text-xl text-blue-100 mb-6">Connect, collaborate, and transform ideas into successful ventures</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>Idea Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Community Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Market Analysis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
              <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl">
                {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {profile?.full_name || 'Welcome, Innovator!'}
              </h2>
              <p className="text-blue-600 font-medium">{profile?.role || 'Entrepreneur'}</p>
              <p className="text-gray-600">
                {profile?.company_name || 'Independent'} • {profile?.industry || 'Various Industries'}
              </p>
              {stats && (
                <p className="text-purple-600 font-medium">
                  Level {stats.level} • {stats.total_xp} XP
                </p>
              )}
            </div>
          </div>
          <Button onClick={() => setEditProfileOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            Edit Profile
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Ideas</p>
                  <p className="text-3xl font-bold text-blue-900">{ideas.length}</p>
                  <p className="text-xs text-blue-600 mt-1">Your innovation portfolio</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  💡
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Current Level</p>
                  <p className="text-3xl font-bold text-green-900">{stats?.level || 1}</p>
                  <p className="text-xs text-green-600 mt-1">Keep innovating!</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  🚀
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total XP</p>
                  <p className="text-3xl font-bold text-purple-900">{stats?.total_xp || 0}</p>
                  <p className="text-xs text-purple-600 mt-1">Experience points</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  ⭐
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Login Streak</p>
                  <p className="text-3xl font-bold text-orange-900">{stats?.login_streak || 0}</p>
                  <p className="text-xs text-orange-600 mt-1">Days in a row</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  🔥
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto bg-white shadow-sm border">
            <TabsTrigger 
              value="my-ideas" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">My Ideas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="suggestions" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">AI Suggestions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger 
              value="news" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Newspaper className="w-4 h-4" />
              <span className="hidden sm:inline">News</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gamification" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-ideas" className="space-y-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Innovation Portfolio</h2>
                <p className="text-gray-600">Track and manage your startup ideas from concept to launch</p>
              </div>
              <Button 
                onClick={() => window.location.href = '/submit'} 
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Idea
              </Button>
            </div>

            <div className="space-y-4">
              {ideas.length === 0 ? (
                <Card className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      💡
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to start innovating?</h3>
                    <p className="text-gray-600 mb-6">Transform your ideas into successful startups with AI-powered insights and community validation!</p>
                    <Button 
                      onClick={() => window.location.href = '/submit'} 
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Your First Idea
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                ideas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    title={idea.title}
                    status={idea.status as "Active" | "Archived"}
                    feedback="0 comments"
                    lastUpdated={new Date(idea.updated_at).toLocaleDateString()}
                    onView={() => handleViewIdea(idea.title)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <BusinessIdeaSuggestions />
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <SocialFeed />
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <TrendingIdeas />
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <StartupNews />
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <Gamification />
          </TabsContent>
        </Tabs>
      </main>

      <EditProfile open={editProfileOpen} onOpenChange={setEditProfileOpen} />
    </div>
  );
};

export default Ideas;
