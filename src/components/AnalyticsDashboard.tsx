import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Activity, Globe, Users, BookOpen, Zap, AlertTriangle } from 'lucide-react'

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('6months')
  const [compareFields, setCompareFields] = useState(['ai', 'quantum'])

  // Mock data for research trends
  const researchTrends = [
    { month: 'Jan 2024', ai: 2400, quantum: 800, climate: 1200, biotech: 900 },
    { month: 'Feb 2024', ai: 2800, quantum: 850, climate: 1300, biotech: 950 },
    { month: 'Mar 2024', ai: 3200, quantum: 900, climate: 1400, biotech: 1000 },
    { month: 'Apr 2024', ai: 3600, quantum: 950, climate: 1350, biotech: 1100 },
    { month: 'May 2024', ai: 4100, quantum: 1000, climate: 1500, biotech: 1200 },
    { month: 'Jun 2024', ai: 4500, quantum: 1100, climate: 1600, biotech: 1300 }
  ]

  // Citation activity data
  const citationActivity = [
    { week: 'Week 1', citations: 15000, altmetric: 3200 },
    { week: 'Week 2', citations: 18000, altmetric: 3800 },
    { week: 'Week 3', citations: 22000, altmetric: 4200 },
    { week: 'Week 4', citations: 19000, altmetric: 3900 }
  ]

  // Geographic distribution
  const geoData = [
    { region: 'North America', papers: 35, color: '#8884d8' },
    { region: 'Europe', papers: 28, color: '#82ca9d' },
    { region: 'Asia', papers: 25, color: '#ffc658' },
    { region: 'Others', papers: 12, color: '#ff7c7c' }
  ]

  // Impact metrics
  const impactMetrics = [
    { title: 'Citation Storms', value: '12', change: '+3', trend: 'up', icon: Zap },
    { title: 'Breakthrough Papers', value: '8', change: '+2', trend: 'up', icon: TrendingUp },
    { title: 'Retraction Alerts', value: '3', change: '-1', trend: 'down', icon: AlertTriangle },
    { title: 'Reproducible Studies', value: '76%', change: '+4%', trend: 'up', icon: Activity }
  ]

  // Hot topics
  const hotTopics = [
    { topic: 'Large Language Models', papers: 1247, growth: '+15%' },
    { topic: 'Quantum Computing', papers: 892, growth: '+8%' },
    { topic: 'Climate Models', papers: 734, growth: '+12%' },
    { topic: 'Protein Folding', papers: 623, growth: '+22%' },
    { topic: 'Neural Architecture', papers: 567, growth: '+18%' }
  ]

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Research Analytics</h1>
          <p className="text-sm text-muted-foreground">Real-time insights into global research trends</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Globe className="w-4 h-4 mr-2" />
            Live Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <metric.icon className="w-5 h-5 text-muted-foreground" />
                <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                  {metric.change}
                </Badge>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-semibold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Research Trends</TabsTrigger>
          <TabsTrigger value="activity">Citation Activity</TabsTrigger>
          <TabsTrigger value="geography">Global Distribution</TabsTrigger>
          <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Publication Trends Comparison</CardTitle>
                <CardDescription>Compare research output across different fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={researchTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Line type="monotone" dataKey="ai" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="quantum" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="climate" stroke="#ffc658" strokeWidth={2} />
                      <Line type="monotone" dataKey="biotech" stroke="#ff7c7c" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">AI/ML</Badge>
                  <Badge variant="outline">Quantum Computing</Badge>
                  <Badge variant="outline">Climate Science</Badge>
                  <Badge variant="outline">Biotechnology</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hot Topics</CardTitle>
                <CardDescription>Trending research areas this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hotTopics.map((topic, index) => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{topic.topic}</div>
                        <div className="text-xs text-muted-foreground">{topic.papers} papers</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">{topic.growth}</Badge>
                    </div>
                    <Progress value={(topic.papers / 1500) * 100} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Citation & Altmetric Activity</CardTitle>
              <CardDescription>Real-time citation patterns and social media mentions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={citationActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Area type="monotone" dataKey="citations" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="altmetric" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Output by Region</CardTitle>
                <CardDescription>Global distribution of research publications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={geoData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="papers"
                      >
                        {geoData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {geoData.map((item) => (
                    <div key={item.region} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.region}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emerging Research Clusters</CardTitle>
                <CardDescription>Geographic hotspots of innovation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Silicon Valley AI Hub</div>
                        <div className="text-sm text-muted-foreground">Stanford, Berkeley, Google, OpenAI</div>
                      </div>
                      <Badge>+23%</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">European Quantum Initiative</div>
                        <div className="text-sm text-muted-foreground">CERN, Max Planck, Oxford</div>
                      </div>
                      <Badge>+18%</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Asian Biotech Corridor</div>
                        <div className="text-sm text-muted-foreground">Tokyo, Seoul, Singapore</div>
                      </div>
                      <Badge>+15%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reproducibility Scorecard</CardTitle>
                <CardDescription>Code availability and dataset sharing trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Code Available</span>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Shared</span>
                    <span className="text-sm font-medium">64%</span>
                  </div>
                  <Progress value={64} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reproducible Results</span>
                    <span className="text-sm font-medium">58%</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Citation Storms</CardTitle>
                <CardDescription>Papers with sudden citation spikes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">GPT-4 Technical Report</div>
                      <div className="text-xs text-muted-foreground">OpenAI Team</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+2,847</div>
                      <div className="text-xs text-muted-foreground">this week</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">Quantum Error Correction</div>
                      <div className="text-xs text-muted-foreground">IBM Research</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+1,234</div>
                      <div className="text-xs text-muted-foreground">this week</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">Climate Tipping Points</div>
                      <div className="text-xs text-muted-foreground">Nature Climate</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+892</div>
                      <div className="text-xs text-muted-foreground">this week</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}