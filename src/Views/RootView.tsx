import * as React from 'react'
import CuntentComponent from "../Application/CuntentComponent";
import { connect } from "react-redux";
import CuntentStore from "../Application/State";
import { Actions } from '../Application/Action';


export interface RRootViewProps {
    path: string|null
    onPathChange: (_: string) => void
}

export const RRootView = (props: RRootViewProps) => {
    return <div> { 
        props.path != null 
        ? props.path 
        : "You are not currently in any directory." }
    </div>
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