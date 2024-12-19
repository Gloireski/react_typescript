/* eslint-disable */
import { createContext, useContext, FC, ReactNode, Dispatch } from "react"
import { 
    AppStateReducer,
    AppState,
    List,
    Task 
} from "./appStateReducer"
import { Action } from "./actions"
import { useImmerReducer } from "use-immer"
import { DragItem } from "../DragItem"

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }],
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        },
    ],
    draggedItem: null
}

type AppStateContextProps = {
    draggedItem: DragItem | null
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
)

interface AppStateProviderProps {
    children: ReactNode;
}

export const useAppState = () => {
    return useContext(AppStateContext)
}

export const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(AppStateReducer, appData)
    // const { lists } = appData;
    const { draggedItem, lists } = state

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    };

    return (
        <AppStateContext.Provider
            value={{ draggedItem, lists, getTasksByListId, dispatch }}
        >
            {children}
        </AppStateContext.Provider>
    );
};