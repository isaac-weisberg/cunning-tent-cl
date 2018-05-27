import * as React from 'react'
import { connect } from "react-redux"
import { Actions } from '../Application/Action'
import CuntentComponent from '../Application/CuntentComponent';
import * as electron from 'electron'
import LocaleKeys from '../Localize/Keys';
import { DirectoryView } from './DirectoryView';
import { DirectoryPickerView } from './DirectoryPickerView';


export interface RRootViewProps {
    path: string|null
    onPathChange: (_: string) => void
}

export class RRootView extends CuntentComponent<RRootViewProps, {}> {
    render() {
        if (this.props.path != null) {
            return <DirectoryView path={this.props.path} />
        }

        return <div>
            { this.localize(LocaleKeys.TITLE_VIEW.NO_DIR_CHOSEN) } 
            <DirectoryPickerView onPathPicked={this.props.onPathChange} />
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