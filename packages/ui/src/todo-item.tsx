import { memo, useState } from 'react'
import type { GetProps } from 'tamagui'
import { Button, Checkbox, Input, ListItem, Paragraph, styled, XStack, YStack } from 'tamagui'

export interface TodoItemProps {
  id: number
  title: string
  completed: boolean
  onToggle: (id: number) => void
  onUpdate: (id: number, title: string) => void
  onDelete: (id: number) => void
}

const StyledListItem = styled(ListItem, {
  name: 'TodoListItem',
  bg: '$background',
  px: '$3',
  py: '$3',
  my: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
  hoverStyle: {
    bg: '$backgroundHover',
  },
  pressStyle: {
    bg: '$backgroundPress',
  },
})

const ActionButton = styled(Button, {
  name: 'TodoActionButton',
  size: '$3',
  circular: true,
  chromeless: true,
  p: '$2',
})

export const TodoItem = memo(function TodoItem({
  id,
  title,
  completed,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(title)

  const handleUpdate = () => {
    if (editValue.trim() && editValue !== title) {
      onUpdate(id, editValue.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(title)
    setIsEditing(false)
  }

  const handleKeyPress = (e: { nativeEvent?: { key?: string }; key?: string }) => {
    if (e.nativeEvent?.key === 'Enter' || e.key === 'Enter') {
      handleUpdate()
    } else if (e.nativeEvent?.key === 'Escape' || e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <StyledListItem>
      <XStack gap='$3' flex={1}>
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          size='$4'
          circular
          aria-label={`Mark "${title}" as ${completed ? 'incomplete' : 'complete'}`}
        >
          <Checkbox.Indicator>
            <Paragraph size='$1' color='white'>
              ✓
            </Paragraph>
          </Checkbox.Indicator>
        </Checkbox>

        {isEditing ? (
          <XStack flex={1} gap='$2'>
            <Input
              value={editValue}
              onChangeText={setEditValue}
              onKeyPress={handleKeyPress}
              flex={1}
              autoFocus
              size='$3'
              aria-label={`Edit todo "${title}"`}
            />
            <ActionButton onPress={handleUpdate} theme='green' aria-label='Save changes'>
              <Paragraph size='$3'>✓</Paragraph>
            </ActionButton>
            <ActionButton onPress={handleCancel} theme='red' aria-label='Cancel editing'>
              <Paragraph size='$3'>✕</Paragraph>
            </ActionButton>
          </XStack>
        ) : (
          <XStack flex={1}>
            <YStack flex={1}>
              <ListItem.Text
                textDecorationLine={completed ? 'line-through' : 'none'}
                opacity={completed ? 0.6 : 1}
                fontSize='$4'
              >
                {title}
              </ListItem.Text>
            </YStack>
            <XStack gap='$2'>
              <ActionButton
                onPress={() => setIsEditing(true)}
                theme='blue'
                aria-label={`Edit "${title}"`}
              >
                <Paragraph size='$3'>✎</Paragraph>
              </ActionButton>
              <ActionButton
                onPress={() => onDelete(id)}
                theme='red'
                aria-label={`Delete "${title}"`}
              >
                <Paragraph size='$3'>🗑</Paragraph>
              </ActionButton>
            </XStack>
          </XStack>
        )}
      </XStack>
    </StyledListItem>
  )
})

export type TodoItemComponentProps = GetProps<typeof TodoItem>
