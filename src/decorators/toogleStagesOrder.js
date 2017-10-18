//decorator === HOC === Higher Order Component
import React from 'react'

export default (OriginalComponent) => class WrappedComponent extends React.Component {
    state = {
        isOpen: 1
    }

    toggleOpen = () => {
        this.setState({
            isOpen: this.state.stageNumber + 1
        })
        console.log( "---- ----", this.state.stageNumber);

    }

    render() {
        return <OriginalComponent {...this.props} {...this.state} toggleOpen = {this.toggleOpen}/>
    }
}
