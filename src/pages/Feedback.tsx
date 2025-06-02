
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const Feedback = () => {
  const tabs = ["Surveys", "Polls"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Tools</h1>
          <p className="text-gray-600">Create and manage feedback mechanisms for your startup ideas.</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`py-2 px-1 font-medium ${
                  index === 0
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Survey Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create a New Survey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Title
                </label>
                <Input placeholder="Survey Title" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Description
                </label>
                <Textarea placeholder="Survey Description" rows={4} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Questions
                </label>
                <div className="space-y-3">
                  <Input placeholder="Question 1" />
                  <Input placeholder="Question 2" />
                  <Input placeholder="Question 3" />
                </div>
                <Button variant="outline" className="mt-3">
                  Add Question
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Survey Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anonymous" />
                    <label htmlFor="anonymous" className="text-sm text-gray-700">
                      Allow anonymous responses
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="limit" />
                    <label htmlFor="limit" className="text-sm text-gray-700">
                      Set a response limit
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Survey
                </Button>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  New Idea
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Survey Management */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Surveys</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Eco-Packaging Feedback</h4>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Survey about sustainable packaging preferences
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>42 responses</span>
                      <span>Created 3 days ago</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Market Research Survey</h4>
                      <Badge variant="outline">Draft</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Understanding target market needs
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0 responses</span>
                      <span>Created 1 day ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📊 View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📋 Export Results
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🔗 Share Survey
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
