
import { Event } from "../models/models";
import { findChanges, getNested,  setNestedValue } from "../UtilitiyFunctions/utility";
import { sendEvent } from "./api-service";

export class GlobalState {
    state: any;
    subscribers: any[];

    constructor(initialState:any = {}) {
        this.state = initialState
        this.subscribers = [];
    }
    
    getState(statePath: string | null = null) {
        if (statePath) {
            return   getNested(this.state, statePath)
        }
        return structuredClone(this.state)
    }

    updateState(state: any, dispatchEvent:boolean) {
        console.log(state)
        const prev = structuredClone(this.state);
        let curr = structuredClone(this.state);;
        let changes;

        if (state.pathString) {
            setNestedValue(curr, state.pathString, state);
            changes = findChanges(prev, curr)
            this.state = curr
        }
        else {
            changes = findChanges(prev, state)
            this.state = {...prev, ...state}
        }
        console.log(state.pathString)
        if (state.pathString.match(/currentUser/gi)) {
            state.path = state.path.replace(/currentUser/, `users:${this.state.currentUser?.id || state.id}`)
            changes = {
                users: [changes.currentUser],
            }
        }

        this.subscribers.forEach(subscriber => {
            subscriber(this.state)
        })

        if (dispatchEvent) {
            changes.path =  state.path
            this.createAndSendEvent(state, changes)
        }
        
        console.log('state updated', this.state)
    }

    setState(state:any) {
        this.state = state
        this.subscribers.forEach(subscriber => {
            subscriber(this.state)
        })
    }


    subscribe(itemToSubscribe:any){
        if (this.subscribers.indexOf(itemToSubscribe) > -1) {
            // Already subsribed
            return
        }
        // Subscribe a component
        this.subscribers.push(itemToSubscribe);
    }

    unsubscribe(itemToUnsubscribe:any) {
         // This is a function for unsubscribing from a global state
         this.subscribers = this.subscribers.filter(
            subscriber => subscriber !== itemToUnsubscribe
        );
    }

    createAndSendEvent(data: any, prev: any) {
        const event = new Event(prev);
        console.log(event)
        sendEvent(event, event.eventTopic.split('.')[1]).then((response:any) => console.log(response))
    }
}

export const appState = new GlobalState({id:'app', recipes:[], users:[], currentUser:{}});