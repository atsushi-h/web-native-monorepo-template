import type { CardProps } from 'tamagui'
import { Card, H2, Paragraph, XStack, YStack } from 'tamagui'

interface TamaguiCardProps extends CardProps {
  title?: string
  description?: string
  footer?: React.ReactNode
}

export function TamaguiCard({ title, description, footer, children, ...props }: TamaguiCardProps) {
  return (
    <Card
      elevate
      bordered
      animation='bouncy'
      size='$4'
      padding='$4'
      gap='$3'
      hoverStyle={{
        scale: 0.98,
        borderColor: '$borderColor',
      }}
      pressStyle={{
        scale: 0.97,
      }}
      {...props}
    >
      <YStack gap='$2'>
        {title && (
          <H2 size='$6' color='$color'>
            {title}
          </H2>
        )}
        {description && (
          <Paragraph size='$3' color='$colorPress'>
            {description}
          </Paragraph>
        )}
        {children}
      </YStack>
      {footer && (
        <XStack pt='$3' borderTopWidth={1} borderTopColor='$borderColor'>
          {footer}
        </XStack>
      )}
    </Card>
  )
}
