import { useState } from 'react'
import { Header } from './components/Header'
import { SearchSection } from './components/SearchSection'
import { ChatInterface } from './components/ChatInterface'
import { PaperResults } from './components/PaperResults'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'
import { KnowledgeGraph } from './components/KnowledgeGraph'
import { AlertsPanel } from './components/AlertsPanel'
import { CollaborationNetwork } from './components/CollaborationNetwork'
import { Button } from './components/ui/button'
import { MessageCircle, Search, TrendingUp, Network, Bell, Users } from 'lucide-react'

type ViewType = 'search' | 'chat' | 'analytics' | 'knowledge' | 'alerts' | 'collaboration'

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [papers, setPapers] = useState([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Enhanced mock search results with new features
    const mockPapers = [
      {
        id: 1,
        title: "Attention Is All You Need",
        authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar"],
        abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...",
        year: 2017,
        citations: 40000,
        venue: "NeurIPS",
        tags: ["transformer", "attention", "nlp"],
        codeAvailable: true,
        dataAvailable: true,
        reproducibilityScore: 89,
        impactScore: 98,
        altmetricScore: 1247,
        datasets: ["WMT 2014", "BLEU"],
        recentCitationSpike: true
      },
      {
        id: 2,
        title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee"],
        abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder...",
        year: 2018,
        citations: 35000,
        venue: "NAACL",
        tags: ["bert", "transformer", "pretraining"],
        codeAvailable: true,
        dataAvailable: false,
        reproducibilityScore: 76,
        impactScore: 94,
        altmetricScore: 892,
        datasets: ["BookCorpus", "Wikipedia"]
      },
      {
        id: 3,
        title: "GPT-3: Language Models are Few-Shot Learners",
        authors: ["Tom B. Brown", "Benjamin Mann", "Nick Ryder"],
        abstract: "Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training...",
        year: 2020,
        citations: 15000,
        venue: "NeurIPS",
        tags: ["gpt", "few-shot", "language-model"],
        codeAvailable: false,
        dataAvailable: false,
        reproducibilityScore: 45,
        impactScore: 96,
        altmetricScore: 2156,
        datasets: ["Common Crawl", "WebText"],
        recentCitationSpike: true
      },
      {
        id: 4,
        title: "Segment Anything Model (SAM)",
        authors: ["Alexander Kirillov", "Eric Mintun", "Nikhila Ravi"],
        abstract: "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation...",
        year: 2023,
        citations: 1847,
        venue: "ICCV",
        tags: ["computer-vision", "segmentation", "foundation-model"],
        codeAvailable: true,
        dataAvailable: true,
        reproducibilityScore: 91,
        impactScore: 87,
        altmetricScore: 3421,
        datasets: ["SA-1B", "COCO", "LVIS"],
        recentCitationSpike: true
      },
      {
        id: 5,
        title: "Quantum Advantage in Learning from Experiments",
        authors: ["Hsin-Yuan Huang", "Michael Broughton", "Masoud Mohseni"],
        abstract: "Quantum computers hold the promise of learning from exponentially fewer experiments than classical computers...",
        year: 2023,
        citations: 234,
        venue: "Science",
        tags: ["quantum-computing", "machine-learning", "quantum-advantage"],
        codeAvailable: true,
        dataAvailable: true,
        reproducibilityScore: 83,
        impactScore: 78,
        altmetricScore: 567,
        datasets: ["Quantum Simulation Data"]
      }
    ]
    setPapers(mockPapers)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* View Toggle */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={activeView === 'search' ? 'default' : 'ghost'}
              onClick={() => setActiveView('search')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Search Papers
            </Button>
            <Button
              variant={activeView === 'chat' ? 'default' : 'ghost'}
              onClick={() => setActiveView('chat')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Assistant
            </Button>
            <Button
              variant={activeView === 'analytics' ? 'default' : 'ghost'}
              onClick={() => setActiveView('analytics')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </Button>
            <Button
              variant={activeView === 'knowledge' ? 'default' : 'ghost'}
              onClick={() => setActiveView('knowledge')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Network className="w-4 h-4" />
              Knowledge Graph
            </Button>
            <Button
              variant={activeView === 'alerts' ? 'default' : 'ghost'}
              onClick={() => setActiveView('alerts')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Bell className="w-4 h-4" />
              Alerts
            </Button>
            <Button
              variant={activeView === 'collaboration' ? 'default' : 'ghost'}
              onClick={() => setActiveView('collaboration')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Users className="w-4 h-4" />
              Collaboration
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeView === 'search' && (
          <div className="space-y-6">
            <SearchSection onSearch={handleSearch} />
            <PaperResults papers={papers} searchQuery={searchQuery} />
          </div>
        )}
        {activeView === 'chat' && <ChatInterface />}
        {activeView === 'analytics' && <AnalyticsDashboard />}
        {activeView === 'knowledge' && <KnowledgeGraph />}
        {activeView === 'alerts' && <AlertsPanel />}
        {activeView === 'collaboration' && <CollaborationNetwork />}
      </main>
    </div>
  )
}