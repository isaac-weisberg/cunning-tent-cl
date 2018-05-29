import * as React from 'react'
import { GenericSearchResultsContainer } from './GenericSearchView';
import { GenericPathView } from './GenericPathView';
import { LockableComponentState } from '../../Application/LockableComponent';
import { CuntentErrorView } from '../CuntentErrorView';

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