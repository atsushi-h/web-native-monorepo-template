import type { GetProps } from 'tamagui'
import { styled, Button as TamaguiButtonBase } from 'tamagui'

export const StyledButton = styled(TamaguiButtonBase, {
  name: 'StyledButton',
  variants: {
    variant: {
      primary: {
        bg: '$background',
        color: '$color',
      },
      secondary: {
        bg: '$backgroundPress',
        color: '$color',
      },
      ghost: {
        bg: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
      },
    },
    customSize: {
      small: {
        px: '$2',
        py: '$1',
        fontSize: '$1',
      },
      medium: {
        px: '$3',
        py: '$2',
        fontSize: '$3',
      },
      large: {
        px: '$4',
        py: '$3',
        fontSize: '$5',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
    customSize: 'medium',
  },
})

export type StyledButtonProps = GetProps<typeof StyledButton>

export { StyledButton as TamaguiButton }
