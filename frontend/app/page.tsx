"use client";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { TrendingUp, BarChart3, Zap } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary p-6 shadow-lg">
                <TrendingUp className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-3">
              <CardTitle className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sales Forecasting
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Leverage advanced analytics to predict sales performance by analyzing product and outlet characteristics
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-sm text-center">Accurate Predictions</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  ML-powered forecasting
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Zap className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-sm text-center">Quick Results</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Instant analysis
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-sm text-center">Data-Driven</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Evidence-based insights
                </p>
              </div>
            </div>

            <Button 
              className="w-full h-14 text-lg shadow-lg hover:shadow-xl transition-shadow" 
              variant="black"
              onClick={() => router.push("/form")}
            >
              Get Started
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

}


