"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Globe, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  const stats = [
    { number: "2.5M+", label: "Deaf individuals in India" },
    { number: "1000+", label: "Signs in our database" },
    { number: "50K+", label: "Active learners" },
    { number: "95%", label: "User satisfaction" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Accessibility First",
      description:
        "We believe communication is a fundamental human right. Our platform is designed to break down barriers and create inclusive experiences for everyone.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Built with input from the deaf community, ISL experts, and educators to ensure authenticity and cultural sensitivity in every feature.",
    },
    {
      icon: Globe,
      title: "Universal Access",
      description:
        "Making ISL education freely available to anyone, anywhere, helping bridge the communication gap in Indian society.",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description:
        "We constantly update our content and improve our technology based on user feedback and advances in sign language research.",
    },
  ]

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "ISL Expert & Advisor",
      description: "20+ years experience in deaf education and ISL research.",
    },
    {
      name: "Raj Patel",
      role: "Lead Developer",
      description: "Passionate about accessible technology and inclusive design.",
    },
    {
      name: "Meera Singh",
      role: "Community Manager",
      description: "Deaf community advocate and ISL interpreter.",
    },
    {
      name: "Arjun Kumar",
      role: "UX Designer",
      description: "Specialist in accessibility and user-centered design.",
    },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold text-foreground mb-6 text-balance">About Indian Sign Language</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Indian Sign Language (ISL) is the primary sign language used by the deaf community in India. It's a
              complete, natural language with its own grammar and syntax, serving as the mother tongue for millions of
              deaf Indians.
            </p>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ISL Importance Section */}
        <Card className="mb-16 border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why ISL Matters</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Indian Sign Language is not just a communication tool—it's a bridge to inclusion, education, and
                    empowerment for the deaf community in India.
                  </p>
                  <p>
                    With over 2.5 million deaf individuals in India, ISL serves as their primary means of communication,
                    cultural expression, and access to information.
                  </p>
                  <p>
                    Learning ISL helps create a more inclusive society where deaf and hearing individuals can
                    communicate effectively, breaking down barriers in education, employment, and social interaction.
                  </p>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/learn">
                      Start Learning ISL
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/indian-sign-language-community-learning.jpg"
                  alt="ISL Community Learning"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              The principles that guide our mission to make ISL accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground text-pretty">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Meet the passionate individuals working to make ISL education accessible to all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                      <img
                        src={`/professional-portrait.png?height=80&width=80&query=professional+portrait+${member.name.replace(" ", "+")}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground text-pretty">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
              Help us build a more inclusive world where communication knows no barriers. Start your ISL journey today
              or contribute to our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/learn">Start Learning</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
