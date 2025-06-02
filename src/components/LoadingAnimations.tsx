
import React from 'react';
import { Sparkles, Rocket, Lightbulb, TrendingUp } from 'lucide-react';

export const PulseLoader = () => (
  <div className="flex space-x-2">
    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-75"></div>
    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse delay-150"></div>
  </div>
);

export const SparkleLoader = () => (
  <div className="relative w-12 h-12">
    <div className="absolute inset-0 animate-spin">
      <Sparkles className="w-6 h-6 text-yellow-500 absolute top-0 left-1/2 transform -translate-x-1/2" />
      <Sparkles className="w-4 h-4 text-blue-500 absolute bottom-0 right-0" />
      <Sparkles className="w-3 h-3 text-purple-500 absolute bottom-0 left-0" />
    </div>
  </div>
);

export const RocketLoader = () => (
  <div className="relative w-16 h-16">
    <div className="absolute inset-0 animate-bounce">
      <Rocket className="w-8 h-8 text-blue-600 absolute top-0 left-1/2 transform -translate-x-1/2 rotate-45" />
    </div>
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
  </div>
);

export const IdeaLoader = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <Lightbulb className="w-8 h-8 text-yellow-500 animate-pulse" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
    </div>
    <div className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Generating brilliant ideas...
    </div>
  </div>
);

export const DataLoader = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center space-y-4 p-8">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      <TrendingUp className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
    </div>
    <p className="text-gray-600 font-medium animate-pulse">{message}</p>
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm border animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div className="flex space-x-2 mt-4">
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
    </div>
  </div>
);

export const WaveLoader = () => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="w-2 h-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full animate-pulse"
        style={{
          animationDelay: `${i * 0.1}s`,
          animationDuration: '1s'
        }}
      ></div>
    ))}
  </div>
);
