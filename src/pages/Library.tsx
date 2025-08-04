import React from 'react';
import { Clock, ThumbsUp, PlaySquare, History, Download } from 'lucide-react';
import { VideoCard } from '@/components/video/VideoCard';
import { mockVideos, mockPlaylists } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Library: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  // Mock user library data
  const watchLaterVideos = mockVideos.slice(0, 3);
  const likedVideos = mockVideos.slice(2, 5);
  const watchHistory = mockVideos.slice(1, 4);
  const userPlaylists = mockPlaylists;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Library</h1>
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="playlists" className="gap-2">
            <PlaySquare className="h-4 w-4" />
            Playlists
          </TabsTrigger>
          <TabsTrigger value="watch-later" className="gap-2">
            <Clock className="h-4 w-4" />
            Watch Later
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            Liked Videos
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Playlists</h2>
            <Button>Create Playlist</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPlaylists.map((playlist) => (
              <Card key={playlist.id} className="group cursor-pointer hover:bg-card-hover transition-smooth">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {playlist.videos.length} videos
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-smooth">
                    {playlist.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {playlist.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <span>{playlist.isPublic ? 'Public' : 'Private'}</span>
                    <span>Updated {playlist.updatedAt.toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watch-later" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Watch Later</h2>
            <p className="text-muted-foreground">{watchLaterVideos.length} videos</p>
          </div>
          
          <div className="space-y-4">
            {watchLaterVideos.map((video) => (
              <VideoCard key={video.id} video={video} variant="horizontal" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Liked Videos</h2>
            <p className="text-muted-foreground">{likedVideos.length} videos</p>
          </div>
          
          <div className="space-y-4">
            {likedVideos.map((video) => (
              <VideoCard key={video.id} video={video} variant="horizontal" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Watch History</h2>
            <Button variant="outline" size="sm">Clear All</Button>
          </div>
          
          <div className="space-y-4">
            {watchHistory.map((video) => (
              <VideoCard key={video.id} video={video} variant="horizontal" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5 hours</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
            <PlaySquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Available offline</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};