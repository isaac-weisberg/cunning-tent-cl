import * as React from 'react'
import { LockableComponentState, LockableComponent } from '../Application/LockableComponent';
import { SearchResults, DirWorkerError, findProjectAt } from '../Shack/DirWorker';
import { CuntentErrorView } from './CuntentErrorView';
import { Project } from 'cundef/dist';
import { SearchResultsView } from './SearchResultsView';

export interface ProjectSearchViewProps {
    path: string
}

export interface ProjectSearchViewState extends LockableComponentState {
    results: SearchResults<Project>|null
}

export class ProjectSearchView extends LockableComponent<ProjectSearchViewProps, ProjectSearchViewState> {
    constructor(props) {
        super(props)
        this.state = {
            locked: false,
            results: null
        }
        this.reload(props.path)
    }

    reload = path => {
        this.setState(prev => {
            return {
                locked: true,
                results: prev.results
            }
        })
        findProjectAt(path).then(flow => {
            this.setState(prev => {
                return {
                    locked: false,
                    results: flow
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
                <SearchResultsView results={this.state.results} />
                { this.state.results == null
                    ? "Nothing happened yet or have already crashed."
                    : null
                }
            </div>
        })
    }
}
