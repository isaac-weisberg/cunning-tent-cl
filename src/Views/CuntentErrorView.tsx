import * as React from 'react'
import CuntentError from "../Error/CuntentError";
import CuntentComponent from "../Application/CuntentComponent";

export interface CuntentErrorViewProps {
    error: CuntentError
}

export class CuntentErrorView extends CuntentComponent<CuntentErrorViewProps, {}> {
    render() {
        return <div>
            CuntentErrorView: { this.props.error.message }
        </div>
    }
}