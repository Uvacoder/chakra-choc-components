import React from 'react'
import {
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    Tag,
    TagCloseButton,
    TagLabel,
    useColorModeValue
} from '@chakra-ui/react'
import { InputProps } from './types'
import { useChips } from './hooks'

export const InputColors = (props: InputProps) => {
    const { label, name, value, onChange } = props
    const { chips } = useChips({
        value,
        onChange
    })
    return (
        <FormControl isInvalid={chips.hasError}>
            {!!label && <FormLabel>{label}</FormLabel>}
            <ChakraInput
                id={name}
                name={name}
                borderColor='gray.400'
                focusBorderColor='gray.600'
                variant='outline'
                _hover={{
                    bgColor: useColorModeValue('gray.100', 'gray.800'),
                }}
                size="lg"
                value={chips.value}
                onChange={e => chips.handleChange(e.target.value)}
                onKeyDown={(e) => {
                    if (["Enter", "Tab", ","].includes(e.key)) {
                        e.preventDefault()
                        chips.handleKeyDown(e.key, e.currentTarget.value)
                    }
                }}
                onPaste={e => {
                    e.preventDefault()
                    chips.handlePaste(e.clipboardData.getData('text'))
                }}
                placeholder='Comece a digitar o nome das cores e tecle `Enter`'
            />
            {chips.hasError && <FormErrorMessage>{chips.error}</FormErrorMessage>}
            <Center mt='5'>
                {value?.map(chip => (
                    <Tag key={chip} size='md' borderRadius='md' variant='solid' mx='1'>
                        <TagLabel>{chip}</TagLabel>
                        <TagCloseButton onClick={() => chips.deleteChip(chip)} />
                    </Tag>
                ))}
            </Center>

        </FormControl>
    )
}
