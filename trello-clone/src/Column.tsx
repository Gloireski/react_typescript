import { 
    ColumnContainer,
    ColumnTitle,
} from"./styles"
import { Card } from "./Card"
import { AddNewItem } from "./AddNewItem"
import { useAppState } from "./state/AppStateContext"
import {
    AddTask,
    moveList,
    moveTask,
    setDraggedItem
} from "./state/actions"
import React from "react"
import { useRef } from "react"
import { useItemDrag } from "./utils/useItemDrag"
import { throttle } from "throttle-debounce-ts"
import { useDrop } from "react-dnd"
import { isHidden } from "./utils/isHidden"

type ColumnProps = {
    text: string
    id: string
    isPreview: boolean
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
    const { draggedItem, getTasksByListId, dispatch } = useAppState()

    console.log(`Tasks for column ${id}:`, getTasksByListId(id));
    const tasks = getTasksByListId(id)

    const { drag } = useItemDrag({ type: "COLUMN", id, text})

    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover: throttle(200, () => {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id == id) {
                    return
                }
                dispatch(moveList(draggedItem.id, id))
            } else {
                if (draggedItem.columnId === id) {
                    return
                }
                if (tasks.length) {
                    return
                }
                dispatch(
                    moveTask(draggedItem.id, null, draggedItem.columnId, id)
                )
                dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
            }
           
        })
    })

    drag(drop(ref))

    if (!ref.current) {
    console.warn("Ref is null for card:", id)
    }

    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(draggedItem, "COLUMN", id)}
            >
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map((task) => (
                <Card 
                    text={task.text}
                    id={task.id}
                    key={task.id}
                    columnId={id}
                    />
            ))}
                <AddNewItem
                    toggleButtonText="+ Add another card"
                    onAdd={(text) => dispatch(AddTask(text, id))}
                    dark
                />
        </ColumnContainer>
    )
}