import React from "react";

const SECURITY_CODE='paradigma'

const UseReducer = ({name}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    // const [value, setValue] = React.useState('')
    // const [error, setError] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)
    // console.log(state);
    const onConfirm = () => dispatch({type: actionTypes.confirm})
    const onError = () => dispatch({type: actionTypes.error})
    const onCheck = () => dispatch({type: actionTypes.check})
    const onDelete = () => dispatch({type: actionTypes.delete})
    const onReset = () => dispatch({type: actionTypes.reset})
    
    const onWrite = (newValue) => {
        dispatch({type: actionTypes.write, payload: newValue})
    }
    React.useEffect(() => {
         console.log("Empezando el efecto");
         
         if (!!state.loading) {
             setTimeout(() => {
                 console.log("Haciendo la validación");   
                 state.value===SECURITY_CODE 
                    ? onConfirm()
                    : onError()
                //  if (value===SECURITY_CODE) {
                //     setError(false)
                //  } else {
                //     setError(true)
                //  }
                //  setLoading(false)
                //  setState({...state, loading: false})
                 console.log("Terminando la validación");   
            }, 1000);
            
         }
         console.log("Terminando el efecto");
      
    }, [state.loading])
    if ( !state.deleted && !state.confirmed) {
        return (
          <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad</p>
            {(state.error && !state.loading) && (
                <p>El código es incorrecto</p>
            )}
            {state.loading && (
                <p>Cargando...</p>
            )}
            <input 
                type="text"
                placeholder='Ingresa código de seguridad'
                value={state.value}
                onChange={(e) => onWrite(e.target.value)}
            //   onChange={(e)=>{onWrite(e.target.value)}
                // onChange={(e) => {dispatch({ type: actionTypes.write, payload:e.target.value })} }
            />
            <button onClick={onCheck}>
                Comprobar
            </button>
          </div>
        )
        
    } else if (!!state.confirmed && !state.deleted ) {
        return (
            <>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button onClick={onDelete}>
                    Sí
                </button>
                <button onClick={onReset}>
                    No
                </button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>
                    Resetear, volver atrás
                </button>
            </>
        )
    }
}

//Declarar compound states

// function UseReducer({name}) {
//     const [state, dispatch] = React.useReducer(reducer, initialState)
// }

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

//Apply Action types
const actionTypes = {
    confirm: 'CONFIRM', 
    error: 'ERROR',
    delete: 'DELETE',
    write: 'WRITE',
    reset: 'RESET',
    check: 'CHECK',
}

//Create the reducer
// const reducer = (state, action ) => {
    
// }
//1) Forma normal: Declarar reducer con if else
// const reducerIf = (state, action ) => {
//     if (action.type==='ERROR') {
//         return {
//             ...state,
//             error: true,
//             loading: false,
//         }
//     } else if (action.type==='CHECK') {
//         return {
//             ...state,
//             loading: true,
//         }
//     } else {
//         return {
//             ...state
//         }
//     }
// }
//2) Forma mas popular de declarar reducer con Switch
// const reducerSwitch = (state, action) => {
//     switch (action.type) {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error: true,
//                 loading: false,
//             }
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true,
//             }
    
//         default:
//             return {
//                 ...state
//             }
//     }
// }

//3) Forma excelente de crear reducer usando objetos 
const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state, 
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
        confirmed: false,
    },
    [actionTypes.write]:{
        ...state, 
        value: payload,
    },
    [actionTypes.check]:{
        ...state, 
        loading: true,
    },
    [actionTypes.delete]:{
        ...state, 
        deleted: true,
    },
    [actionTypes.reset]:{
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
})
// Dividimos en dos partes: Por una parte definimos una function reducer y la otra parte nuestro reducer object

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}

export { UseReducer }