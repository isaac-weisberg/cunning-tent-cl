import * as React from 'react'
import CuntentError from "../Error/CuntentError";
import CuntentComponent from "../Application/CuntentComponent";

export interface CuntentErrorViewProps {
    error: CuntentError|null
}

export class CuntentErrorView extends CuntentComponent<CuntentErrorViewProps, {}> {
    render() {
        if (this.props.error == null) {
            return null
        }
        return <div>
            CuntentErrorView: { JSON.stringify(this.props.error.message) }
        </div>
    }
}