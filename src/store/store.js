import {createContext, useReducer} from "react";
import Reducer from './reducer'

//maybe initial state can come from localstorage or something so it preserves logins or something
const initialState = {
    podcastInfo: null,
    selectedTag: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;
