import * as React from 'react'
import CuntentComponent from '../Application/CuntentComponent';
import LocaleKeys from '../Localize/Keys';
import * as electron from 'electron'

export interface DirectoryPickerViewProps {
    onPathPicked: (_: string) => void
}

export class DirectoryPickerView extends CuntentComponent<DirectoryPickerViewProps, {}> {
    changeClicked = () => {
        electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
            title: this.localize(LocaleKeys.TITLE_VIEW.CHOOSE_DIR)
        }, filepaths => {
            if (filepaths.length > 0) {
                this.props.onPathPicked(filepaths[0])
            }
        })
    }

    render() {
        return <div>
            {this.localize(LocaleKeys.TITLE_VIEW.NO_DIR_CHOSEN)}
            <button onClick={this.changeClicked}>{this.localize(LocaleKeys.TITLE_VIEW.CHOOSE_DIR)}</button>
        </div>
    }
}