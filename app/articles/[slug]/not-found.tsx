import Link from 'next/link'
import { FileX, ArrowLeft } from 'lucide-react'

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="mb-8">
          <FileX size={64} className="text-gray-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 leading-relaxed">
            Sorry, the article you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>
          
          <div className="text-center">
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
