import React, { Component } from 'react'
import { Loading } from './Loading'

const SECURITY_CODE='paradigma'
export class ClassState extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: '',
            error: false,
            loading: false,
        }
    }


    // componentWillMount(){
    // UNSAFE_componentWillMount(){
    //     console.log("ComponentWillMount")
    // }
    // componentDidMount(){
    //     console.log("ComponentDidMount")
    // }
    componentDidUpdate(){
        console.log("Actualización")
        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");   
                this.state.value===SECURITY_CODE 
                    ? this.setState({error:false, loading: false}) 
                    :this.setState({error:true, loading: false})
                //  if (value===SECURITY_CODE) {
                //     setError(false)
                //  } else {
                //     setError(true)
                //  }
                //  this.setState({loading: false})
                console.log("Terminando la validación");   
           }, 1000);
        }
    }

    render() {

        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>

                {(this.state.error && !this.state.loading) && (
                    <p>El código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading/>
                )}
                <input 
                    type="text"
                    placeholder='Ingresa código de seguridad'
                    value={this.state.value}
                    onChange={(e)=>{
                        this.setState({value: e.target.value})
                    }} />
                <button
                    onClick={()=> this.setState({loading: true})}
                >Comprobar</button>
            </div>
        )
    }
}

export default ClassState