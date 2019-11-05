import React , {Component} from "react"

export const renderOnClient = ComposedComponent => class RenderOnClient extends Component {
    state = {
        isClient : false,
    }
    componentDidMount () {
        this.setState({
            isClient: true,
        })
    }
    render(){
        const {
            isClient,
        } = this.state;
        return isClient ? <ComposedComponent { ...this.props } /> : null;
    }
}
