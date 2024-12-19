import React, { useReducer } from "react"
import { Column } from "./Column"
import { AddNewItem } from "./AddNewItem"
import { 
  AppContainer
} from"./styles"
import { AddList } from "./state/actions"
import { useAppState } from "./state/AppStateContext"
import { CustomDragLayer } from "./CustomDragLayer"

// const counterReducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + 1 }
//     case "decrement":
//       return { count: state.count - 1 }
//   }
// }

// interface State {
//   count: number
// }

// type Action = 
//   | {
//       type: "increment"
//   }
//   | {
//     type: "decrement"
//   }
// alternative typeAction={type:"increment"}|{type:"decrement"}

// export const App: React.FC = () => {
//   return (
//     <AppContainer>
//     <Column text="Todo:"/>
//     <AddNewItem
//       toggleButtonText="+ Add another list"
//       onAdd={console.log}
//     />
//   </AppContainer>
//   )
// }

// const increment = (): Action=>({ type: "increment" })
// const decrement = (): Action=>({ type: "decrement" })

export const App = () => {
  // const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  const { lists, dispatch } = useAppState()
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column 
          text={list.text}
          key={list.id}
          id={list.id}
          isPreview
           />
      ))}
      <AddNewItem 
         toggleButtonText="+ Add another list"
         onAdd={(text) => dispatch(AddList(text))}
      />
    </AppContainer>
  )
}