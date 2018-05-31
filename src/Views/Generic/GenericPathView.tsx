import * as React from 'react'
import { EditingSessionPathView } from '../EditingSessionView/EditingSessionView';

export class GenericPathView extends EditingSessionPathView {
    constructor(props) {
        super(props)
    }
    
    render() {
        return <div style={{backgroundColor: "#23CE60"}}>
            { this.props.path }
        </div>
    }
}