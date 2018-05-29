import * as React from 'react'
import { Project } from "cundef";
import { CundefSanitizer } from 'cuntent-assembler'
import { LockableComponent, LockableComponentState } from '../../Application/LockableComponent';
import LocaleKeys from '../../Localize/Keys';
import { ProjectView } from './ProjectView';
import { ProjectSanitizerIssuesView } from './ProjectSanitizerIssuesView';
import { GenericSearchResultsContainer } from '../Generic/GenericSearchView';
import { GenericPathView } from '../Generic/GenericPathView';

export interface ProjectContainerState extends LockableComponentState {
    sanitizationIssues: CundefSanitizer.SanitizerIssue[]|null
}

export class ProjectContainer extends GenericSearchResultsContainer<Project, ProjectContainerState> {
    constructor(props) {
        super(props)
        this.state = {
            locked: false,
            sanitizationIssues: []
        }
        this.launchSanitization(props.definition)
    }

    sanitization = (project: Project) => {
        return new Promise<CundefSanitizer.SanitizerIssue[]>((fulfill, reject) => {
            let issues = CundefSanitizer.sanitize(project)
            fulfill(issues)
        })
    }

    launchSanitization = (project: Project|null) => {
        if (project == null) {
            return
        }
        this.setState(prev => {
            return {
                locked: true,
                sanitizationIssues: prev.sanitizationIssues
            }
        })
        this.sanitization(project).then(issues => {
            this.setState(prev => {
                return {
                    locked: false,
                    sanitizationIssues: issues
                }
            })
        }).catch(err => {
            this.setState(prev => {
                return {
                    locked: false,
                    sanitizationIssues: null
                }
            })
        })
    }

    render() {
        return <div>
            <GenericPathView path={this.props.path} prepend={this.localize(LocaleKeys.PROJECT.FOUND_AT)} ifNull={this.localize(LocaleKeys.PROJECT.NONE_FOUND)} />
            { this.props.result == null
                ? this.localize(LocaleKeys.PROJECT.NONE_LOADED)
                : this.ifNotLocked(() => {
                    return <div> 
                        <ProjectView project={this.props.result!} sanitizationIssues={this.state.sanitizationIssues}/>
                    </div>
                })
            }
        </div>
    }
}
