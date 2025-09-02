import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Users, Network, TrendingUp, Search, UserPlus, Building, Globe, Star, MessageCircle } from 'lucide-react'

interface Author {
  id: string
  name: string
  affiliation: string
  h_index: number
  totalCitations: number
  recentPapers: number
  collaborators: string[]
  researchAreas: string[]
  profileImage?: string
}

interface Collaboration {
  author1: string
  author2: string
  paperCount: number
  lastCollaboration: Date
  strength: number
  sharedAreas: string[]
}

interface ResearchCluster {
  id: string
  name: string
  size: number
  growth: string
  centralAuthors: string[]
  keyTopics: string[]
  recentBreakthroughs: string[]
}

export function CollaborationNetwork() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [networkFilter, setNetworkFilter] = useState('all')

  // Mock author data
  const authors: Author[] = [
    {
      id: '1',
      name: 'Geoffrey Hinton',
      affiliation: 'University of Toronto',
      h_index: 189,
      totalCitations: 245000,
      recentPapers: 12,
      collaborators: ['2', '3', '4'],
      researchAreas: ['Deep Learning', 'Neural Networks', 'AI Safety']
    },
    {
      id: '2',
      name: 'Yann LeCun',
      affiliation: 'Meta AI',
      h_index: 156,
      totalCitations: 198000,
      recentPapers: 18,
      collaborators: ['1', '5', '6'],
      researchAreas: ['Computer Vision', 'Self-Supervised Learning', 'Robotics']
    },
    {
      id: '3',
      name: 'Yoshua Bengio',
      affiliation: 'Université de Montréal',
      h_index: 143,
      totalCitations: 187000,
      recentPapers: 24,
      collaborators: ['1', '7', '8'],
      researchAreas: ['Deep Learning', 'Generative Models', 'AI Ethics']
    },
    {
      id: '4',
      name: 'Fei-Fei Li',
      affiliation: 'Stanford University',
      h_index: 98,
      totalCitations: 156000,
      recentPapers: 15,
      collaborators: ['1', '9', '10'],
      researchAreas: ['Computer Vision', 'AI for Social Good', 'Human-AI Interaction']
    },
    {
      id: '5',
      name: 'Andrew Ng',
      affiliation: 'Stanford University',
      h_index: 87,
      totalCitations: 134000,
      recentPapers: 21,
      collaborators: ['2', '11', '12'],
      researchAreas: ['Machine Learning', 'AI Education', 'Healthcare AI']
    }
  ]

  // Mock collaboration data
  const collaborations: Collaboration[] = [
    {
      author1: '1',
      author2: '2',
      paperCount: 8,
      lastCollaboration: new Date('2023-11-15'),
      strength: 0.8,
      sharedAreas: ['Deep Learning', 'Neural Networks']
    },
    {
      author1: '1',
      author2: '3',
      paperCount: 12,
      lastCollaboration: new Date('2024-01-20'),
      strength: 0.9,
      sharedAreas: ['Deep Learning', 'AI Safety']
    },
    {
      author1: '2',
      author2: '4',
      paperCount: 6,
      lastCollaboration: new Date('2023-08-10'),
      strength: 0.7,
      sharedAreas: ['Computer Vision']
    }
  ]

  // Mock research clusters
  const researchClusters: ResearchCluster[] = [
    {
      id: '1',
      name: 'Large Language Models Hub',
      size: 247,
      growth: '+35%',
      centralAuthors: ['OpenAI Team', 'Google Research', 'Anthropic'],
      keyTopics: ['Transformer Architecture', 'Scaling Laws', 'Alignment'],
      recentBreakthroughs: ['GPT-4', 'Gemini', 'Claude']
    },
    {
      id: '2',
      name: 'Computer Vision Pioneers',
      size: 189,
      growth: '+22%',
      centralAuthors: ['Fei-Fei Li', 'Kaiming He', 'Ross Girshick'],
      keyTopics: ['Object Detection', 'Image Segmentation', 'Vision Transformers'],
      recentBreakthroughs: ['CLIP', 'DALLE-2', 'Segment Anything']
    },
    {
      id: '3',
      name: 'Quantum AI Alliance',
      size: 156,
      growth: '+67%',
      centralAuthors: ['IBM Quantum', 'Google Quantum', 'Microsoft Quantum'],
      keyTopics: ['Quantum Computing', 'Quantum ML', 'Error Correction'],
      recentBreakthroughs: ['Quantum Supremacy', 'Quantum Advantage', 'Logical Qubits']
    }
  ]

  // Mock emerging collaborations
  const emergingCollaborations = [
    {
      authors: ['Demis Hassabis', 'Shane Legg'],
      prediction: 'AI Safety Research',
      confidence: 89,
      sharedConnections: 12,
      recentInteractions: 'Co-authored policy paper'
    },
    {
      authors: ['Ilya Sutskever', 'Geoffrey Hinton'],
      prediction: 'Next-Gen Architectures',
      confidence: 76,
      sharedConnections: 8,
      recentInteractions: 'Joint conference presentation'
    },
    {
      authors: ['Pieter Abbeel', 'Sergey Levine'],
      prediction: 'Robotics Foundation Models',
      confidence: 82,
      sharedConnections: 15,
      recentInteractions: 'Shared lab affiliations'
    }
  ]

  // Mock collaboration opportunities
  const collaborationOpportunities = [
    {
      targetAuthor: 'Daphne Koller',
      reason: 'Shared interest in healthcare AI',
      mutualConnections: ['Andrew Ng', 'Fei-Fei Li'],
      potentialImpact: 'High',
      lastPaper: '2023-09-15'
    },
    {
      targetAuthor: 'Cynthia Breazeal',
      reason: 'Complementary robotics expertise',
      mutualConnections: ['Rodney Brooks'],
      potentialImpact: 'Medium',
      lastPaper: '2023-11-22'
    }
  ]

  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getCollaborationStrength = (strength: number) => {
    if (strength >= 0.8) return { label: 'Strong', color: 'bg-green-500' }
    if (strength >= 0.6) return { label: 'Medium', color: 'bg-yellow-500' }
    return { label: 'Weak', color: 'bg-gray-400' }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Collaboration Network</h1>
          <p className="text-sm text-muted-foreground">Discover research partnerships and emerging clusters</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Network className="w-4 h-4 mr-2" />
            Network View
          </Button>
          <Button variant="outline" size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Find Collaborators
          </Button>
        </div>
      </div>

      <Tabs defaultValue="network" className="space-y-4">
        <TabsList>
          <TabsTrigger value="network">Author Network</TabsTrigger>
          <TabsTrigger value="clusters">Research Clusters</TabsTrigger>
          <TabsTrigger value="predictions">Emerging Patterns</TabsTrigger>
          <TabsTrigger value="opportunities">Collaboration Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search authors, institutions, or research areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={networkFilter} onValueChange={setNetworkFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Connections</SelectItem>
                <SelectItem value="strong">Strong Collaborations</SelectItem>
                <SelectItem value="recent">Recent Partnerships</SelectItem>
                <SelectItem value="cross-institutional">Cross-Institutional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Collaboration Network</CardTitle>
                  <CardDescription>Interactive visualization of author relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Network className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Interactive network visualization</p>
                      <p className="text-sm text-muted-foreground">Click nodes to explore collaborations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Core Authors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Frequent Collaborators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-3 bg-gray-400"></div>
                      <span className="text-xs">Collaboration Links</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Collaborations</CardTitle>
                  <CardDescription>Most productive research partnerships</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {collaborations.map((collab, index) => {
                    const author1 = authors.find(a => a.id === collab.author1)
                    const author2 = authors.find(a => a.id === collab.author2)
                    const strength = getCollaborationStrength(collab.strength)
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <Avatar className="border-2 border-background">
                              <AvatarFallback>{getAuthorInitials(author1?.name || '')}</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-background">
                              <AvatarFallback>{getAuthorInitials(author2?.name || '')}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <div className="font-medium">{author1?.name} × {author2?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {collab.paperCount} papers • {collab.sharedAreas.join(', ')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${strength.color}`}></div>
                          <span className="text-xs">{strength.label}</span>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Author Spotlight</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAuthor ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{getAuthorInitials(selectedAuthor.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{selectedAuthor.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedAuthor.affiliation}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-2 bg-muted rounded">
                          <div className="font-medium">{selectedAuthor.h_index}</div>
                          <div className="text-xs text-muted-foreground">h-index</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="font-medium">{(selectedAuthor.totalCitations / 1000).toFixed(0)}k</div>
                          <div className="text-xs text-muted-foreground">citations</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Research Areas</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedAuthor.researchAreas.map((area) => (
                            <Badge key={area} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button size="sm" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-sm text-muted-foreground">Select an author to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Authors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {authors.slice(0, 5).map((author) => (
                    <div 
                      key={author.id}
                      className="flex items-center gap-3 p-2 hover:bg-accent rounded cursor-pointer"
                      onClick={() => setSelectedAuthor(author)}
                    >
                      <Avatar>
                        <AvatarFallback>{getAuthorInitials(author.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{author.name}</div>
                        <div className="text-xs text-muted-foreground">h-index: {author.h_index}</div>
                      </div>
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
              <Card key={cluster.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {cluster.name}
                    <Badge variant="secondary">{cluster.growth}</Badge>
                  </CardTitle>
                  <CardDescription>{cluster.size} active researchers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Central Authors</div>
                    <div className="space-y-1">
                      {cluster.centralAuthors.map((author) => (
                        <div key={author} className="text-sm text-muted-foreground">
                          {author}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Key Topics</div>
                    <div className="flex flex-wrap gap-1">
                      {cluster.keyTopics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Recent Breakthroughs</div>
                    <div className="space-y-1">
                      {cluster.recentBreakthroughs.map((breakthrough) => (
                        <div key={breakthrough} className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs">{breakthrough}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    <Network className="w-4 h-4 mr-2" />
                    Explore Cluster
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emerging Collaborations</CardTitle>
                <CardDescription>AI-predicted future research partnerships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergingCollaborations.map((prediction, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">
                        {prediction.authors.join(' + ')}
                      </div>
                      <Badge variant="secondary">{prediction.confidence}% confidence</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Predicted focus: {prediction.prediction}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{prediction.sharedConnections} mutual connections</span>
                      <span>{prediction.recentInteractions}</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-1 mt-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cross-Institutional Trends</CardTitle>
                <CardDescription>Collaboration patterns across institutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { inst1: 'Stanford', inst2: 'MIT', growth: '+45%', papers: 89 },
                    { inst1: 'DeepMind', inst2: 'OpenAI', growth: '+67%', papers: 23 },
                    { inst1: 'Google', inst2: 'Berkeley', growth: '+23%', papers: 156 },
                    { inst1: 'Meta', inst2: 'CMU', growth: '+34%', papers: 78 }
                  ].map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{trend.inst1} × {trend.inst2}</div>
                          <div className="text-xs text-muted-foreground">{trend.papers} joint papers</div>
                        </div>
                      </div>
                      <Badge variant="secondary">{trend.growth}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Collaborators</CardTitle>
                <CardDescription>Potential partners based on your research interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {collaborationOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getAuthorInitials(opportunity.targetAuthor)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{opportunity.targetAuthor}</div>
                          <div className="text-sm text-muted-foreground">{opportunity.reason}</div>
                        </div>
                      </div>
                      <Badge variant={opportunity.potentialImpact === 'High' ? 'default' : 'secondary'}>
                        {opportunity.potentialImpact} Impact
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">
                      Mutual connections: {opportunity.mutualConnections.join(', ')}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collaboration Insights</CardTitle>
                <CardDescription>Tips for successful research partnerships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      title: 'Cross-Disciplinary Advantage',
                      description: 'Papers with authors from different fields get 23% more citations',
                      icon: <Globe className="w-4 h-4" />
                    },
                    {
                      title: 'International Collaborations',
                      description: 'Cross-border partnerships show 34% higher impact',
                      icon: <Network className="w-4 h-4" />
                    },
                    {
                      title: 'Industry-Academia Synergy',
                      description: 'Mixed affiliations increase reproducibility by 28%',
                      icon: <Building className="w-4 h-4" />
                    },
                    {
                      title: 'Early Career Mentorship',
                      description: 'Including PhD students boosts innovation metrics',
                      icon: <Users className="w-4 h-4" />
                    }
                  ].map((insight, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-primary mt-0.5">{insight.icon}</div>
                        <div>
                          <div className="font-medium text-sm">{insight.title}</div>
                          <div className="text-xs text-muted-foreground">{insight.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}