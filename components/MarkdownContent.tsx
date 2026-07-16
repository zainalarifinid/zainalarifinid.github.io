import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-white mt-12 mb-6">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-white mt-8 mb-4">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-medium text-white mt-6 mb-3">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-6 space-y-2 text-gray-300 list-disc list-inside">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-6 space-y-2 text-gray-300 list-decimal list-inside">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-gray-300">{children}</li>
        ),
        code: ({ children, className, ...props }: any) => {
          const isInline = !className?.includes('language-')
          return isInline ? (
            <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm" {...props}>
              {children}
            </code>
          ) : (
            <code className="text-green-400 text-sm" {...props}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-700 my-6">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-6">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="text-white font-semibold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-gray-200 italic">{children}</em>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => {
          const url = typeof src === 'string' ? src : undefined
          const isVideo = url ? /\.(mp4|webm|mov)$/i.test(url) : false

          if (isVideo) {
            return (
              <video
                src={url}
                controls
                playsInline
                className="rounded-lg border border-gray-800 my-8 w-full"
              >
                Your browser does not support the video tag.
              </video>
            )
          }

          return (
            <img
              src={url}
              alt={alt}
              className="rounded-lg border border-gray-800 my-8 w-full"
            />
          )
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-800 text-gray-100">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-700">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="even:bg-gray-900 odd:bg-gray-950 hover:bg-gray-800 transition-colors duration-150">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-700 whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-gray-300 border border-gray-700">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
