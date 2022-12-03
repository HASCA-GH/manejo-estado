import React, { Component } from 'react'
import { Loading } from './Loading'

export class ClassState extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: true,
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
                this.setState({loading: false})
                console.log("Terminando la validación");   
           }, 3000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {this.state.error && (
                <p>El código es incorrecto</p>
                )}
                {this.state.loading && (
                <Loading/>
                )}
                <input 
                    type="text"
                    placeholder='Ingresa código de seguridad' />
                <button
                    onClick={()=> this.setState({loading: true})}
                >Comprobar</button>
            </div>
        )
    }
}

export default ClassState