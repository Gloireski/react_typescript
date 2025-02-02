/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react"
import { AppState } from "./state/appStateReducer"
import { load } from "./api"

type InjectedProps = {
    initialState: AppState
}

type PropsWithoutInjected<TBaseProps> = Omit<
    TBaseProps,
    keyof InjectedProps
>

export function withInitialState<TProps>(
    WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
    >
) {
    return (props: PropsWithoutInjected<TProps>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        })
        
        const [isLoading, setIsLoading] = useState(true)
        const [error, setError] = useState<Error | undefined>()

        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load()
                    setInitialState(data)
                    console.log(data)
                } catch (e) {
                    if (e instanceof Error) {
                    setError(e)
                    }
                }
                setIsLoading(false)
            }
            fetchInitialState()
        }, [])

        if (isLoading) {
            return <div>Loading</div>
        }

        if (error) {
            return <div>Erreur {error.message}</div>
        }

        return <WrappedComponent{...props} initialState={initialState} />
    }
}