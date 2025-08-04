import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { VideoCard } from '@/components/video/VideoCard';
import { mockVideos } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [duration, setDuration] = useState('any');
  const [uploadDate, setUploadDate] = useState('any');

  useEffect(() => {
    let filtered = mockVideos;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        video.uploadedBy.displayName.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by duration
    if (duration !== 'any') {
      filtered = filtered.filter(video => {
        if (duration === 'short') return video.duration < 240; // Under 4 minutes
        if (duration === 'medium') return video.duration >= 240 && video.duration < 1200; // 4-20 minutes
        if (duration === 'long') return video.duration >= 1200; // Over 20 minutes
        return true;
      });
    }

    // Filter by upload date
    if (uploadDate !== 'any') {
      const now = new Date();
      filtered = filtered.filter(video => {
        const uploadTime = video.uploadedAt.getTime();
        const timeDiff = now.getTime() - uploadTime;
        
        if (uploadDate === 'hour') return timeDiff < 3600000; // Last hour
        if (uploadDate === 'today') return timeDiff < 86400000; // Last 24 hours
        if (uploadDate === 'week') return timeDiff < 604800000; // Last week
        if (uploadDate === 'month') return timeDiff < 2592000000; // Last month
        if (uploadDate === 'year') return timeDiff < 31536000000; // Last year
        return true;
      });
    }

    // Sort results
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.uploadedAt.getTime() - a.uploadedAt.getTime();
        case 'views':
          return b.views - a.views;
        case 'rating':
          return (b.likes / (b.likes + b.dislikes)) - (a.likes / (a.likes + a.dislikes));
        default: // relevance
          return 0; // In a real app, this would be based on search relevance
      }
    });

    setFilteredVideos(filtered);
  }, [query, sortBy, duration, uploadDate]);

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {query ? `Search results for "${query}"` : 'Search Videos'}
          </h1>
          <p className="text-muted-foreground">
            {filteredVideos.length} result{filteredVideos.length !== 1 ? 's' : ''}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Upload date</SelectItem>
                      <SelectItem value="views">View count</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any duration</SelectItem>
                      <SelectItem value="short">Under 4 minutes</SelectItem>
                      <SelectItem value="medium">4-20 minutes</SelectItem>
                      <SelectItem value="long">Over 20 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload date</label>
                  <Select value={uploadDate} onValueChange={setUploadDate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="hour">Last hour</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSortBy('relevance');
                      setDuration('any');
                      setUploadDate('any');
                    }}
                    className="w-full"
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Results */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No videos found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} variant="horizontal" />
          ))}
        </div>
      )}
    </div>
  );
};