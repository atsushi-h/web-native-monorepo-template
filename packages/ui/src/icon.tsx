import { AlertTriangle, Check, CheckCircle, Edit3, Plus, Trash2, X } from '@tamagui/lucide-icons'
import type { ComponentProps } from 'react'

export type IconProps = ComponentProps<typeof Plus>

// アイコンマップ
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
    console.warn(`Icon "${name}" not found`)
    return null
  }
  return <IconComponent {...props} />
}
