import {
  Heading,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  HStack,
  ButtonGroup,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react'
import { FiEdit, FiCheck, FiX } from 'react-icons/fi'

export default function ResumeTitle({ title }) {
  return (
    <Editable defaultValue={title}>
      <HStack>
        <Heading as={EditablePreview} size="lg" noOfLines={1} />
        <Input as={EditableInput} />
        <EditableControls />
      </HStack>
    </Editable>
  )
}

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        icon={<FiCheck />}
        variant="ghost"
        isRound
        size="md"
        colorScheme="teal"
        {...getSubmitButtonProps()}
      />
      <IconButton
        icon={<FiX />}
        variant="ghost"
        isRound
        size="md"
        colorScheme="red"
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <IconButton
      icon={<FiEdit />}
      variant="ghost"
      isRound
      size="md"
      colorScheme="blue"
      {...getEditButtonProps()}
    />
  )
}
