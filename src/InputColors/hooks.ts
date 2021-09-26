import { UseColorChipProps } from './types'
import { useColorChip } from './useColorChip'

export const useChips = (props: UseColorChipProps) => {
    const chips = useColorChip(props)

    return {
        chips
    }
}