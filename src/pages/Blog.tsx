import { Link } from 'react-router-dom'

const posts = [
  {
    id: 1,
    title: 'Understanding DeFi Lending: A Comprehensive Guide',
    href: '/blog/defi-lending-guide',
    description: "Learn the fundamentals of decentralized lending, how it works, and why it's revolutionizing traditional finance.",
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
    date: 'Mar 16, 2024',
    datetime: '2024-03-16',
    category: { title: 'Education', href: '/blog/category/education' },
    author: {
      name: 'Sarah Chen',
      role: 'DeFi Analyst',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
  },
  {
    id: 2,
    title: "The Rise of Polygon: Why It's Perfect for DeFi",
    href: '/blog/polygon-defi',
    description: "Discover why Polygon has become the go-to blockchain for DeFi applications and how it's transforming the ecosystem.",
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
    date: 'Mar 10, 2024',
    datetime: '2024-03-10',
    category: { title: 'Technology', href: '/blog/category/technology' },
    author: {
      name: 'Michael Park',
      role: 'Blockchain Developer',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5',
    },
  },
  {
    id: 3,
    title: 'Risk Management in DeFi: Best Practices for Lenders',
    href: '/blog/defi-risk-management',
    description: 'Essential strategies and best practices for managing risk when lending in decentralized finance protocols.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
    date: 'Mar 5, 2024',
    datetime: '2024-03-05',
    category: { title: 'Risk Management', href: '/blog/category/risk-management' },
    author: {
      name: 'David Kim',
      role: 'Risk Analyst',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    },
  },
]

export default function Blog() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Polylender Blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn about DeFi, lending, and the future of decentralized finance.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <Link
                    to={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
} 