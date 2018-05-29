import * as React from 'react'
import { GenericSearchResultsContainer } from './GenericSearchView';
import { GenericPathView } from './GenericPathView';
import { LockableComponentState } from '../../Application/LockableComponent';

export interface GenericContainerProps {
    pathStrings: {
        prepend: string
        ifNull: string
    }
    ifNoResult: string
    view: any
}

export class GenericContainer<ResultType> extends GenericSearchResultsContainer<ResultType, GenericContainerProps, LockableComponentState> {
    render() {
        return <div>
            <GenericPathView path={this.props.path} prepend={this.props.pathStrings.prepend} ifNull={this.props.pathStrings.ifNull} />
            { this.props.result == null
                ? this.localize(this.props.ifNoResult)
                : this.ifNotLocked(() => {
                    return <div> 
                        <this.props.view result={this.props.result} />
                    </div>
                })
            }
        </div>
    }
}