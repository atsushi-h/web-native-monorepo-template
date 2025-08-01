import { useState } from 'react'
import type { GetProps } from 'tamagui'
import { Button, Form, Input, styled, XStack } from 'tamagui'
import { Icon } from './icon'

export interface TodoFormProps {
  onSubmit: (title: string) => void
  placeholder?: string
  isLoading?: boolean
}

const StyledForm = styled(Form, {
  name: 'TodoForm',
  width: '100%',
})

const StyledInput = styled(Input, {
  name: 'TodoInput',
  flex: 1,
  size: '$4',
  bg: '$background',
  borderColor: '$borderColor',
  focusStyle: {
    borderColor: '$color',
  },
})

const SubmitButton = styled(Button, {
  name: 'TodoSubmitButton',
  size: '$4',
  bg: '$color',
  color: '$background',
  hoverStyle: {
    opacity: 0.9,
  },
  pressStyle: {
    opacity: 0.8,
  },
  disabledStyle: {
    opacity: 0.5,
  },
})

export function TodoForm({
  onSubmit,
  placeholder = 'Add a new todo...',
  isLoading = false,
}: TodoFormProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      onSubmit(trimmedValue)
      setValue('')
    }
  }

  const handleKeyPress = (e: {
    nativeEvent?: { key?: string }
    key?: string
    preventDefault?: () => void
  }) => {
    if ((e.nativeEvent?.key === 'Enter' || e.key === 'Enter') && !isLoading) {
      e.preventDefault?.()
      handleSubmit()
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <XStack gap='$3'>
        <StyledInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <SubmitButton onPress={handleSubmit} disabled={!value.trim() || isLoading} circular>
          <Icon name='plus' size='$1' />
        </SubmitButton>
      </XStack>
    </StyledForm>
  )
}

export type TodoFormComponentProps = GetProps<typeof TodoForm>
