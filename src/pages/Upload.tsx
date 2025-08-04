import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload as UploadIcon, Video, Image, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
// import { useAuth } from '@/hooks/useAuth';
import { useAuth } from '@/contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(5000, 'Description must be less than 5000 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string(),
  visibility: z.enum(['public', 'unlisted', 'private']),
});

type UploadFormData = z.infer<typeof uploadSchema>;

const categories = [
  'Technology',
  'Gaming',
  'Music',
  'Sports',
  'Entertainment',
  'Education',
  'Food & Cooking',
  'Travel',
  'Fashion',
  'Art',
  'Science',
  'Comedy',
];

export const Upload: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      tags: '',
      visibility: 'public',
    },
  });

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleVideoFileChange = useCallback((file: File) => {
    if (file.type.startsWith('video/')) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      
      // Auto-generate title from filename
      const filename = file.name.replace(/\.[^/.]+$/, '');
      form.setValue('title', filename);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select a video file (MP4, WebM, etc.)',
        variant: 'destructive',
      });
    }
  }, [form, toast]);

  const handleThumbnailFileChange = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file (JPG, PNG, etc.)',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (videoFile) handleVideoFileChange(videoFile);
    if (imageFile) handleThumbnailFileChange(imageFile);
  }, [handleVideoFileChange, handleThumbnailFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const simulateUpload = () => {
    return new Promise<void>((resolve) => {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            resolve();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    });
  };

  // const handleSubmit = async (data: UploadFormData) => {
  //   if (!videoFile) {
  //     toast({
  //       title: 'No video selected',
  //       description: 'Please select a video file to upload.',
  //       variant: 'destructive',
  //     });
  //     return;
  //   }

  //   try {
  //     await simulateUpload();
      
  //     toast({
  //       title: 'Video uploaded successfully!',
  //       description: 'Your video is now processing and will be available shortly.',
  //     });
      
  //     navigate('/');
  //   } catch (error) {
  //     toast({
  //       title: 'Upload failed',
  //       description: 'Please try again later.',
  //       variant: 'destructive',
  //     });
  //   }
  // };
  const handleSubmit = async (data: UploadFormData) => {
  if (!videoFile) {
    toast({
      title: 'No video selected',
      description: 'Please select a video file to upload.',
      variant: 'destructive',
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('tags', data.tags);
    formData.append('visibility', data.visibility);
    formData.append('video', videoFile);
    if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

    const res = await fetch('http://localhost:1900/api/video/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // From useAuth()
      },
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.msg || 'Upload failed');

    toast({ title: 'Video uploaded!', description: result.msg });
    navigate('/');
  } catch (err) {
    toast({
      title: 'Upload failed',
      description: err.message || 'Try again later.',
      variant: 'destructive',
    });
  }
};


  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    form.reset();
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
        <p className="text-muted-foreground">Share your content with the world</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Video File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!videoFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Drag and drop your video here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports MP4, WebM (Max 2GB)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById('video-input')?.click()}
                >
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Select Video
                </Button>
                <input
                  id="video-input"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleVideoFileChange(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <video
                    src={videoPreview!}
                    controls
                    className="w-full rounded-lg"
                    style={{ maxHeight: '200px' }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeVideo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm">
                  <p className="font-medium">{videoFile.name}</p>
                  <p className="text-muted-foreground">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Custom Thumbnail (Optional)</Label>
              {!thumbnailPreview ? (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('thumbnail-input')?.click()}
                  >
                    Upload Thumbnail
                  </Button>
                  <input
                    id="thumbnail-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleThumbnailFileChange(e.target.files[0])}
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeThumbnail}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Video Details */}
        <Card>
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter video title"
                  {...form.register('title')}
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your video..."
                  className="min-h-[100px]"
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => form.setValue('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="tech, review, tutorial (comma separated)"
                  {...form.register('tags')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select 
                  defaultValue="public" 
                  onValueChange={(value) => form.setValue('visibility', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Public
                      </div>
                    </SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <Label>Upload Progress</Label>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!videoFile || isUploading}
                variant="video"
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};