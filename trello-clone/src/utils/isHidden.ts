import { DragItem } from "../DragItem"

export const isHidden = (
    draggedItem: DragItem | null,
    itemType: string,
    id: string,
    isPreview?: boolean
): boolean => {
    console.log({ draggedItem, itemType, id, isPreview })
    return Boolean(
        !isPreview &&
            draggedItem && 
            draggedItem.type === itemType &&
            draggedItem.id === id
    )
}