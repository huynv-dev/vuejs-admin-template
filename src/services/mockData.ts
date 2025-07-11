import { User, Category, Article } from '@/types/models';

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=random',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    username: 'editor',
    email: 'editor@example.com',
    role: 'editor',
    avatar: 'https://ui-avatars.com/api/?name=Editor&background=random',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'Latest tech news and updates',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    name: 'Business',
    slug: 'business',
    description: 'Business and finance news',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 3,
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Lifestyle and entertainment',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'The Future of AI',
    slug: 'the-future-of-ai',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    excerpt: 'Exploring the future possibilities of artificial intelligence',
    featuredImage: 'https://picsum.photos/800/400',
    status: 'published',
    categoryId: 1,
    authorId: 1,
    tags: ['AI', 'Technology', 'Future'],
    viewCount: 1250,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: 'Market Trends 2024',
    slug: 'market-trends-2024',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    excerpt: 'Analysis of market trends for the year 2024',
    featuredImage: 'https://picsum.photos/800/400',
    status: 'published',
    categoryId: 2,
    authorId: 2,
    tags: ['Markets', 'Finance', 'Trends'],
    viewCount: 850,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    publishedAt: new Date('2024-01-16')
  }
]; 