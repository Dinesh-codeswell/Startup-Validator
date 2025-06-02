
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, DollarSign, Zap, Clock, Target, TrendingUp } from "lucide-react";

interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  industry: string;
  targetAudience: string;
  revenueModel: string;
  difficulty: "Low" | "Medium" | "High";
  marketSize: string;
  keySteps: string[];
  trendScore: number;
  estimatedCosts: string;
  timeToMarket: string;
  competitionLevel: "Low" | "Medium" | "High";
}

const businessIdeas: BusinessIdea[] = [
  {
    id: "1",
    title: "AI-Powered Personal Finance Assistant",
    description: "An intelligent app that analyzes spending patterns, provides personalized budgeting advice, and automates savings based on user behavior and financial goals.",
    industry: "Fintech",
    targetAudience: "Young professionals aged 25-35",
    revenueModel: "Freemium subscription model",
    difficulty: "Medium",
    marketSize: "$1.2B by 2025",
    trendScore: 89,
    estimatedCosts: "$50K - $150K",
    timeToMarket: "8-12 months",
    competitionLevel: "Medium",
    keySteps: [
      "Develop AI algorithms for financial analysis",
      "Create intuitive mobile app interface",
      "Integrate with banking APIs",
      "Build trust through security certifications",
      "Launch with basic budgeting features"
    ]
  },
  {
    id: "2",
    title: "Remote Team Collaboration VR Platform",
    description: "A virtual reality platform designed for remote teams to collaborate in immersive 3D workspaces, conduct meetings, and brainstorm together as if they were in the same room.",
    industry: "SaaS",
    targetAudience: "Remote-first companies and distributed teams",
    revenueModel: "Per-seat subscription pricing",
    difficulty: "High",
    marketSize: "$800M by 2026",
    trendScore: 94,
    estimatedCosts: "$200K - $500K",
    timeToMarket: "12-18 months",
    competitionLevel: "Low",
    keySteps: [
      "Develop VR collaboration tools",
      "Create cross-platform compatibility",
      "Build meeting and whiteboard features",
      "Partner with VR hardware manufacturers",
      "Target early adopter companies"
    ]
  },
  {
    id: "3",
    title: "Sustainable Local Marketplace",
    description: "A hyperlocal marketplace connecting consumers with sustainable, locally-sourced products from farmers, artisans, and eco-friendly businesses within a 50-mile radius.",
    industry: "E-commerce",
    targetAudience: "Environmentally conscious consumers",
    revenueModel: "Commission on transactions + premium seller features",
    difficulty: "Low",
    marketSize: "$600M and growing",
    trendScore: 76,
    estimatedCosts: "$30K - $80K",
    timeToMarket: "4-8 months",
    competitionLevel: "Medium",
    keySteps: [
      "Build marketplace platform",
      "Recruit local vendors and producers",
      "Develop delivery logistics system",
      "Create sustainability verification process",
      "Launch in one city and expand gradually"
    ]
  },
  {
    id: "4",
    title: "AI-Driven Mental Health Companion",
    description: "An AI-powered mental health app that provides personalized therapy techniques, mood tracking, and crisis intervention while connecting users with licensed therapists when needed.",
    industry: "HealthTech",
    targetAudience: "Adults seeking mental health support",
    revenueModel: "Subscription + insurance billing",
    difficulty: "High",
    marketSize: "$2.4B by 2025",
    trendScore: 91,
    estimatedCosts: "$100K - $300K",
    timeToMarket: "10-15 months",
    competitionLevel: "High",
    keySteps: [
      "Develop AI therapy algorithms",
      "Ensure HIPAA compliance",
      "Partner with licensed therapists",
      "Create crisis intervention protocols",
      "Build evidence-based therapy modules"
    ]
  },
  {
    id: "5",
    title: "Smart Home Energy Optimizer",
    description: "IoT-enabled system that learns household energy usage patterns and automatically optimizes consumption to reduce bills and carbon footprint.",
    industry: "CleanTech",
    targetAudience: "Homeowners interested in sustainability",
    revenueModel: "Hardware sales + monthly service fee",
    difficulty: "Medium",
    marketSize: "$950M by 2026",
    trendScore: 82,
    estimatedCosts: "$75K - $200K",
    timeToMarket: "6-10 months",
    competitionLevel: "Medium",
    keySteps: [
      "Design IoT sensors and controllers",
      "Develop machine learning algorithms",
      "Create mobile app for monitoring",
      "Partner with utility companies",
      "Pilot test with early adopters"
    ]
  },
  {
    id: "6",
    title: "Micro-Learning Career Platform",
    description: "Professional development platform delivering 5-minute daily skill sessions with gamification, peer challenges, and AI-powered career path recommendations.",
    industry: "EdTech",
    targetAudience: "Working professionals seeking career growth",
    revenueModel: "Corporate subscriptions + individual premium plans",
    difficulty: "Low",
    marketSize: "$1.8B by 2025",
    trendScore: 78,
    estimatedCosts: "$40K - $120K",
    timeToMarket: "5-9 months",
    competitionLevel: "High",
    keySteps: [
      "Curate micro-learning content library",
      "Build gamification engine",
      "Develop AI recommendation system",
      "Create corporate sales strategy",
      "Launch with beta corporate clients"
    ]
  }
];

const BusinessIdeaSuggestions = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getTrendScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">AI-Generated Business Ideas</h2>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Updated Daily
        </Badge>
      </div>
      
      <div className="grid gap-6">
        {businessIdeas.map((idea) => (
          <Card key={idea.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl text-gray-900">{idea.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className={`text-sm font-medium ${getTrendScoreColor(idea.trendScore)}`}>
                        {idea.trendScore}/100
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{idea.industry}</Badge>
                    <Badge className={getDifficultyColor(idea.difficulty)}>
                      {idea.difficulty} Complexity
                    </Badge>
                    <Badge variant="outline">💰 {idea.marketSize}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">{idea.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-sm">Target Audience</span>
                    </div>
                    <p className="text-sm text-gray-600">{idea.targetAudience}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-sm">Revenue Model</span>
                    </div>
                    <p className="text-sm text-gray-600">{idea.revenueModel}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-medium text-gray-700">Time to Market</span>
                      </div>
                      <p className="text-sm text-gray-600">{idea.timeToMarket}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Target className="w-3 h-3 text-red-600" />
                        <span className="text-xs font-medium text-gray-700">Competition</span>
                      </div>
                      <p className={`text-sm font-medium ${getCompetitionColor(idea.competitionLevel)}`}>
                        {idea.competitionLevel}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-sm">Estimated Startup Costs</span>
                    </div>
                    <p className="text-sm text-gray-600">{idea.estimatedCosts}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Implementation Roadmap</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {idea.keySteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const url = `/submit?title=${encodeURIComponent(idea.title)}&description=${encodeURIComponent(idea.description)}&industry=${encodeURIComponent(idea.industry)}`;
                    window.location.href = url;
                  }}
                >
                  Start with This Idea
                </Button>
                <Button variant="outline" className="flex-1">
                  Save for Later
                </Button>
                <Button variant="ghost" size="sm">
                  Share Idea
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">Need a Custom Idea?</h3>
          <p className="text-indigo-700 mb-4">
            Our AI can generate personalized startup ideas based on your skills, interests, and market preferences.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Generate Custom Ideas
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessIdeaSuggestions;
