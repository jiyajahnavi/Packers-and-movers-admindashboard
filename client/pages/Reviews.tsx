import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter,
  Star,
  ThumbsUp,
  MessageSquare,
  Calendar,
  User,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  bookingId: string;
  reviewText: string;
  route: string;
  helpful: number;
  verified: boolean;
}

const reviewsData: Review[] = [
  {
    id: 'RV001',
    customerName: 'Rajesh Kumar',
    rating: 5,
    date: '2024-01-20',
    bookingId: 'BK001',
    reviewText: 'Excellent service! The team was very professional and handled all my belongings with care. They arrived on time and completed the move efficiently. Highly recommended for anyone looking for reliable packers and movers.',
    route: 'Delhi → Mumbai',
    helpful: 12,
    verified: true
  },
  {
    id: 'RV002',
    customerName: 'Priya Sharma',
    rating: 4,
    date: '2024-01-18',
    bookingId: 'BK002',
    reviewText: 'Good service overall. The packing was done well and everything arrived safely. Only minor issue was a slight delay in pickup time, but they communicated well about it.',
    route: 'Bangalore → Chennai',
    helpful: 8,
    verified: true
  },
  {
    id: 'RV003',
    customerName: 'Amit Patel',
    rating: 5,
    date: '2024-01-15',
    bookingId: 'BK003',
    reviewText: 'Outstanding experience! From the initial quote to final delivery, everything was smooth. The staff was courteous and took extra care of fragile items. Will definitely use again.',
    route: 'Pune → Hyderabad',
    helpful: 15,
    verified: true
  },
  {
    id: 'RV004',
    customerName: 'Sunita Gupta',
    rating: 3,
    date: '2024-01-12',
    bookingId: 'BK004',
    reviewText: 'Average service. The move was completed but there were some issues with timing and a few items got minor scratches. Customer service was responsive in resolving concerns.',
    route: 'Kolkata → Bhubaneswar',
    helpful: 5,
    verified: true
  },
  {
    id: 'RV005',
    customerName: 'Ravi Singh',
    rating: 5,
    date: '2024-01-10',
    bookingId: 'BK005',
    reviewText: 'Perfect office relocation service! They handled all the electronics and furniture with great care. The team was well-organized and completed the move within the promised timeframe.',
    route: 'Noida → Gurgaon',
    helpful: 18,
    verified: true
  },
  {
    id: 'RV006',
    customerName: 'Meera Joshi',
    rating: 4,
    date: '2024-01-08',
    bookingId: 'BK006',
    reviewText: 'Very satisfied with the service. Professional team, good packing quality, and reasonable pricing. The only suggestion would be to improve the tracking system for better visibility.',
    route: 'Mumbai → Bangalore',
    helpful: 10,
    verified: true
  },
  {
    id: 'RV007',
    customerName: 'Deepak Verma',
    rating: 2,
    date: '2024-01-05',
    bookingId: 'BK007',
    reviewText: 'Had some issues with this move. There was significant delay and a few items were damaged. However, the company did compensate for the damages after raising the concern.',
    route: 'Jaipur → Ahmedabad',
    helpful: 3,
    verified: true
  },
  {
    id: 'RV008',
    customerName: 'Kavya Reddy',
    rating: 5,
    date: '2024-01-03',
    bookingId: 'BK008',
    reviewText: 'Exceptional service from start to finish! The team was punctual, professional, and went above and beyond to ensure everything was perfect. Best moving experience I\'ve ever had.',
    route: 'Chennai → Hyderabad',
    helpful: 22,
    verified: true
  }
];

const StarRating = ({ rating, showNumber = true }: { rating: number; showNumber?: boolean }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          )}
        />
      ))}
      {showNumber && (
        <span className="text-sm font-medium text-gray-700 ml-2">
          {rating}.0
        </span>
      )}
    </div>
  );
};

const getRatingColor = (rating: number) => {
  if (rating >= 5) return 'text-green-600 bg-green-50 border-green-200';
  if (rating >= 4) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (rating >= 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

export default function Reviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredReviews, setFilteredReviews] = useState(reviewsData);

  // Filter and sort reviews
  React.useEffect(() => {
    let filtered = reviewsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.route.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      const targetRating = parseInt(ratingFilter);
      filtered = filtered.filter(review => review.rating === targetRating);
    }

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  }, [searchTerm, ratingFilter, sortBy]);

  const averageRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
  const totalReviews = reviewsData.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviewsData.filter(review => review.rating === rating).length,
    percentage: (reviewsData.filter(review => review.rating === rating).length / totalReviews) * 100
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
          <p className="text-gray-600 mt-1">Track customer feedback and manage your service ratings.</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={Math.round(averageRating)} showNumber={false} />
              <div className="text-sm text-gray-600 mt-2">
                Based on {totalReviews} reviews
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-12">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search reviews by customer, content, or booking ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rating</SelectItem>
                    <SelectItem value="lowest">Lowest Rating</SelectItem>
                    <SelectItem value="helpful">Most Helpful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <Card 
              key={review.id} 
              className="shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                        {review.verified && (
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {review.route}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className={cn('border text-xs font-medium px-2 py-1', getRatingColor(review.rating))}>
                    {review.rating}.0 ★
                  </Badge>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={review.rating} />
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {review.reviewText}
                </p>

                {/* Review Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Booking: {review.bookingId}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {review.helpful}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {reviewsData.filter(r => r.rating >= 4).length}
              </div>
              <div className="text-sm text-gray-600">Positive Reviews</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round(reviewsData.reduce((sum, r) => sum + r.helpful, 0) / reviewsData.length)}
              </div>
              <div className="text-sm text-gray-600">Avg. Helpful Votes</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {reviewsData.filter(r => r.verified).length}
              </div>
              <div className="text-sm text-gray-600">Verified Reviews</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
