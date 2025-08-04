import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { PlayCircle, Users, Eye, ThumbsUp, TrendingUp, Calendar, Video, MessageSquare } from 'lucide-react';

// Mock data for charts
const videoViewsData = [
  { month: 'Jan', views: 12000, uploads: 45 },
  { month: 'Feb', views: 19000, uploads: 52 },
  { month: 'Mar', views: 15000, uploads: 38 },
  { month: 'Apr', views: 22000, uploads: 61 },
  { month: 'May', views: 28000, uploads: 73 },
  { month: 'Jun', views: 35000, uploads: 84 },
];

const engagementData = [
  { day: 'Mon', likes: 850, comments: 320, shares: 120 },
  { day: 'Tue', likes: 920, comments: 410, shares: 150 },
  { day: 'Wed', likes: 760, comments: 290, shares: 90 },
  { day: 'Thu', likes: 1100, comments: 480, shares: 200 },
  { day: 'Fri', likes: 1300, comments: 520, shares: 280 },
  { day: 'Sat', likes: 1450, comments: 610, shares: 320 },
  { day: 'Sun', likes: 1200, comments: 450, shares: 240 },
];

const categoryData = [
  { name: 'Entertainment', value: 35, color: 'hsl(var(--video-primary))' },
  { name: 'Education', value: 28, color: 'hsl(var(--video-secondary))' },
  { name: 'Gaming', value: 20, color: 'hsl(var(--video-accent))' },
  { name: 'Music', value: 12, color: 'hsl(var(--primary))' },
  { name: 'Sports', value: 5, color: 'hsl(var(--secondary))' },
];

const watchTimeData = [
  { hour: '00', minutes: 1200 },
  { hour: '02', minutes: 800 },
  { hour: '04', minutes: 600 },
  { hour: '06', minutes: 900 },
  { hour: '08', minutes: 1800 },
  { hour: '10', minutes: 2200 },
  { hour: '12', minutes: 2800 },
  { hour: '14', minutes: 3200 },
  { hour: '16', minutes: 3600 },
  { hour: '18', minutes: 4200 },
  { hour: '20', minutes: 4800 },
  { hour: '22', minutes: 3400 },
];

const chartConfig = {
  views: { label: 'Views', color: 'hsl(var(--video-primary))' },
  uploads: { label: 'Uploads', color: 'hsl(var(--video-secondary))' },
  likes: { label: 'Likes', color: 'hsl(var(--video-primary))' },
  comments: { label: 'Comments', color: 'hsl(var(--video-secondary))' },
  shares: { label: 'Shares', color: 'hsl(var(--video-accent))' },
  minutes: { label: 'Watch Time (mins)', color: 'hsl(var(--primary))' },
};

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-foreground text-3xl">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor your platform's performance and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 w-4 h-4" />
            Last 30 days
          </Button>
          <Button size="sm">
            <TrendingUp className="mr-2 w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-video-primary/10 to-video-primary/5 border-video-primary/20">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Videos</CardTitle>
            <Video className="w-4 h-4 text-video-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-video-primary text-2xl">12,453</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-video-secondary/10 to-video-secondary/5 border-video-secondary/20">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Views</CardTitle>
            <Eye className="w-4 h-4 text-video-secondary" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-video-secondary text-2xl">2.4M</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-500">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-video-accent/10 to-video-accent/5 border-video-accent/20">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Users</CardTitle>
            <Users className="w-4 h-4 text-video-accent" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-video-accent text-2xl">45,231</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-500">+15%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Engagement Rate</CardTitle>
            <ThumbsUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-primary text-2xl">68.4%</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-500">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        {/* Video Views & Uploads Trend */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-video-primary" />
              Video Performance Trends
            </CardTitle>
            <CardDescription>Monthly views and upload statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={videoViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="var(--color-views)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="uploads" fill="var(--color-uploads)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Engagement Analytics */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-video-secondary" />
              Weekly Engagement
            </CardTitle>
            <CardDescription>Likes, comments, and shares breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="likes" stroke="var(--color-likes)" strokeWidth={3} dot={{ fill: "var(--color-likes)" }} />
                <Line type="monotone" dataKey="comments" stroke="var(--color-comments)" strokeWidth={3} dot={{ fill: "var(--color-comments)" }} />
                <Line type="monotone" dataKey="shares" stroke="var(--color-shares)" strokeWidth={3} dot={{ fill: "var(--color-shares)" }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Content Categories */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Video uploads by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        return (
                          <div className="bg-background shadow-md p-2 border rounded-lg">
                            <p className="font-medium text-sm">{payload[0].payload.name}</p>
                            <p className="text-muted-foreground text-sm">{payload[0].value}% of total</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {categoryData.map((item, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <div className="rounded-full w-2 h-2" style={{ backgroundColor: item.color }} />
                  {item.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Watch Time Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Watch Time</CardTitle>
            <CardDescription>Total watch time distribution by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={watchTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="var(--color-minutes)"
                  fill="var(--color-minutes)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
          <CardDescription>Latest actions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New video uploaded', user: 'TechReviewer', time: '2 minutes ago', type: 'upload' },
              { action: 'User reported content', user: 'System Alert', time: '15 minutes ago', type: 'warning' },
              { action: 'Video reached 1M views', user: 'MusicChannel', time: '1 hour ago', type: 'milestone' },
              { action: 'New user registration', user: 'NewCreator2024', time: '2 hours ago', type: 'user' },
              { action: 'Comment flagged for review', user: 'AutoMod', time: '3 hours ago', type: 'warning' },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center bg-card-hover p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'upload' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    activity.type === 'milestone' ? 'bg-purple-500' :
                    'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-muted-foreground text-xs">{activity.user}</p>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};