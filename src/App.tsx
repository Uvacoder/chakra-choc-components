import * as React from "react"
import {
    Box,
    Container,
    Divider,
    Flex,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { InputColors } from "InputColors"
import { ACTest } from "components/ACTest"

export const App = () => {
    const [formState, setFormState] = React.useState<string[]>([])

    const containerBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50")
    return (
        <Flex w='100vw' p={3} flexDirection='column'>
            <ColorModeSwitcher alignSelf='flex-end' />

            <Box
                maxW='50%'
                bg={containerBg}
                mt='10'
                borderRadius='lg'
                position='relative'
                p='8'
                alignSelf='center'
            >
            
                <Heading>Implementação de Color Chips</Heading>
                <Divider my='6' borderColor='gray.500' />
                <InputColors
                    name='colors'
                    label='Lista de cores (label opcional)'
                    value={formState}
                    onChange={setFormState}
                />

                <ACTest />

            </Box>
        </Flex>
    )
}
