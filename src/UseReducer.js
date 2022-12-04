import React from "react";

const SECURITY_CODE='paradigma'

const UseReducer = ({name}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    // const [value, setValue] = React.useState('')
    // const [error, setError] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)

    // console.log(state);
   
    React.useEffect(() => {
         console.log("Empezando el efecto");
         
         if (!!state.loading) {
             setTimeout(() => {
                 console.log("Haciendo la validación");   
                 state.value===SECURITY_CODE 
                    ? dispatch({ type: 'CONFIRM'})
                    : dispatch({ type: 'ERROR'})
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
            //   onChange={(e)=>{onWrite(e.target.value)}
                onChange={(e) => {dispatch({ type: 'WRITE', payload:e.target.value })}
            }
            />
            <button
                onClick={()=> dispatch({type: 'CHECK'})}
            >Comprobar</button>
          </div>
        )
        
    } else if (!!state.confirmed && !state.deleted ) {
        return (
            <>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button
                    onClick={()=> {dispatch({type: 'DELETE'})}}
                >Sí
                </button>
                <button
                    onClick={()=> {dispatch({ type: 'RESET'})}}
                >No
                </button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={()=> {
                        dispatch({type: 'RESET'})
                    }}
                >Resetear, volver atrás</button>
            </>
        )
    }
}

//Declarar compound states

// function UseReducer({name}) {
//     const [state, dispatch] = React.useReducer(reducer, initialState)
// }

const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
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
    'CONFIRM': {
        ...state, 
        error: false,
        loading: false,
        confirmed: true,
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
        confirmed: false,
    },
    'WRITE':{
        ...state, 
        value: payload,
    },
    'CHECK':{
        ...state, 
        loading: true,
    },
    'DELETE':{
        ...state, 
        deleted: true,
    },
    'RESET':{
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