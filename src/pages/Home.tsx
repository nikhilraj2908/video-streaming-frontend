import React, { useEffect, useState } from 'react';
import { VideoCard } from '@/components/video/VideoCard';
import { Flame, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-video.jpg';
import { getAllVideos } from '@/api/videoApi';

interface Video {
  _id: string;
  title: string;
  description: string;
  filePath: string;
  likes: string[];
  comments: string[];
  uploadedBy: {
    name: string;
    email: string;
  };
}

export const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);



  useEffect(() => {
    
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data);
        console.log("checkoing data", videos)
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const trendingVideos = videos.slice(0, 3);
  const recommendedVideos = videos.slice(3);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden">
        <div
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex items-center justify-center text-center text-white p-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">Welcome to StreamTube</h1>
              <p className="text-xl mb-6">Discover amazing videos from creators around the world</p>
              <Button size="lg" variant="video">
                Start Watching
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Flame className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingVideos.map((video) => (
            // <VideoCard key={video._id} video={video} variant="large" />
            <div key={video._id} className="p-4 border rounded shadow space-y-2">
              <video
                controls
                className="w-full rounded"
                src={`http://localhost:1900/uploads/${video.filePath ?? video.videoFilePath}`}
              />
              <h3 className="font-bold text-lg">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
              <p className="text-xs text-muted">Uploaded  : {video.uploadedBy?.name ?? 'Unknown'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedVideos.map((video) => (
            // <VideoCard key={video._id} video={video} />
            <div key={video._id} className="p-4 border rounded shadow space-y-2">
              <video
                controls
                className="w-full rounded"
                src={`http://localhost:1900/uploads/${video.filePath ?? video.videoFilePath}`}
              />
              <h3 className="font-bold text-lg">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
              <p className="text-xs text-muted">Uploaded by: {video.uploadedBy?.name ?? 'Unknown'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Technology', 'Food & Cooking', 'Travel', 'Gaming', 'Music', 'Sports', 'Education', 'Entertainment'].map((category) => (
            <Button
              key={category}
              variant="outline"
              className="h-12 text-left justify-start hover:bg-card-hover"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};
