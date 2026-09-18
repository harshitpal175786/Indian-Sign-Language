"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Volume2 } from "lucide-react"

interface SignModalProps {
  isOpen: boolean
  onClose: () => void
  sign: {
    letter: string
    title: string
    description: string
    imageUrl: string
  } | null
}

export function SignModal({ isOpen, onClose, sign }: SignModalProps) {
  if (!sign) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{sign.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sign Image/Video Placeholder */}
          <div className="relative aspect-square w-full max-w-sm mx-auto bg-muted rounded-lg overflow-hidden">
            <img
              src={sign.imageUrl || "/placeholder.svg"}
              alt={`ISL sign for ${sign.letter}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Button size="lg" className="rounded-full h-16 w-16">
                <Play className="h-6 w-6 ml-1" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">{sign.letter}</h3>
            <p className="text-muted-foreground text-sm">{sign.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Audio Guide
            </Button>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Practice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
