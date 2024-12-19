import React, { useRef } from "react"
import { CardContainer } from "./styles"
import { useItemDrag } from "./utils/useItemDrag"
import { useDrop } from "react-dnd"
import { useAppState } from "./state/AppStateContext"
import { isHidden } from "./utils/isHidden"
import { moveTask, setDraggedItem } from "./state/actions"
import { throttle } from "throttle-debounce-ts"

type CardProps = {
  id: string
  text: string
  columnId: string
  isPreview?: boolean
}

export const Card = ({
  text,
  id,
  columnId,
  isPreview
}: CardProps) => {

  const { draggedItem, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)

  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId
  })

  const [, drop] = useDrop({
    accept: "CARD",
    // hover: throttle(200, () => {

    // })
    hover: throttle(200, () => {
      if (!draggedItem || draggedItem.type !== "CARD" || draggedItem.id === id) {
        return
      }

      // Déplacer la carte uniquement si elle change de position
      dispatch(
        moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
      )

      // Mettre à jour la colonne de l'élément traîné
      dispatch(setDraggedItem({ ...draggedItem, columnId }))
    }),
    drop: () => {
    // Fin du drag
    console.log("Drop completed");
    },
  })

  drag(drop(ref))

  if (!ref.current) {
    console.warn("Ref is null for card:", id)
  }

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
      >
      {text}
    </CardContainer>
  )
}