import React from 'react'

const SECURITY_CODE='paradigma'

const UseState = ({name}) => {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        active: false,
        confirmed: false,
    })
    // const [value, setValue] = React.useState('')
    // const [error, setError] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)

    console.log(state);

    React.useEffect(() => {
         console.log("Empezando el efecto");
         
         if (!!state.loading) {
             setTimeout(() => {
                 console.log("Haciendo la validación");   
                 state.value===SECURITY_CODE 
                    ? setState({...state, error: false, loading: false}) 
                    : setState({...state, error: true, loading: false})
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
            onChange={(e)=>{
                // setValue(e.target.value)
                setState({...state, value: e.target.value })
                // setError(false)
            }}
        />
        <button
            onClick={()=> 
                setState({...state, loading: true})
                // setLoading(true)
            }
        >Comprobar</button>
    </div>
  )
}

export { UseState}