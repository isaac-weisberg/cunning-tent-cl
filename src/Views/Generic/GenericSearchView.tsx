import * as React from 'react'
import { LockableComponent, LockableComponentState } from "../../Application/LockableComponent";
import { DirWorker } from '../../Shack/DirWorker';
import CuntentComponent from '../../Application/CuntentComponent';
import { CuntentErrorView } from '../CuntentErrorView';

export class GenericSearchResultsContainer<ResultType, State extends LockableComponentState> extends LockableComponent<{ path: string|null, result: ResultType|null }, State> {

}

export class GenericSearchView<ResultType> extends LockableComponent<{ path: string, view: any, searcher: (_: string) => Promise<DirWorker.SearchResults<ResultType>> }, { locked: boolean, results: DirWorker.SearchResults<ResultType>|null }> {
    constructor(props) {
        super(props)
        this.state = {
            locked: false,
            results: null
        }
    }

    componentDidMount() {
        this.reload(this.props.path)
    }

    reload = path => {
        this.setState(prev => {
            return {
                locked: true,
                results: prev.results
            }
        })
        this.props.searcher(path).then(results => {
            this.setState(prev => {
                return {
                    locked: false,
                    results: results
                }
            })
        }).catch(error => {
            this.setState(prev => {
                return {
                    locked: false,
                    results: null
                }
            })
        })
    }

    render() {
        return this.ifNotLocked(() => {
            return <div>
                { this.state.results == null
                    ? "Waiting, or maybe it just crashed."
                    : <div>
                        <this.props.view path={this.state.results.path} enrichment={this.state.results.object} />
                        <CuntentErrorView error={this.state.results.error} />
                    </div>
                }
            </div>
        })
    }
}