import { useCallback, useRef, useState } from 'react'
import { isInList } from '../../utils'
import { UseColorChipProps } from '../types'


export const useColorChip = (props: UseColorChipProps) => {
    const onChangeRef = useRef(props.onChange)
    onChangeRef.current = props.onChange

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const hasError = error !== null

    // Validations ------------------------------------

    const isValid = useCallback((color: string) => {
        let errorField = null
        let limit = 5

        if (isInList(color, props.value)) {
            errorField = `${color} já está na lista`
        }

        if (props.value.length >= limit) {
            errorField = `${color} não pode ser adicionado. Limite máximo de ${limit} cores`
        }

        if (errorField) {
            setError(errorField)
            return false
        }
        return true
    }, [props.value])

    // Functions -> handle changes in input field
    const handleChange = useCallback((value: string) => {
        setInputValue(value)
        setError(null)
    }, [])

    // Functions -> handle keyDown Event
    const handleKeyDown = useCallback((key: string, value: string) => {

        if(['Enter', 'Tab', ','].includes(key)) {

            let email = value.trim()

            if(email && isValid(email)) {
                onChangeRef.current([...props.value, email])
                setInputValue('')
            }
        }
    }, [props.value, isValid])

    // Functions -> handle Paste Event
    const handlePaste = (value: string) => {
        setInputValue(value)
        const emails = value.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g)

        if (emails) {
            const checkedInList = emails.filter(email => !isInList(email, props.value))
            const toBeAdded = [...new Set(checkedInList)]

            props.onChange([...props.value, ...toBeAdded])
        }
        setInputValue('')
    }

    // Functions -> handle delete an item from chips list
    const deleteChip = useCallback((toBeRemoved) => {
        const newList = props.value.filter((email) => email !== toBeRemoved)
        onChangeRef.current(newList)
    }, [props.value])

    
    

    return {
        deleteChip,
        error,
        handleChange,
        handleKeyDown,
        handlePaste,
        hasError,
        value: inputValue
    }
}