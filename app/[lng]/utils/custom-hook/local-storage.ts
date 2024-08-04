import {useState, useEffect, useRef} from 'react';

export function useLocalStorageState(
  key:string, defaultValue:string | object = '',
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}    // Destructuring object and assign default value.
    ) {
    const [ state, setState ] = useState(() => {                    // Lazy useState
        const localStorageValue = window.localStorage.getItem(key);
        if(localStorageValue){
            try{
                return deserialize(localStorageValue);
            }catch(error){
                window.localStorage.removeItem(key);
            }
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });

    const prevKeyRef = useRef(key);

    useEffect(() => {
        const prevKey = prevKeyRef.current;
        if(key !== prevKey){
            window.localStorage.removeItem(prevKey);
        }
        prevKeyRef.current = key;
        window.localStorage.setItem(key, serialize(state));
    }, [key, state]);

    return [ state, setState ]
}