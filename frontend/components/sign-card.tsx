"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface SignCardProps {
  letter: string
  title: string
  imageUrl: string
  onClick: () => void
  index: number
}

export function SignCard({ letter, title, imageUrl, onClick, index }: SignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="aspect-square relative mb-3 bg-muted rounded-lg overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`ISL sign for ${letter}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{letter}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
