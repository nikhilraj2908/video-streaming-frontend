import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Download, Flag, Bell, BellOff } from 'lucide-react';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { VideoCard } from '@/components/video/VideoCard';
import { mockVideos, mockComments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';

export const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [comment, setComment] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const video = mockVideos.find(v => v.id === id);
  const relatedVideos = mockVideos.filter(v => v.id !== id).slice(0, 10);
  const videoComments = mockComments.filter(c => c.videoId === id);

  if (!video) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Video not found</p>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Video Content */}
      <div className="lg:col-span-2 space-y-4">
        {/* Video Player */}
        <VideoPlayer
          src={video.videoUrl}
          poster={video.thumbnail}
          className="aspect-video w-full"
        />

        {/* Video Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{video.title}</h1>

          {/* Channel Info & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to={`/channel/${video.uploadedBy.username}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={video.uploadedBy.avatar} />
                  <AvatarFallback>
                    {video.uploadedBy.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              
              <div>
                <Link to={`/channel/${video.uploadedBy.username}`}>
                  <h3 className="font-semibold hover:text-primary transition-smooth">
                    {video.uploadedBy.displayName}
                    {video.uploadedBy.isVerified && <span className="ml-1 text-primary">✓</span>}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(video.uploadedBy.subscriberCount)} subscribers
                </p>
              </div>

              <Button
                variant={isSubscribed ? "outline" : "subscribe"}
                size="sm"
                onClick={handleSubscribe}
                className="ml-4"
              >
                {isSubscribed ? (
                  <>
                    <BellOff className="h-4 w-4 mr-1" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-1" />
                    Subscribe
                  </>
                )}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-secondary rounded-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`rounded-full rounded-r-none ${isLiked ? 'text-primary' : ''}`}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {formatNumber(video.likes + (isLiked ? 1 : 0))}
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDislike}
                  className={`rounded-full rounded-l-none ${isDisliked ? 'text-primary' : ''}`}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  {formatNumber(video.dislikes + (isDisliked ? 1 : 0))}
                </Button>
              </div>

              <Button variant="ghost" size="sm" className="rounded-full">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>

              <Button variant="ghost" size="sm" className="rounded-full">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Video Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatNumber(video.views)} views</span>
            <span>•</span>
            <span>{formatDate(video.uploadedAt)}</span>
          </div>

          {/* Description */}
          <div className="bg-secondary rounded-lg p-4">
            <div className={`${showFullDescription ? '' : 'line-clamp-3'}`}>
              {video.description}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 p-0 h-auto font-semibold"
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {videoComments.length} Comments
          </h3>

          {/* Add Comment */}
          {isAuthenticated && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" size="sm" onClick={() => setComment('')}>
                    Cancel
                  </Button>
                  <Button size="sm" disabled={!comment.trim()}>
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {videoComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Link to={`/channel/${comment.author.username}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>
                      {comment.author.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Link to={`/channel/${comment.author.username}`}>
                      <span className="font-semibold text-sm hover:text-primary transition-smooth">
                        @{comment.author.username}
                      </span>
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {comment.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Related Videos */}
      <div className="space-y-4">
        <h3 className="font-semibold">Up Next</h3>
        <div className="space-y-4">
          {relatedVideos.map((video) => (
            <VideoCard key={video.id} video={video} variant="horizontal" />
          ))}
        </div>
      </div>
    </div>
  );
};