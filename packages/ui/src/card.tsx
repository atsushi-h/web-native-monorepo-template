import type { JSX } from 'react'

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string
  title: string
  children: React.ReactNode
  href: string
}): JSX.Element {
  // フォーマットテスト: インデントが不揃い
  const demo: string = '正しい文字列'
  const unused = '未使用変数' // Lintエラー
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel='noopener noreferrer'
      target='_blank'
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  )
}
