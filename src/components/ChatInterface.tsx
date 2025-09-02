import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Send, Bot, User, Sparkles, BookOpen, TrendingUp, Search } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your research paper assistant. I can help you find papers, explain concepts, summarize research, and suggest related work. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Find papers about transformer architecture",
        "Explain the attention mechanism",
        "What's new in computer vision?",
        "Summarize recent NLP trends"
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: "Based on your query, I found several relevant papers. The transformer architecture, introduced in 'Attention Is All You Need', revolutionized NLP by replacing recurrent layers with self-attention mechanisms.",
          suggestions: ["Show me transformer papers", "Explain self-attention", "Compare with RNNs"]
        },
        {
          content: "That's a great question! Recent advances in computer vision include Vision Transformers (ViTs), CLIP models, and diffusion models for image generation. Would you like me to find specific papers on any of these topics?",
          suggestions: ["Find ViT papers", "Explain CLIP", "Show diffusion models"]
        },
        {
          content: "I can help you understand that concept! Let me break it down and find some papers that explain it clearly with examples and applications.",
          suggestions: ["Find tutorial papers", "Show practical examples", "Explain step by step"]
        }
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: randomResponse.content,
        timestamp: new Date(),
        suggestions: randomResponse.suggestions
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const quickActions = [
    { icon: Search, label: "Find Papers", query: "Find papers about" },
    { icon: BookOpen, label: "Explain Concept", query: "Explain the concept of" },
    { icon: TrendingUp, label: "Latest Trends", query: "What are the latest trends in" },
    { icon: Sparkles, label: "Summarize", query: "Summarize recent research on" }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => setInput(action.query + " ")}
          >
            <action.icon className="w-5 h-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Chat Messages */}
      <Card className="mb-4">
        <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {message.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === 'assistant' 
                      ? 'bg-muted text-muted-foreground' 
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1 max-w-[80%]">
                      {message.suggestions.map((suggestion, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent text-xs"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Ask me about research papers, concepts, or trends..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="pr-12"
          />
          <Button
            size="sm"
            className="absolute right-1 top-1 h-8 w-8 p-0"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}