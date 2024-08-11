import {useState, useEffect, useRef} from 'react';

export function useSessionStorageState(
  key:string, defaultValue:string | object = '',
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}    // Destructuring object and assign default value.
    ) {
    const [ state, setState ] = useState(() => {                    // Lazy useState
        const localStorageValue = window.sessionStorage.getItem(key);
        if(localStorageValue){
            try{
                return deserialize(localStorageValue);
            }catch(error){
                window.sessionStorage.removeItem(key);
            }
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });

    const prevKeyRef = useRef(key);

    useEffect(() => {
        const prevKey = prevKeyRef.current;
        if(key !== prevKey){
            window.sessionStorage.removeItem(prevKey);
        }
        prevKeyRef.current = key;
        window.sessionStorage.setItem(key, serialize(state));
    }, [key, state]);

    return [ state, setState ]
}