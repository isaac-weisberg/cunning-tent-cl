import * as React from 'react'
import CuntentComponent from "../Application/CuntentComponent";

export interface DirectoryViewProps {
    path: string
}

export class DirectoryView extends CuntentComponent<DirectoryViewProps, {}> {
    render() {
        return <div>{this.props.path}</div>
    }
}
