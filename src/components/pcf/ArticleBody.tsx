import Link from 'next/link'
import type { ArticleSection } from '@/lib/pcf-articles'

function renderWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <Link key={key++} href={match[2]} className="font-semibold text-[#c9a227] underline underline-offset-2 hover:text-[#b8891e]">
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

export function PcfArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
      {sections.map((section, i) => (
        <div key={i}>
          {section.heading && (
            <h2 className="mb-3 mt-10 text-xl font-black text-gray-900 first:mt-0">{section.heading}</h2>
          )}
          {section.paragraphs.map((p, j) => (
            <p key={j} className="mb-4">{renderWithLinks(p)}</p>
          ))}
        </div>
      ))}
    </div>
  )
}
