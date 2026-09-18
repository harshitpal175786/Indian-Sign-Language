"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Languages, Users, Accessibility } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Learn ISL alphabet, numbers, and common phrases with visual demonstrations.",
    },
    {
      icon: Languages,
      title: "Real-time Translation",
      description: "Convert text to ISL signs and understand sign language in real-time.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other learners and native ISL speakers in our community.",
    },
    {
      icon: Accessibility,
      title: "Accessibility First",
      description: "Designed with accessibility in mind to ensure everyone can learn effectively.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
                Learn{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Indian Sign Language
                </span>{" "}
                with Confidence
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
                Master ISL through interactive lessons, real-time translations, and comprehensive resources. Break
                communication barriers and connect with the deaf community.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/learn">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent" asChild>
                  <Link href="/translate">Try Translator</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Everything you need to learn ISL
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Our comprehensive platform provides all the tools and resources you need to master Indian Sign Language.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-pretty">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Ready to start your ISL journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Join thousands of learners who are already mastering Indian Sign Language with our platform.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/learn">
                  Begin Learning Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
