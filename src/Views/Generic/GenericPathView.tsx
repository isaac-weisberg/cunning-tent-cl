import * as React from 'react'
import CuntentComponent from '../../Application/CuntentComponent';

export class GenericPathView extends CuntentComponent<{ path: string|null, prepend: string, ifNull: string }, {}> {
    render() {
        return <div>
            { this.props.path != null
                ? this.props.prepend.concat(this.props.path)
                : this.props.ifNull
            }
        </div>
    }
}