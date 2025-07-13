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
  // フォーマットエラー: インデントが不揃い
  const wrongType: number = 'これは文字列です' // 型エラー
  
  // より複雑な型エラー
  const complexError: { name: string; age: number } = {
    name: 123, // 数値を文字列に
    age: "25", // 文字列を数値に
    extra: true // 存在しないプロパティ
  }
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
