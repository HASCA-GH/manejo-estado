import React, { Component } from 'react'

export class ClassState extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: true,
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
                <input 
                    type="text"
                    placeholder='Ingresa código de seguridad' />
                <button
                    onClick={()=> this.setState({error: !this.state.error})}
                >Comprobar</button>
            </div>
        )
    }
}

export default ClassState