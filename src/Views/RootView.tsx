import * as React from 'react'
import { connect } from "react-redux"
import { Actions } from '../Application/Action'
import CuntentComponent from '../Application/CuntentComponent';
import * as electron from 'electron'
import LocaleKeys from '../Localize/Keys';


export interface RRootViewProps {
    path: string|null
    onPathChange: (_: string) => void
}

export class RRootView extends CuntentComponent<RRootViewProps, {}> {
    changeClicked = () => {
        electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        }, filepaths => {
            if (filepaths.length > 0) {
                this.props.onPathChange(filepaths[0])
            }
        })
    }

    render() {
        if (this.props.path != null) {
            return <div>Success! { this.props.path }</div>
        }

        return <div>
            {this.localize(LocaleKeys.TITLE_VIEW.NO_DIR_CHOSEN)}
            <button onClick={this.changeClicked}>{this.localize(LocaleKeys.TITLE_VIEW.CHOOSE_DIR)}</button>
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