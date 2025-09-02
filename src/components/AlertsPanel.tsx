import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Bell, Plus, Search, User, BookOpen, TrendingUp, Zap, Mail, Smartphone, Globe, X, Settings } from 'lucide-react'

interface Alert {
  id: string
  title: string
  type: 'keyword' | 'author' | 'citation' | 'trend' | 'dataset'
  query: string
  frequency: 'instant' | 'daily' | 'weekly'
  isActive: boolean
  lastTriggered?: Date
  matchCount: number
}

interface Notification {
  id: string
  alertId: string
  title: string
  description: string
  timestamp: Date
  isRead: boolean
  severity: 'low' | 'medium' | 'high'
  papers?: Array<{ title: string; authors: string[] }>
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Large Language Models',
      type: 'keyword',
      query: 'large language models OR LLM OR GPT',
      frequency: 'daily',
      isActive: true,
      lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
      matchCount: 23
    },
    {
      id: '2',
      title: 'Geoffrey Hinton Publications',
      type: 'author',
      query: 'Geoffrey Hinton',
      frequency: 'instant',
      isActive: true,
      lastTriggered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      matchCount: 2
    },
    {
      id: '3',
      title: 'My Work Citations',
      type: 'citation',
      query: 'citations to my papers',
      frequency: 'weekly',
      isActive: true,
      lastTriggered: new Date(Date.now() - 24 * 60 * 60 * 1000),
      matchCount: 7
    }
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      alertId: '1',
      title: '23 new papers on Large Language Models',
      description: 'Including 3 high-impact papers from top venues',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      severity: 'high',
      papers: [
        { title: 'GPT-5: The Next Generation', authors: ['OpenAI Research'] },
        { title: 'Efficient LLM Training', authors: ['DeepMind Team'] }
      ]
    },
    {
      id: '2',
      alertId: '3',
      title: '7 new citations to your work',
      description: 'Your paper "Attention Mechanisms" was cited by Nature AI',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: false,
      severity: 'medium'
    },
    {
      id: '3',
      alertId: '2',
      title: 'Geoffrey Hinton published 2 new papers',
      description: 'Including a breakthrough in neural network interpretability',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isRead: true,
      severity: 'high'
    }
  ])

  const [newAlert, setNewAlert] = useState({
    title: '',
    type: 'keyword' as Alert['type'],
    query: '',
    frequency: 'daily' as Alert['frequency']
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    inApp: true,
    digest: true
  })

  const handleCreateAlert = () => {
    if (!newAlert.title || !newAlert.query) return

    const alert: Alert = {
      id: Date.now().toString(),
      title: newAlert.title,
      type: newAlert.type,
      query: newAlert.query,
      frequency: newAlert.frequency,
      isActive: true,
      matchCount: 0
    }

    setAlerts([...alerts, alert])
    setNewAlert({ title: '', type: 'keyword', query: '', frequency: 'daily' })
  }

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ))
  }

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const markNotificationRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getAlertTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'keyword': return <Search className="w-4 h-4" />
      case 'author': return <User className="w-4 h-4" />
      case 'citation': return <BookOpen className="w-4 h-4" />
      case 'trend': return <TrendingUp className="w-4 h-4" />
      case 'dataset': return <Globe className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: Notification['severity']) => {
    switch (severity) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-blue-500'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Smart Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">Stay updated with personalized research notifications</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notification Settings</DialogTitle>
                <DialogDescription>Configure how you receive alerts</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Notifications</span>
                  </div>
                  <Switch 
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, email: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Push Notifications</span>
                  </div>
                  <Switch 
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, push: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span>In-App Notifications</span>
                  </div>
                  <Switch 
                    checked={notificationSettings.inApp}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, inApp: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Daily Digest</span>
                  </div>
                  <Switch 
                    checked={notificationSettings.digest}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, digest: checked})
                    }
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>Set up a personalized watchlist for research updates</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Alert Title</label>
                  <Input
                    placeholder="e.g., Quantum Computing Papers"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Alert Type</label>
                  <Select value={newAlert.type} onValueChange={(value: Alert['type']) => setNewAlert({...newAlert, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keyword">Keyword Search</SelectItem>
                      <SelectItem value="author">Author Publications</SelectItem>
                      <SelectItem value="citation">Citation Alerts</SelectItem>
                      <SelectItem value="trend">Trending Topics</SelectItem>
                      <SelectItem value="dataset">Dataset Usage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Search Query</label>
                  <Input
                    placeholder={
                      newAlert.type === 'keyword' ? 'quantum computing OR quantum algorithms' :
                      newAlert.type === 'author' ? 'John Smith OR J. Smith' :
                      newAlert.type === 'citation' ? 'cites:your-paper-title' :
                      newAlert.type === 'dataset' ? 'ImageNet OR COCO dataset' :
                      'trending topic keywords'
                    }
                    value={newAlert.query}
                    onChange={(e) => setNewAlert({...newAlert, query: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <Select value={newAlert.frequency} onValueChange={(value: Alert['frequency']) => setNewAlert({...newAlert, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateAlert} className="w-full">
                  Create Alert
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alerts">My Alerts ({alerts.length})</TabsTrigger>
          <TabsTrigger value="suggestions">Suggested Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-2">No notifications yet</h3>
                <p className="text-sm text-muted-foreground">Create some alerts to start receiving notifications</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getSeverityColor(notification.severity)} ${
                  !notification.isRead ? 'bg-accent/50' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                        {notification.papers && (
                          <div className="space-y-1">
                            {notification.papers.map((paper, index) => (
                              <div key={index} className="text-xs bg-muted p-2 rounded">
                                <div className="font-medium">{paper.title}</div>
                                <div className="text-muted-foreground">{paper.authors.join(', ')}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{notification.timestamp.toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {alerts.find(a => a.id === notification.alertId)?.title}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => markNotificationRead(notification.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getAlertTypeIcon(alert.type)}
                        <h3 className="font-medium">{alert.title}</h3>
                        <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                          {alert.isActive ? 'Active' : 'Paused'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.query}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Frequency: {alert.frequency}</span>
                        <span>Matches: {alert.matchCount}</span>
                        {alert.lastTriggered && (
                          <span>Last: {alert.lastTriggered.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.isActive}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Alerts Based on Your Activity</CardTitle>
                <CardDescription>We recommend these alerts based on your search history and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'Computer Vision Breakthroughs', type: 'trend', description: 'Track emerging trends in computer vision research' },
                  { title: 'Your Co-author Updates', type: 'author', description: 'Get notified when your collaborators publish new work' },
                  { title: 'BERT Model Variations', type: 'keyword', description: 'Monitor new developments in BERT and transformer models' },
                  { title: 'ImageNet Usage Trends', type: 'dataset', description: 'See how ImageNet is being used in recent research' }
                ].map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{suggestion.title}</div>
                      <div className="text-sm text-muted-foreground">{suggestion.description}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Alert
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}