"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignCard } from "@/components/sign-card"
import { SignModal } from "@/components/sign-modal"
import { BookOpen, Hash, MessageCircle, Users } from "lucide-react"

export default function LearnPage() {
  const [selectedSign, setSelectedSign] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Alphabet data
  const alphabet = Array.from({ length: 26 }, (_, i) => ({
    letter: String.fromCharCode(65 + i),
    title: `Letter ${String.fromCharCode(65 + i)}`,
    description: `Learn how to sign the letter ${String.fromCharCode(65 + i)} in Indian Sign Language.`,
    imageUrl: `/placeholder.svg?height=200&width=200&query=ISL+sign+letter+${String.fromCharCode(65 + i)}`,
  }))

  // Numbers data
  const numbers = Array.from({ length: 10 }, (_, i) => ({
    letter: i.toString(),
    title: `Number ${i}`,
    description: `Learn how to sign the number ${i} in Indian Sign Language.`,
    imageUrl: `/placeholder.svg?height=200&width=200&query=ISL+sign+number+${i}`,
  }))

  // Common words data
  const commonWords = [
    { letter: "Hello", title: "Hello", description: "A common greeting in ISL." },
    { letter: "Thank You", title: "Thank You", description: "Express gratitude in ISL." },
    { letter: "Please", title: "Please", description: "A polite request in ISL." },
    { letter: "Sorry", title: "Sorry", description: "Apologize in ISL." },
    { letter: "Yes", title: "Yes", description: "Affirmative response in ISL." },
    { letter: "No", title: "No", description: "Negative response in ISL." },
    { letter: "Help", title: "Help", description: "Ask for assistance in ISL." },
    { letter: "Water", title: "Water", description: "Essential word for daily needs." },
    { letter: "Food", title: "Food", description: "Basic necessity sign in ISL." },
    { letter: "Home", title: "Home", description: "Sign for home or house." },
    { letter: "Family", title: "Family", description: "Important relationship sign." },
    { letter: "Friend", title: "Friend", description: "Social relationship sign." },
  ].map((word) => ({
    ...word,
    imageUrl: `/placeholder.svg?height=200&width=200&query=ISL+sign+${word.letter.replace(" ", "+")}`,
  }))

  // Greetings data
  const greetings = [
    { letter: "Good Morning", title: "Good Morning", description: "Morning greeting in ISL." },
    { letter: "Good Evening", title: "Good Evening", description: "Evening greeting in ISL." },
    { letter: "Good Night", title: "Good Night", description: "Night greeting in ISL." },
    { letter: "How are you?", title: "How are you?", description: "Common question in ISL." },
    { letter: "Nice to meet you", title: "Nice to meet you", description: "Polite introduction in ISL." },
    { letter: "See you later", title: "See you later", description: "Casual goodbye in ISL." },
  ].map((greeting) => ({
    ...greeting,
    imageUrl: `/placeholder.svg?height=200&width=200&query=ISL+sign+${greeting.letter.replace(/[^a-zA-Z]/g, "+")}`,
  }))

  const handleSignClick = (sign: any) => {
    setSelectedSign(sign)
    setIsModalOpen(true)
  }

  const categories = [
    {
      id: "alphabet",
      title: "Alphabet (A-Z)",
      icon: BookOpen,
      description: "Master the ISL alphabet with visual demonstrations",
      data: alphabet,
    },
    {
      id: "numbers",
      title: "Numbers (0-9)",
      icon: Hash,
      description: "Learn to sign numbers in Indian Sign Language",
      data: numbers,
    },
    {
      id: "words",
      title: "Common Words",
      icon: MessageCircle,
      description: "Essential vocabulary for daily communication",
      data: commonWords,
    },
    {
      id: "greetings",
      title: "Greetings",
      icon: Users,
      description: "Polite expressions and social interactions",
      data: greetings,
    },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Learn Indian Sign Language</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Start your ISL journey with our comprehensive learning modules. Click on any sign to see detailed
            demonstrations and practice guides.
          </p>
        </div>

        {/* Category Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={category.id} className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">{category.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{category.data.length} signs available</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Tabs */}
        <Tabs defaultValue="alphabet" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {category.data.map((sign, index) => (
                  <SignCard
                    key={sign.letter}
                    letter={sign.letter}
                    title={sign.title}
                    imageUrl={sign.imageUrl}
                    onClick={() => handleSignClick(sign)}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Progress Section */}
        <Card className="mt-12 border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Track Your Progress</h3>
            <p className="text-muted-foreground mb-6 text-pretty">
              Keep learning consistently to master ISL. Practice makes perfect!
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">View Progress</Button>
              <Button>Continue Learning</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sign Modal */}
      <SignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} sign={selectedSign} />
    </div>
  )
}
