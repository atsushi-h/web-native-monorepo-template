import { AlertTriangle, Check, CheckCircle, Edit3, Plus, Trash2, X } from '@tamagui/lucide-icons'
import type { ComponentProps } from 'react'

// より汎用的な型定義 - nameプロパティを除外
export type IconProps = Omit<ComponentProps<typeof Plus>, 'name'>

// アイコンマップ - 型安全性を向上
const iconMap: Record<string, typeof Plus> = {
  plus: Plus,
  check: Check,
  checkCircle: CheckCircle,
  x: X,
  close: X, // alias
  edit: Edit3,
  trash: Trash2,
  delete: Trash2, // alias
  alertTriangle: AlertTriangle,
  warning: AlertTriangle, // alias
} as const

export type IconName = keyof typeof iconMap

export interface IconComponentProps extends IconProps {
  name: IconName
}

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name]
  if (!IconComponent) {
    // プロダクション環境での警告除去とフォールバックアイコン
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon "${name}" not found`)
    }
    return <AlertTriangle {...props} />
  }
  return <IconComponent {...props} />
}
