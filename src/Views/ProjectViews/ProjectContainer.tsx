import * as React from 'react'
import { Project } from "cundef";
import { CundefSanitizer } from 'cuntent-assembler'
import { LockableComponent, LockableComponentState } from '../../Application/LockableComponent';
import LocaleKeys from '../../Localize/Keys';
import { ProjectPathView } from './ProjectPathView';
import { ProjectView } from './ProjectView';
import { ProjectSanitizerIssuesView } from './ProjectSanitizerIssuesView';

export interface ProjectContainerProps {
    path: string|null
    project: Project|null
}

export interface ProjectContainerState extends LockableComponentState {
    sanitizationIssues: CundefSanitizer.SanitizerIssue[]|null
}

export class ProjectContainer extends LockableComponent<ProjectContainerProps, ProjectContainerState> {
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
            <ProjectPathView path={this.props.path} />
            { this.props.project == null
                ? this.localize(LocaleKeys.PROJECT.NONE_LOADED)
                : this.ifNotLocked(() => {
                    return <div> 
                        <ProjectView project={this.props.project} />
                        <ProjectSanitizerIssuesView issues={this.state.sanitizationIssues} />
                    </div>
                })
            }
        </div>
    }
}