import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Clock, Eye } from 'lucide-react';
import { Video } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VideoCardProps {
  video: Video;
  variant?: 'default' | 'horizontal' | 'large';
}

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
};

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
};

export const VideoCard: React.FC<VideoCardProps> = ({ video, variant = 'default' }) => {
  if (variant === 'horizontal') {
    return (
      <div className="flex gap-3 group">
        <div className="relative flex-shrink-0">
          <Link to={`/watch/${video.id}`}>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-40 h-24 object-cover rounded-lg transition-smooth group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              {formatDuration(video.duration)}
            </div>
          </Link>
        </div>
        
        <div className="flex-1 min-w-0">
          <Link to={`/watch/${video.id}`}>
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-smooth">
              {video.title}
            </h3>
          </Link>
          
          <Link to={`/channel/${video.uploadedBy.username}`}>
            <p className="text-sm text-muted-foreground hover:text-foreground transition-smooth mt-1">
              {video.uploadedBy.displayName}
            </p>
          </Link>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Eye className="h-3 w-3" />
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{formatTimeAgo(video.uploadedAt)}</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Clock className="h-4 w-4 mr-2" />
              Save to Watch Later
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  const cardClass = variant === 'large' ? 'max-w-sm' : 'max-w-xs';

  return (
    <div className={`${cardClass} group cursor-pointer`}>
      <div className="relative">
        <Link to={`/watch/${video.id}`}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover rounded-lg transition-smooth group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </div>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Clock className="h-4 w-4 mr-2" />
              Save to Watch Later
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex gap-3 mt-3">
        <Link to={`/channel/${video.uploadedBy.username}`}>
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={video.uploadedBy.avatar} />
            <AvatarFallback>
              {video.uploadedBy.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link to={`/watch/${video.id}`}>
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-smooth">
              {video.title}
            </h3>
          </Link>
          
          <Link to={`/channel/${video.uploadedBy.username}`}>
            <p className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              {video.uploadedBy.displayName}
              {video.uploadedBy.isVerified && <span className="ml-1 text-primary">✓</span>}
            </p>
          </Link>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{formatTimeAgo(video.uploadedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};