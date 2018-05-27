import * as React from 'react'
import CuntentComponent from '../../Application/CuntentComponent';

export class DefinitionPathView extends CuntentComponent<{ path: string|null }, {}> {
    render() {
        return <div>
            { this.props.path != null
                ? "Cuntent definition found at ".concat(this.props.path)
                : "Cuntent definition not found."
            }
        </div>
    }
}