import React from 'react'

const SECURITY_CODE='paradigma'

const UseState = ({name}) => {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })
    // const [value, setValue] = React.useState('')
    // const [error, setError] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)

    console.log(state);
    const onConfirm = () => {
        setState({
            ...state, 
            error: false,
            loading: false,
            confirmed: true,
        })   
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
            confirmed: false,
        })
    }

    const onWrite = (newValue) => {
        setState({...state, value: newValue })
    }

    const onCheck = ()=> {
        setState({...state, loading: true})
    } 

    const onDelete = ()=> {
        setState({...state, deleted: true})
    }

    const onReset = ()=> {
        setState({...state, confirmed: false, deleted: false, value: ''})
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
                  onChange={(e)=>{onWrite(e.target.value)}}
              />
              <button
                  onClick={()=> onCheck()}
              >Comprobar</button>
          </div>
        )
        
    } else if (!!state.confirmed && !state.deleted ) {
        return (
            <>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button
                    onClick={()=> {
                        onDelete()
                    }}
                >Sí</button>
                <button
                    onClick={()=> {
                        onReset()
                    }}
                >No</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={()=> {
                        onReset()
                    }}
                >Resetear, volver atrás</button>
            </>
        )
    }
}

export { UseState}