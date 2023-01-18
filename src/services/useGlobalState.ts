import { useState, useEffect } from 'react';


export function useGlobalState(globalState:any) {
    const [, setState] = useState<any>();
    const state = globalState.getState();

    function reRender(newState:any) {
        // This will be called when the global state changes
        setState({});
    }

    useEffect(() => {
        // Subscribe to a global state when a component mounts
        globalState.subscribe(reRender);

        return () => {
            // Unsubscribe from a global state when a component unmounts
            globalState.unsubscribe(reRender);
        }
    })

    function setGlobalState(newState:any, action:string = 'update', dispatchEvent:boolean = true) {
        // Send update request to the global state and let it 
        // update itself
        if(action === 'set'){
            globalState.setState(newState);
        } else {
            globalState.updateState(newState, dispatchEvent)
        }
        
    }

    return [state, setGlobalState];
}