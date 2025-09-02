import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { BookmarkPlus, ExternalLink, Users, Calendar, Quote, Code, Database, CheckCircle, AlertTriangle, TrendingUp, Globe } from 'lucide-react'

interface Paper {
  id: number
  title: string
  authors: string[]
  abstract: string
  year: number
  citations: number
  venue: string
  tags: string[]
  codeAvailable?: boolean
  dataAvailable?: boolean
  reproducibilityScore?: number
  impactScore?: number
  altmetricScore?: number
  datasets?: string[]
  recentCitationSpike?: boolean
}

interface PaperResultsProps {
  papers: Paper[]
  searchQuery: string
}

export function PaperResults({ papers, searchQuery }: PaperResultsProps) {
  if (papers.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <BookmarkPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="mb-2">No papers found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      </div>
    )
  }

  if (papers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <BookmarkPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="mb-2">Search for Research Papers</h3>
          <p>Enter keywords, author names, or paper titles to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {papers.length} papers for "{searchQuery}"
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <Card key={paper.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="line-clamp-2 leading-6">
                  {paper.title}
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <BookmarkPlus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span className="truncate">{paper.authors[0]}{paper.authors.length > 1 ? ` +${paper.authors.length - 1}` : ''}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{paper.year}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {paper.abstract}
              </p>

              {/* Reproducibility & Impact Indicators */}
              <div className="flex items-center gap-3 text-xs">
                {paper.codeAvailable && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Code className="w-3 h-3" />
                    <span>Code</span>
                  </div>
                )}
                {paper.dataAvailable && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <Database className="w-3 h-3" />
                    <span>Data</span>
                  </div>
                )}
                {paper.reproducibilityScore && paper.reproducibilityScore > 70 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>Reproducible</span>
                  </div>
                )}
                {paper.recentCitationSpike && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending</span>
                  </div>
                )}
              </div>

              {/* Impact Metrics */}
              {(paper.reproducibilityScore || paper.impactScore) && (
                <div className="space-y-2">
                  {paper.reproducibilityScore && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Reproducibility</span>
                        <span>{paper.reproducibilityScore}%</span>
                      </div>
                      <Progress value={paper.reproducibilityScore} className="h-1" />
                    </div>
                  )}
                  {paper.impactScore && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Impact Score</span>
                        <span>{paper.impactScore}/100</span>
                      </div>
                      <Progress value={paper.impactScore} className="h-1" />
                    </div>
                  )}
                </div>
              )}

              {/* Datasets Used */}
              {paper.datasets && paper.datasets.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Datasets:</div>
                  <div className="flex flex-wrap gap-1">
                    {paper.datasets.slice(0, 2).map((dataset) => (
                      <Badge key={dataset} variant="outline" className="text-xs">
                        <Database className="w-2 h-2 mr-1" />
                        {dataset}
                      </Badge>
                    ))}
                    {paper.datasets.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{paper.datasets.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {paper.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {paper.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{paper.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Quote className="w-3 h-3" />
                    <span>{paper.citations.toLocaleString()}</span>
                  </div>
                  {paper.altmetricScore && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>{paper.altmetricScore}</span>
                    </div>
                  )}
                  <span>{paper.venue}</span>
                </div>
                
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}