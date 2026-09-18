"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TranslateBox } from "@/components/translate-box"
import { Type, Hand, Lightbulb, Clock } from "lucide-react"

export default function TranslatePage() {
  const [activeTab, setActiveTab] = useState("text-to-sign")

  const features = [
    {
      icon: Type,
      title: "Text to Signs",
      description: "Convert written text into ISL sign sequences with visual demonstrations.",
    },
    {
      icon: Hand,
      title: "Sign Recognition",
      description: "Upload videos or use camera to translate ISL signs back to text.",
    },
    {
      icon: Clock,
      title: "Real-time Translation",
      description: "Get instant translations with smooth animations and audio guides.",
    },
    {
      icon: Lightbulb,
      title: "Learning Integration",
      description: "Click on any sign to learn more about it in our learning section.",
    },
  ]

  const quickPhrases = [
    "Hello, how are you?",
    "Thank you very much",
    "Nice to meet you",
    "Can you help me?",
    "I am learning ISL",
    "What is your name?",
    "Good morning",
    "See you later",
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">ISL Translator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Bridge communication gaps with our intelligent ISL translation tool. Convert text to signs or signs to text
            with real-time processing.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Translation Interface */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="text-to-sign" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Text to Signs
              </TabsTrigger>
              <TabsTrigger value="sign-to-text" className="flex items-center gap-2">
                <Hand className="h-4 w-4" />
                Signs to Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text-to-sign" className="space-y-6">
              <TranslateBox mode="text-to-sign" />

              {/* Quick Phrases */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Phrases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickPhrases.map((phrase, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto p-3 text-left bg-transparent"
                        onClick={() => {
                          // This would set the phrase in the translate box
                          // For now, it's just a placeholder
                        }}
                      >
                        {phrase}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sign-to-text">
              <TranslateBox mode="sign-to-text" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Tips Section */}
        <Card className="mt-12 max-w-4xl mx-auto border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Translation Tips</h3>
              <p className="text-muted-foreground">Get the most out of our ISL translator</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-3">
                  <Type className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Keep it Simple</h4>
                <p className="text-sm text-muted-foreground">
                  Use clear, simple sentences for better translation accuracy.
                </p>
              </div>

              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-3">
                  <Hand className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Good Lighting</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure good lighting when recording signs for better recognition.
                </p>
              </div>

              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-3">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Practice</h4>
                <p className="text-sm text-muted-foreground">
                  Click on translated signs to learn more and practice them.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
