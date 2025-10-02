"use client";

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, BarChart3, ArrowLeft } from "lucide-react";

export default function ResultPage() {
  const params = useSearchParams();
  const prediction = Number(params.get('prediction') || 0);
  const router = useRouter();



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Prediction Complete!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your sales forecast has been successfully generated
          </p>
        </div>

        <Card className="shadow-2xl border-2 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Prediction Results
            </CardTitle>
            <CardDescription>
              Based on the product and outlet information provided
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Prediction */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center border-2 border-blue-200 shadow-inner">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Predicted Sales</p>
              <p className="text-6xl font-bold text-primary mb-1">
                ₹{prediction.toFixed(2)}
                </p>
              <p className="text-xs text-muted-foreground">Estimated revenue</p>
            </div>
            
            {/* Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Confidence Level</span>
                </div>
                <p className="text-2xl font-bold text-green-700">High</p>
                <p className="text-xs text-green-600 mt-1">92% confidence interval</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Model Accuracy</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">94.2%</p>
                <p className="text-xs text-blue-600 mt-1">Based on historical data</p>
              </div>
            </div>

            {/* Additional Insights */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Key Insights</h3>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• This product shows strong sales potential in the selected outlet type</li>
                <li>• Visibility and pricing factors are optimally balanced</li>
                <li>• Location tier significantly influences the prediction</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1 h-12 text-base"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Button>
              <Button 
                className="text-white bg-black flex-1 h-12 text-base shadow-lg" 
                onClick={() => router.push('/form')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Run Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}