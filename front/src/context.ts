import React, { Dispatch } from 'react';

interface State {
    video: object,
    loading: boolean
}

export enum ActionType {
    WRITE = 'WRITE',
    CLEAR = 'CLEAR',
    LOAD = 'LOAD'
}

type Action = {
    type: ActionType,
    payload: State
}

export const reducer = (state: State, action: Action): State => {
    const {type, payload} = action;

    switch(type) {
        case ActionType.WRITE:
            localStorage.setItem('video', JSON.stringify(payload.video));

            return {
                ...state,
                video: payload.video
        };

        case ActionType.CLEAR:
            localStorage.clear()

            return {
                ...state,
                video: {}
            };

        case ActionType.LOAD:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}

const storedVideo = () => {
    const stored = localStorage.getItem('video');
    return stored? JSON.parse(stored) : {};
};

export const initialState: State = {
    loading: false,
    video: storedVideo()
}

interface ContextType {
    state: State,
    dispatch: Dispatch<Action>
}

export const Context = React.createContext<ContextType | undefined>(undefined);