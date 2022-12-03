import React, { Component } from 'react'

class Loading extends Component {
    componentWillUnmount(){
        console.log("ComponenteDidMount")
    }
    render() {
        return (
            <p>
              
            </p>
        )
    }
}

export {Loading}