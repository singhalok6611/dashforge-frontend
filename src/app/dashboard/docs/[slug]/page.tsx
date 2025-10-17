'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { getArticleBySlug, docArticles } from '@/lib/docs-content';
import ReactMarkdown from 'react-markdown';

export default function DocArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The documentation article you're looking for doesn't exist.</p>
          <Link href="/dashboard/docs">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related articles
  const relatedArticles = article.relatedArticles?.map(slug => docArticles[slug]).filter(Boolean) || [];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/dashboard/docs" className="hover:text-gray-900">Documentation</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">{article.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/docs" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documentation
          </Link>

          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium mr-3">
                {article.category}
              </span>
              <Clock className="w-4 h-4 mr-1" />
              {article.duration}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-gray-600">
              {article.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                  code: ({node, inline, ...props}: any) =>
                    inline ? (
                      <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                    ) : (
                      <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto my-4" {...props} />
                    ),
                  a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-700 underline" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/dashboard/docs/${related.slug}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{related.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{related.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {related.duration}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Need More Help?</h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary">Contact Support</Button>
            <Button variant="outline">Join Community</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
