"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, BookOpen, Play, Sparkles, Library, Trash2, ArrowLeft } from "lucide-react"

export default function StorytellerApp() {
  const [theme, setTheme] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [story, setStory] = useState("")
  const [savedStories, setSavedStories] = useState<Array<{ id: string; theme: string; content: string; date: string }>>(
    [],
  )
  const [showGallery, setShowGallery] = useState(false)
  const [selectedStory, setSelectedStory] = useState<{
    id: string
    theme: string
    content: string
    date: string
  } | null>(null)

  // Load saved stories from localStorage on component mount
  useEffect(() => {
    const storedStories = localStorage.getItem("savedStories")
    if (storedStories) {
      setSavedStories(JSON.parse(storedStories))
    }
  }, [])

  // Save stories to localStorage whenever savedStories changes
  useEffect(() => {
    localStorage.setItem("savedStories", JSON.stringify(savedStories))
  }, [savedStories])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!theme) return

    setIsLoading(true)

    // Simulate AI generation with a timeout
    setTimeout(() => {
      const generatedStory = `Once upon a time in a ${theme} world, there lived a curious child named Alex. 
      Every day, Alex would explore the wonders of this magical place, discovering new friends and adventures.
      One day, something extraordinary happened that would change everything...
      
      Alex found a glowing key that opened a door to another dimension! Through this door,
      incredible creatures and landscapes awaited. It was the beginning of the greatest adventure ever!`

      setStory(generatedStory)
      setIsLoading(false)
    }, 2000)
  }

  const saveStory = () => {
    if (!story) return

    const newStory = {
      id: Date.now().toString(),
      theme,
      content: story,
      date: new Date().toLocaleDateString(),
    }

    setSavedStories((prev) => [newStory, ...prev])
    resetStory()
  }

  const deleteStory = (id: string) => {
    setSavedStories((prev) => prev.filter((story) => story.id !== id))
    if (selectedStory?.id === id) {
      setSelectedStory(null)
    }
  }

  const resetStory = () => {
    setStory("")
    setTheme("")
  }

  const viewStory = (story: { id: string; theme: string; content: string; date: string }) => {
    setSelectedStory(story)
  }

  const backToGallery = () => {
    setSelectedStory(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-2 tracking-tight">
            Magical AI Storyteller ✨
          </h1>
          <p className="text-blue-600 text-lg">Enter a theme and let the magic happen!</p>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 animate-bounce hidden md:block">
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="absolute top-0 right-0 animate-pulse hidden md:block">
            <Sparkles className="h-6 w-6 text-pink-500" />
          </div>
        </header>

        {/* Toggle between main app and gallery */}
        <div className="flex justify-center mb-6">
          <Button
            variant={showGallery ? "outline" : "default"}
            onClick={() => setShowGallery(false)}
            className={`rounded-l-lg ${!showGallery ? "bg-purple-600 text-white" : "border-purple-300 text-purple-600"}`}
          >
            Create Story
          </Button>
          <Button
            variant={showGallery ? "default" : "outline"}
            onClick={() => setShowGallery(true)}
            className={`rounded-r-lg ${showGallery ? "bg-purple-600 text-white" : "border-purple-300 text-purple-600"}`}
          >
            <Library className="mr-2 h-4 w-4" />
            Story Gallery ({savedStories.length})
          </Button>
        </div>

        {!showGallery ? (
          <div className="relative">
            {/* Floating book animation */}
            <div className="absolute -top-16 right-4 animate-float hidden md:block">
              <BookOpen className="h-12 w-12 text-indigo-500" />
            </div>

            {!story ? (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-xl">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="theme" className="text-lg font-medium text-purple-700">
                        What kind of story would you like?
                      </label>
                      <Input
                        id="theme"
                        placeholder="Space Adventure, Enchanted Forest, Underwater Kingdom..."
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="border-2 border-purple-200 rounded-lg h-12 text-lg"
                        disabled={isLoading}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || !theme}
                      className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating Magic...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Story
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-xl">
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-purple-700">Your Magical Story</h2>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          onClick={saveStory}
                          className="border-purple-300 text-purple-600 hover:bg-purple-50"
                        >
                          <Library className="mr-2 h-4 w-4" />
                          Save Story
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetStory}
                          className="border-purple-300 text-purple-600 hover:bg-purple-50"
                        >
                          New Story
                        </Button>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 whitespace-pre-line">
                      {story}
                    </div>
                  </div>

                  <Button className="w-full h-12 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
                    <Play className="mr-2 h-5 w-5" />
                    Play Audio Narration
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div>
            {selectedStory ? (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-xl">
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        onClick={backToGallery}
                        className="text-purple-600 hover:bg-purple-50 -ml-2"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Gallery
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => deleteStory(selectedStory.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-purple-700 mb-1">{selectedStory.theme}</h2>
                      <p className="text-sm text-gray-500 mb-4">Created on {selectedStory.date}</p>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 whitespace-pre-line">
                        {selectedStory.content}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full h-12 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
                    <Play className="mr-2 h-5 w-5" />
                    Play Audio Narration
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-purple-700 text-center">Your Story Collection</h2>

                {savedStories.length === 0 ? (
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-xl p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <Library className="h-16 w-16 text-purple-300" />
                      <h3 className="text-xl font-medium text-purple-700">Your story gallery is empty</h3>
                      <p className="text-purple-600">Generate and save some magical stories to see them here!</p>
                      <Button onClick={() => setShowGallery(false)} className="bg-purple-600 hover:bg-purple-700">
                        Create Your First Story
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {savedStories.map((story) => (
                      <Card
                        key={story.id}
                        className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                        onClick={() => viewStory(story)}
                      >
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold text-purple-700 mb-1 truncate">{story.theme}</h3>
                          <p className="text-xs text-gray-500 mb-2">{story.date}</p>
                          <p className="text-sm text-gray-700 line-clamp-3">{story.content}</p>
                        </CardContent>
                        <CardFooter className="bg-purple-50 p-3 flex justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600 hover:bg-purple-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              viewStory(story)
                            }}
                          >
                            Read Story
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteStory(story.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

