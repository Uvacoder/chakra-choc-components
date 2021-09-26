import React from "react";
import {
    AutoComplete,
    AutoCompleteCreatable,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import { Center, FormControl, FormLabel, Tag, TagCloseButton, TagLabel, useColorModeValue } from "@chakra-ui/react";

export function ACTest() {
    const colors = ["AMARELO", "VERMELHO", "AZUL", "PRETO", "BRANCO"];

    return (
        <FormControl>
            <FormLabel>Selecione uma cor</FormLabel>
            <AutoComplete
                creatable
                openOnFocus
                multiple
                emphasize={{ color: "gray.800", bg: "yellow.300" }}
                onChange={(vals) => console.log(vals)}
            >

                {({ tags }) => (
                    <>
                        <AutoCompleteInput
                            borderColor='green.500'
                            placeholder="Buscar..."
                            variant="outline"
                            size='lg'
                            wrapStyles={{
                                borderColor: 'gray.400'
                            }}
                            focusBorderColor='gray.600'
                        />
                        <Center mt='5'>
                            {tags.map(tag => (
                                <Tag
                                    mx='1'
                                    size='md' 
                                    borderRadius='md' 
                                    variant='solid'
                                >
                                    <TagLabel>{tag.label}</TagLabel>
                                    <TagCloseButton onClick={() => tag.onRemove(tag)} />
                                </Tag>
                            ))}
                        </Center>
                        <AutoCompleteList>
                            {colors.map((country, cid) => (
                                <AutoCompleteItem
                                    key={`option-${cid}`}
                                    value={country}
                                    textTransform="uppercase"
                                    _selected={{ bg: "whiteAlpha.50" }}
                                    _focus={{ bg: "whiteAlpha.100" }}
                                >
                                    {country}
                                </AutoCompleteItem>
                            ))}
                            <AutoCompleteCreatable>
                                {({ value }) => <span>Criar {value}</span>}
                            </AutoCompleteCreatable>
                        </AutoCompleteList>
                    </>
                )}
            </AutoComplete>
        </FormControl>
    );
}