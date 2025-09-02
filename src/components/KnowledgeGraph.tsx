import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Search, Network, Users, BookOpen, Lightbulb, Zap, Filter } from 'lucide-react'

interface Node {
  id: string
  label: string
  type: 'concept' | 'author' | 'paper' | 'method' | 'dataset'
  size: number
  color: string
  connections: number
}

interface Edge {
  from: string
  to: string
  strength: number
  type: 'citation' | 'collaboration' | 'conceptual' | 'methodological'
}

export function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock graph data
  const nodes: Node[] = [
    { id: '1', label: 'Transformer', type: 'concept', size: 50, color: '#8884d8', connections: 127 },
    { id: '2', label: 'Attention Mechanism', type: 'concept', size: 45, color: '#8884d8', connections: 98 },
    { id: '3', label: 'Vaswani et al.', type: 'author', size: 40, color: '#82ca9d', connections: 73 },
    { id: '4', label: 'BERT', type: 'concept', size: 42, color: '#8884d8', connections: 156 },
    { id: '5', label: 'GPT', type: 'concept', size: 48, color: '#8884d8', connections: 189 },
    { id: '6', label: 'ImageNet', type: 'dataset', size: 35, color: '#ffc658', connections: 234 },
    { id: '7', label: 'ResNet', type: 'method', size: 38, color: '#ff7c7c', connections: 145 },
    { id: '8', label: 'Diffusion Models', type: 'concept', size: 36, color: '#8884d8', connections: 67 },
    { id: '9', label: 'LeCun', type: 'author', size: 44, color: '#82ca9d', connections: 312 },
    { id: '10', label: 'Hinton', type: 'author', size: 46, color: '#82ca9d', connections: 298 }
  ]

  const edges: Edge[] = [
    { from: '1', to: '2', strength: 0.9, type: 'conceptual' },
    { from: '3', to: '1', strength: 0.8, type: 'citation' },
    { from: '4', to: '1', strength: 0.7, type: 'methodological' },
    { from: '5', to: '1', strength: 0.75, type: 'methodological' },
    { from: '6', to: '7', strength: 0.6, type: 'methodological' },
    { from: '9', to: '10', strength: 0.5, type: 'collaboration' }
  ]

  // Mock trending connections
  const trendingConnections = [
    { concept1: 'Diffusion Models', concept2: 'GANs', growth: '+45%', papers: 234 },
    { concept1: 'Transformer', concept2: 'Computer Vision', growth: '+38%', papers: 189 },
    { concept1: 'Quantum Computing', concept2: 'Machine Learning', growth: '+67%', papers: 156 },
    { concept1: 'Graph Neural Networks', concept2: 'Drug Discovery', growth: '+23%', papers: 98 }
  ]

  // Mock concept evolution
  const conceptEvolution = [
    {
      concept: 'Attention Mechanism',
      timeline: [
        { year: '2014', milestone: 'Bahdanau Attention', impact: 'low' },
        { year: '2017', milestone: 'Self-Attention', impact: 'high' },
        { year: '2019', milestone: 'Multi-Head Attention', impact: 'medium' },
        { year: '2023', milestone: 'Efficient Attention', impact: 'high' }
      ]
    }
  ]

  // Mock research clusters
  const researchClusters = [
    {
      name: 'Large Language Models',
      centralConcepts: ['Transformer', 'Attention', 'Pre-training'],
      keyAuthors: ['Vaswani', 'Devlin', 'Brown'],
      papersCount: 1247,
      growth: '+25%'
    },
    {
      name: 'Computer Vision',
      centralConcepts: ['CNN', 'ResNet', 'Vision Transformer'],
      keyAuthors: ['LeCun', 'He', 'Dosovitskiy'],
      papersCount: 2134,
      growth: '+18%'
    },
    {
      name: 'Generative AI',
      centralConcepts: ['GAN', 'VAE', 'Diffusion'],
      keyAuthors: ['Goodfellow', 'Kingma', 'Ho'],
      papersCount: 892,
      growth: '+45%'
    }
  ]

  useEffect(() => {
    // Simple canvas visualization
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from)
      const toNode = nodes.find(n => n.id === edge.to)
      if (!fromNode || !toNode) return

      const fromX = (parseInt(fromNode.id) / nodes.length) * canvas.width
      const fromY = (parseInt(fromNode.id) % 4) * (canvas.height / 4) + 50
      const toX = (parseInt(toNode.id) / nodes.length) * canvas.width
      const toY = (parseInt(toNode.id) % 4) * (canvas.height / 4) + 50

      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.strokeStyle = `rgba(136, 132, 216, ${edge.strength * 0.5})`
      ctx.lineWidth = edge.strength * 3
      ctx.stroke()
    })

    // Draw nodes
    nodes.forEach((node, index) => {
      const x = (index / nodes.length) * canvas.width
      const y = (index % 4) * (canvas.height / 4) + 50

      ctx.beginPath()
      ctx.arc(x, y, node.size / 3, 0, 2 * Math.PI)
      ctx.fillStyle = node.color
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw label
      ctx.fillStyle = '#000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(node.label, x, y + node.size / 3 + 15)
    })
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <Lightbulb className="w-4 h-4" />
      case 'author': return <Users className="w-4 h-4" />
      case 'paper': return <BookOpen className="w-4 h-4" />
      case 'method': return <Zap className="w-4 h-4" />
      case 'dataset': return <Network className="w-4 h-4" />
      default: return <Network className="w-4 h-4" />
    }
  }

  const filteredNodes = nodes.filter(node => 
    (filterType === 'all' || node.type === filterType) &&
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge Graph</h1>
          <p className="text-sm text-muted-foreground">Interactive visualization of research connections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Network className="w-4 h-4 mr-2" />
            Live Update
          </Button>
        </div>
      </div>

      <Tabs defaultValue="graph" className="space-y-4">
        <TabsList>
          <TabsTrigger value="graph">Interactive Graph</TabsTrigger>
          <TabsTrigger value="clusters">Research Clusters</TabsTrigger>
          <TabsTrigger value="evolution">Concept Evolution</TabsTrigger>
          <TabsTrigger value="connections">Trending Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="graph" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search concepts, authors, or papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="concept">Concepts</SelectItem>
                <SelectItem value="author">Authors</SelectItem>
                <SelectItem value="paper">Papers</SelectItem>
                <SelectItem value="method">Methods</SelectItem>
                <SelectItem value="dataset">Datasets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Research Network</CardTitle>
                <CardDescription>Interactive visualization of research connections</CardDescription>
              </CardHeader>
              <CardContent>
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 border rounded-lg cursor-pointer"
                  onClick={(e) => {
                    // Simple click detection for demo
                    setSelectedNode(nodes[0])
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Authors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">Datasets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Methods</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Node Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(selectedNode.type)}
                        <span className="font-medium">{selectedNode.label}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Type: {selectedNode.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Connections: {selectedNode.connections}
                      </div>
                      <Button size="sm" className="w-full">
                        Explore Related
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Click on a node to see details</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Search</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {filteredNodes.slice(0, 5).map((node) => (
                    <div
                      key={node.id}
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer"
                      onClick={() => setSelectedNode(node)}
                    >
                      {getTypeIcon(node.type)}
                      <span className="text-sm">{node.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clusters" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchClusters.map((cluster) => (
              <Card key={cluster.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {cluster.name}
                    <Badge variant="secondary">{cluster.growth}</Badge>
                  </CardTitle>
                  <CardDescription>{cluster.papersCount} papers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Central Concepts</div>
                    <div className="flex flex-wrap gap-1">
                      {cluster.centralConcepts.map((concept) => (
                        <Badge key={concept} variant="outline" className="text-xs">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Key Authors</div>
                    <div className="flex flex-wrap gap-1">
                      {cluster.keyAuthors.map((author) => (
                        <Badge key={author} variant="secondary" className="text-xs">
                          {author}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Explore Cluster
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Concept Evolution Timeline</CardTitle>
              <CardDescription>How research concepts have evolved over time</CardDescription>
            </CardHeader>
            <CardContent>
              {conceptEvolution.map((evolution) => (
                <div key={evolution.concept} className="space-y-4">
                  <h3 className="font-medium">{evolution.concept}</h3>
                  <div className="relative">
                    {evolution.timeline.map((milestone, index) => (
                      <div key={milestone.year} className="flex items-center gap-4 relative">
                        {index < evolution.timeline.length - 1 && (
                          <div className="absolute left-6 top-8 w-0.5 h-12 bg-border"></div>
                        )}
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          milestone.impact === 'high' ? 'bg-green-500' :
                          milestone.impact === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{milestone.year}</span>
                            <Badge variant={
                              milestone.impact === 'high' ? 'default' :
                              milestone.impact === 'medium' ? 'secondary' : 'outline'
                            } className="text-xs">
                              {milestone.impact} impact
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.milestone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingConnections.map((connection, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">New Connection</span>
                    </div>
                    <Badge variant="secondary">{connection.growth}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{connection.concept1}</Badge>
                      <span className="text-sm text-muted-foreground">↔</span>
                      <Badge variant="outline">{connection.concept2}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {connection.papers} papers exploring this connection
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}