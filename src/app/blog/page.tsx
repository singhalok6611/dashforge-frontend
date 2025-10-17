import Link from 'next/link';
import { Code, Calendar, User, ArrowRight, Newspaper } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DashForge</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4 mr-2" />
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            DashForge Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Product updates, best practices, and insights from the DashForge team
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogPostCard
              title="Introducing DashForge: Build Internal Tools Faster"
              excerpt="Today, we're excited to announce the launch of DashForge, a low-code platform designed to help developers build internal tools in minutes."
              date="January 15, 2025"
              author="Alok Singh"
              category="Product"
            />
            <BlogPostCard
              title="5 Best Practices for Building Admin Panels"
              excerpt="Learn the key principles for creating efficient and user-friendly admin interfaces that your team will love."
              date="January 10, 2025"
              author="DashForge Team"
              category="Tutorial"
            />
            <BlogPostCard
              title="Security First: How We Protect Your Data"
              excerpt="A deep dive into DashForge's security architecture, from encryption to access controls."
              date="January 5, 2025"
              author="DashForge Team"
              category="Security"
            />
            <BlogPostCard
              title="Connecting to PostgreSQL: A Complete Guide"
              excerpt="Step-by-step instructions for securely connecting your PostgreSQL database to DashForge."
              date="December 28, 2024"
              author="DashForge Team"
              category="Tutorial"
            />
            <BlogPostCard
              title="Building Your First Dashboard in 5 Minutes"
              excerpt="Follow along as we build a complete customer dashboard from scratch using DashForge."
              date="December 20, 2024"
              author="DashForge Team"
              category="Tutorial"
            />
            <BlogPostCard
              title="Why We Built DashForge in Mumbai"
              excerpt="The story behind DashForge and our mission to empower developers in India and around the world."
              date="December 15, 2024"
              author="Alok Singh"
              category="Company"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start building?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Join thousands of developers using DashForge
          </p>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Building Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 DashForge. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogPostCard({
  title,
  excerpt,
  date,
  author,
  category
}: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-4">
          {category}
        </span>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{excerpt}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {author}
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <a
          href="#"
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}
