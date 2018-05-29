import * as React from 'react'
import { GenericPathView } from './GenericPathView';
import { CuntentErrorView } from '../CuntentErrorView';
import { LockableComponentState, LockableComponent } from '../../Application/LockableComponent';
import { DirWorker } from '../../Shack/DirWorker';

export interface GenericContainerProps<ResultType> {
    result: DirWorker.SearchResults<ResultType>
    pathStrings: {
        prepend: string
        ifNull: string
    }
    ifNoResult: string
    view: any
}

export class GenericContainer<ResultType> extends LockableComponent<GenericContainerProps<ResultType>, LockableComponentState> {
    state = { locked: false }

    render() {
        return <div>
            <GenericPathView path={this.props.result.path} prepend={this.props.pathStrings.prepend} ifNull={this.props.pathStrings.ifNull} />
            { this.props.result.object == null
                ? this.localize(this.props.ifNoResult)
                : this.ifNotLocked(() => {
                    return <div> 
                        <this.props.view result={this.props.result.object} />
                    </div>
                })
            }
            <CuntentErrorView error={this.props.result.error} />
        </div>
    }
}