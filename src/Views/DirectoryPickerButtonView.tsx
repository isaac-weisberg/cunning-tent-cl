import * as React from 'react'
import LocaleKeys from '../Localize/Keys';
import * as electron from 'electron'
import { LockableComponentState, LockableComponent } from '../Application/LockableComponent';

export interface DirectoryPickerViewProps {
    onPathPicked: (_: string) => void
}

export class DirectoryPickerButtonView extends LockableComponent<DirectoryPickerViewProps, LockableComponentState> {
    constructor(props) {
        super(props)
        this.state = {
            locked: false
        }
    }

    changeClicked = () => {
        this.setState(prev => {
            return {
                locked: true
            }
        })
        electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
            title: this.localize(LocaleKeys.TITLE_VIEW.CHOOSE_DIR)
        }, filepaths => {
            this.setState(prev => {
                return {
                    locked: false
                }
            })
            if (filepaths.length > 0) {
                this.props.onPathPicked(filepaths[0])
            }
        })
    }

    render() {
        return this.ifNotLocked(() => {
            return <div>
                <button onClick={this.changeClicked}>{this.localize(LocaleKeys.TITLE_VIEW.CHOOSE_DIR)}</button>
            </div>
        }) 
    }
}