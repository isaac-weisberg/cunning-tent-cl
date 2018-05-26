import * as React from 'react'
import { connect } from "react-redux"
import { Actions } from '../Application/Action'
import CuntentComponent from '../Application/CuntentComponent';


export interface RRootViewProps {
    path: string|null
    onPathChange: (_: string) => void
}

export class RRootView extends CuntentComponent<RRootViewProps, {}> {
    render() {
        return <div> { 
            this.props.path != null 
            ? this.props.path 
            : "You are not currently in any directory." }
        </div>
    }
}

const mapStateToProps = state => {
    return {
        path: state.currentPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPathChange: (path: string) => {
            dispatch(Actions.changeDirectory(path))
        }
    }
}

const RootView = connect(
    mapStateToProps,
    mapDispatchToProps
)(RRootView)

export default RootView