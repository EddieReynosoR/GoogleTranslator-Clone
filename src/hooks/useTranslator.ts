import { useReducer } from 'react';
import { Action, FromLanguage, Language, State } from '../types';
import { AUTO_LANGUAGE } from '../constants';

// Create InitialState
const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

// Create Reducer
function reducer(state: State, action: Action){
    const { type } = action

    if (type === 'INTERCHANGE_LANGUAGES'){
        // logica del estado dentro del reducer
        // porque lo evitamos en los componentes
        if(state.fromLanguage === AUTO_LANGUAGE) return state
    return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
    }
    }

    if(type === 'SET_FROM_LANGUAGE'){
    return {
        ...state,
        fromLanguage: action.payload 
        // payload, es lo siguiente que se va a pasar en cada action
    }
    }

    if(type === 'SET_TO_LANGUAGE'){
    return{
        ...state,
        toLanguage: action.payload
    }
    }

    if(type === 'SET_FROM_TEXT'){
    return{
        ...state,
        loading: true,
        fromText: action.payload,
        result: ''
    }
    }

    if(type === 'SET_RESULT'){
    return{
        ...state,
        loading: true,
        result: action.payload
    }
    }


    return state
}

export const useTranslator = () => {
    // Use Reducer with useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => dispatch({type: 'INTERCHANGE_LANGUAGES'})

  const setFromLanguage = (payload:FromLanguage) => dispatch({type:'SET_FROM_LANGUAGE', payload: payload})

  const setToLanguage = (payload:Language) => dispatch({type:'SET_TO_LANGUAGE', payload: payload})

  const setFromText = (payload:string) => dispatch({type:'SET_FROM_TEXT', payload: payload})

  const setResult = (payload:string) => dispatch({type:'SET_RESULT', payload: payload})


  return {state, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult}
}