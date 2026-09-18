"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Copy, Volume2, RotateCcw, Camera, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { predictSign, checkHealth } from "@/lib/api"

interface TranslateBoxProps {
  mode: "text-to-sign" | "sign-to-text"
}

export function TranslateBox({ mode }: TranslateBoxProps) {
  const [inputText, setInputText] = useState("")
  const [outputSigns, setOutputSigns] = useState<string[]>([])
  const [isTranslating, setIsTranslating] = useState(false)
  const [backendStatus, setBackendStatus] = useState<string>("unknown")

  const checkBackend = async () => {
    try {
      const health = await checkHealth()
      setBackendStatus(health.status)
    } catch (error) {
      setBackendStatus("offline")
    }
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)

    try {
      // Check backend first
      await checkBackend()
      
      // For now, still use mock translation since we need actual sign images
      // But we can test the backend with a sample image
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      const words = inputText.trim().split(/\s+/)
      setOutputSigns(words)
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsTranslating(true)
    
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const imageData = e.target?.result as string
          const result = await predictSign(imageData)
          
          // Show prediction result
          setOutputSigns([`Predicted: ${result.prediction} (${(result.confidence * 100).toFixed(1)}%)`])
        } catch (error) {
          console.error('Prediction error:', error)
          setOutputSigns([`Error: ${error}`])
        } finally {
          setIsTranslating(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setIsTranslating(false)
    }
  }

  const handleClear = () => {
    setInputText("")
    setOutputSigns([])
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText)
  }

  if (mode === "text-to-sign") {
    return (
      <div className="space-y-6">
        {/* Backend Status */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Backend Status: <span className="font-medium">{backendStatus}</span></span>
              <Button size="sm" variant="outline" onClick={checkBackend}>
                Check Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Enter Text</span>
              <ArrowRight className="h-4 w-4" />
              <span>ISL Signs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your message here... (e.g., Hello, how are you?)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleTranslate} disabled={!inputText.trim() || isTranslating} className="flex-1">
                {isTranslating ? "Translating..." : "Translate to ISL"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <AnimatePresence>
          {outputSigns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>ISL Translation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {outputSigns.map((word, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="aspect-square bg-muted rounded-lg mb-2 overflow-hidden relative group cursor-pointer hover:bg-muted/80 transition-colors">
                          <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                            {word.charAt(0).toUpperCase()}
                          </div>
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button size="sm" variant="secondary">
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm font-medium">{word}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Sign-to-Text mode - now with backend integration
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Upload Signs</span>
          <ArrowRight className="h-4 w-4" />
          <span>Text</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="flex flex-col items-center space-y-2">
                <Button size="lg" variant="outline" asChild>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-6 w-6 mr-2" />
                    Upload Image
                  </label>
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground">Test backend prediction</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Upload an image to test the ISL prediction backend.
            </p>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {outputSigns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-muted/50 rounded-lg p-4"
            >
              <h4 className="font-medium mb-2">Prediction Result</h4>
              <p className="text-sm">{outputSigns.join(" ")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
