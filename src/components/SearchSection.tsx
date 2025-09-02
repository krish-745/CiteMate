import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Search, Filter, X, Database, Calendar, Building, Users, Zap } from 'lucide-react'

interface SearchSectionProps {
  onSearch: (query: string) => void
}

export function SearchSection({ onSearch }: SearchSectionProps) {
  const [query, setQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([])
  const [selectedVenues, setSelectedVenues] = useState<string[]>([])
  const [dateRange, setDateRange] = useState('all')
  const [searchMode, setSearchMode] = useState<'basic' | 'advanced'>('basic')
  const [sortBy, setSortBy] = useState('relevance')

  const filterOptions = [
    'Machine Learning',
    'Natural Language Processing', 
    'Computer Vision',
    'Robotics',
    'Data Science',
    'AI Ethics',
    'Quantum Computing',
    'Climate Science',
    'Biotechnology',
    'Healthcare AI'
  ]

  const datasetOptions = [
    'ImageNet',
    'COCO',
    'BERT',
    'GPT',
    'GLUE',
    'SQuAD',
    'MS MARCO',
    'Common Crawl',
    'OpenWebText',
    'C4'
  ]

  const venueOptions = [
    'NeurIPS',
    'ICLR',
    'ICML',
    'AAAI',
    'Nature',
    'Science',
    'CVPR',
    'ICCV',
    'ACL',
    'EMNLP'
  ]

  const handleSearch = () => {
    onSearch(query)
  }

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter))
  }

  const addDataset = (dataset: string) => {
    if (!selectedDatasets.includes(dataset)) {
      setSelectedDatasets([...selectedDatasets, dataset])
    }
  }

  const removeDataset = (dataset: string) => {
    setSelectedDatasets(selectedDatasets.filter(d => d !== dataset))
  }

  const addVenue = (venue: string) => {
    if (!selectedVenues.includes(venue)) {
      setSelectedVenues([...selectedVenues, venue])
    }
  }

  const removeVenue = (venue: string) => {
    setSelectedVenues(selectedVenues.filter(v => v !== venue))
  }

  const quickQueries = [
    'Papers using ImageNet beyond 2023',
    'Which datasets dominate climate prediction research?',
    'Find all BERT variations with code available',
    'Papers with reproducible results in computer vision',
    'Trending datasets in NLP this year'
  ]

  return (
    <div className="space-y-4">
      {/* Quick Access Queries */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Dataset-Aware Quick Queries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickQueries.map((queryText) => (
              <Button
                key={queryText}
                variant="outline"
                size="sm"
                onClick={() => setQuery(queryText)}
                className="text-xs"
              >
                {queryText}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Search */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search research papers by title, author, keywords, or ask dataset-specific questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setSearchMode(searchMode === 'basic' ? 'advanced' : 'basic')}
        >
          {searchMode === 'basic' ? 'Advanced' : 'Basic'}
        </Button>
        <Button onClick={handleSearch} className="px-6">
          Search
        </Button>
      </div>

      {searchMode === 'advanced' && (
        <Tabs defaultValue="filters" className="space-y-4">
          <TabsList>
            <TabsTrigger value="filters">Field Filters</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="venues">Venues & Sources</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>

          <TabsContent value="filters" className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select onValueChange={addFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Add research field" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="datasets" className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              <Select onValueChange={addDataset}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by dataset" />
                </SelectTrigger>
                <SelectContent>
                  {datasetOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="venues" className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              <Select onValueChange={addVenue}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by venue" />
                </SelectTrigger>
                <SelectContent>
                  {venueOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="metadata" className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="last2years">Last 2 years</SelectItem>
                    <SelectItem value="last5years">Last 5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="citations">Citations</SelectItem>
                    <SelectItem value="impact">Impact Score</SelectItem>
                    <SelectItem value="reproducibility">Reproducibility</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Active Filters Display */}
      {(selectedFilters.length > 0 || selectedDatasets.length > 0 || selectedVenues.length > 0) && (
        <div className="space-y-2">
          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Fields:</span>
              {selectedFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          )}
          
          {selectedDatasets.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Datasets:</span>
              {selectedDatasets.map((dataset) => (
                <Badge key={dataset} variant="outline" className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  {dataset}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeDataset(dataset)}
                  />
                </Badge>
              ))}
            </div>
          )}
          
          {selectedVenues.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Venues:</span>
              {selectedVenues.map((venue) => (
                <Badge key={venue} variant="outline" className="flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {venue}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeVenue(venue)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}