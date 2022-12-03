import React from 'react'

const SECURITY_CODE='paradigma'

const UseState = ({name}) => {
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    console.log(value);

    React.useEffect(() => {
         console.log("Empezando el efecto");
         
         if (!!loading) {
             setTimeout(() => {
                 console.log("Haciendo la validación");   
                 value===SECURITY_CODE ? setError(false) :setError(true)
                //  if (value===SECURITY_CODE) {
                //     setError(false)
                //  } else {
                //     setError(true)
                //  }
                 setLoading(false)
                 console.log("Terminando la validación");   
            }, 1000);
            
         }
         console.log("Terminando el efecto");
      
    }, [loading])
    
  return (
    <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {(error && !loading) && (
            <p>El código es incorrecto</p>
        )}
        {loading && (
            <p>Cargando...</p>
        )}
        <input 
            type="text"
            placeholder='Ingresa código de seguridad'
            value={value}
            onChange={(e)=>{
                setValue(e.target.value)
                // setError(false)
            }}
        />
        <button
            onClick={()=> setLoading(true)}
        >Comprobar</button>
    </div>
  )
}

export { UseState}