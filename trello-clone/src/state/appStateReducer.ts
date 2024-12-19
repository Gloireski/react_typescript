import { Action } from "./actions"
import { nanoid } from "nanoid"
import { findItemIndexById, moveItem } from "../utils/arrayUtils"
import { DragItem } from "../DragItem"

export type Task = {
    id: string
    text: string
}

export type List = {
    id: string
    text: string
    tasks: Task[]
}

export type AppState = {
    lists: List[]
    draggedItem: DragItem | null
}


export const AppStateReducer = (
    draft: AppState,
    action: Action
): AppState | void => {
    switch (action.type) {
        case "ADD_LIST": {
            draft.lists.push({
                id: nanoid(),
                text: action.payload,
                tasks: []
            })
            break
        }
        case "ADD_TASK": {
            const { text, listId } = action.payload
            const targetListIndex = findItemIndexById(draft.lists, listId)

            draft.lists[targetListIndex].tasks.push({
                id: nanoid(),
                text
            })
            break
        }
        case "MOVE_LIST": {
            // const { draggedId, hoverId } = action.payload
            const { draggedId, hoverId } = action.payload
            const dragIndex = findItemIndexById(draft.lists, draggedId)
            const hoverIndex = findItemIndexById(draft.lists, hoverId)
            draft.lists = moveItem(draft.lists, dragIndex, hoverIndex)
            break
        }
        case "SET_DRAGGED_ITEM": {
            draft.draggedItem = action.payload
            break
        }
        case "MOVE_TASK": {
            const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } = action.payload;
          
            // Trouver les index des listes source et cible
            const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
            const targetListIndex = findItemIndexById(draft.lists, targetColumnId);
          
            if (sourceListIndex === -1 || targetListIndex === -1) {
              console.error("Invalid source or target column ID");
              return draft; // Ne pas modifier l'état si les IDs sont invalides
            }
          
            const sourceList = draft.lists[sourceListIndex];
            const targetList = draft.lists[targetListIndex];
          
            // Trouver les index des tâches
            const dragIndex = findItemIndexById(sourceList.tasks, draggedItemId);
            const hoverIndex = hoveredItemId
              ? findItemIndexById(targetList.tasks, hoveredItemId)
              : targetList.tasks.length; // Ajouter à la fin si pas de hoveredItemId
          
            if (dragIndex === -1) {
              console.error("Dragged task not found");
              return draft; // Ne pas modifier l'état si la tâche n'est pas trouvée
            }
          
            // Déplacer la tâche
            const [draggedTask] = sourceList.tasks.splice(dragIndex, 1);
            targetList.tasks.splice(hoverIndex, 0, draggedTask);
          
            break;
          }          
        // case "MOVE_TASK": {
        //     const {
        //         draggedItemId,
        //         hoveredItemId,
        //         sourceColumnId,
        //         targetColumnId
        //     } =  action.payload

        //     // Trouver les index des listes source et cible
        //     const sourceListIndex = findItemIndexById(
        //         draft.lists,
        //         sourceColumnId
        //     )
        //     const targetListIndex = findItemIndexById(
        //         draft.lists,
        //         targetColumnId
        //     )

        //     // Vérification des index
        //     if (sourceListIndex === -1 || targetListIndex === -1) {
        //         console.error("Invalid source or target column ID");
        //         return draft;
        //     }

        //     const sourceList = draft.lists[sourceListIndex];
        //     const targetList = draft.lists[targetListIndex];

        //     // Vérification des tâches
        //     if (!sourceList.tasks || !targetList.tasks) {
        //         console.error("Tasks array is missing in source or target list");
        //         return draft;
        //     }

        //     const dragIndex = findItemIndexById(
        //         sourceList.tasks, draggedItemId
        //     )
        //     const hoverIndex = hoveredItemId ?
        //         findItemIndexById(
        //             targetList.tasks,
        //             hoveredItemId
        //         ): 0

        //     if (dragIndex === -1) {
        //         console.error("Dragged task not found");
        //         return draft;
        //         }
            
        //     // const item = draft.lists[sourceListIndex].tasks[dragIndex]
        //     // remove the task from the source list
        //     // draft.lists[sourceListIndex].tasks.splice(dragIndex, 1)

        //     // // add the task to the target list
        //     // draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item)

        //     const [draggedTask] = sourceList.tasks.splice(dragIndex, 1);
        //     targetList.tasks.splice(hoverIndex, 0, draggedTask);
        //     break
        // }
    }
}
