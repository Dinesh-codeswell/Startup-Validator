
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, BookOpen, TrendingUp, Star, Calendar, DollarSign, Building, ExternalLink, X } from "lucide-react";

interface CaseStudy {
  id: string;
  company_name: string;
  industry: string;
  description: string;
  timeline: string;
  funding?: string;
  current_valuation?: string;
  mvp_features: string[];
  key_learnings: string[];
  market_scenario: string;
  roadmap_content?: string;
  source_url?: string;
  image_url?: string;
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = ({ caseStudy, isOpen, onClose }: CaseStudyModalProps) => {
  if (!caseStudy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {caseStudy.company_name}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          {caseStudy.image_url && (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img 
                src={caseStudy.image_url} 
                alt={caseStudy.company_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header Info */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="capitalize bg-blue-50 text-blue-700 border-blue-200">
              {caseStudy.industry}
            </Badge>
            {caseStudy.funding && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                💰 {caseStudy.funding}
              </Badge>
            )}
            {caseStudy.current_valuation && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                📈 {caseStudy.current_valuation}
              </Badge>
            )}
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              <Calendar className="w-3 h-3 mr-1" />
              {caseStudy.timeline}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Company Overview</h3>
            <p className="text-gray-700 leading-relaxed">{caseStudy.description}</p>
          </div>

          {/* MVP Features & Key Learnings Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-gray-900">MVP Features</h4>
                </div>
                <ul className="space-y-3">
                  {caseStudy.mvp_features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  <h4 className="font-bold text-gray-900">Key Learnings</h4>
                </div>
                <ul className="space-y-3">
                  {caseStudy.key_learnings.map((learning, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{learning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Market Strategy */}
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h4 className="font-bold text-gray-900">Market Strategy & Context</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">{caseStudy.market_scenario}</p>
            </CardContent>
          </Card>
          
          {/* Growth Roadmap */}
          {caseStudy.roadmap_content && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-orange-600" />
                  <h4 className="font-bold text-gray-900">Growth Roadmap</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">{caseStudy.roadmap_content}</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            {caseStudy.source_url && (
              <Button 
                variant="outline" 
                onClick={() => window.open(caseStudy.source_url, '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Company
              </Button>
            )}
            <div className="flex gap-3">
              <Button variant="outline">Save for Later</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Apply Learnings</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
