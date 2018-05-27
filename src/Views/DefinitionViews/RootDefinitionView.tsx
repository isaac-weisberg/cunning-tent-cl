import * as React from 'react'
import { Project } from "cundef";
import { CundefSanitizer } from 'cuntent-assembler'
import { LockableComponent, LockableComponentState } from '../../Application/LockableComponent';
import LocaleKeys from '../../Localize/Keys';
import { SanitizedDefinitionView } from './SanitizedDefinitionView';
import { DefinitionSanitizerIssuesView } from './DefinitionSanitizerIssuesView';

export interface RootDefinitionViewProps {
    definition: Project|null
}

export interface RootDefinitionViewState extends LockableComponentState {
    sanitizedProject: Project|null
    sanitizationIssues: CundefSanitizer.SanitizerIssue[]|null
}

export class RootDefinitionView extends LockableComponent<RootDefinitionViewProps, RootDefinitionViewState> {
    constructor(props) {
        super(props)
        this.state = {
            locked: false,
            sanitizationIssues: null,
            sanitizedProject: null
        }
        this.launchSanitization(props.definition)
    }

    sanitization = (project: Project) => {
        return new Promise<Project>((fulfill, reject) => {
            let issues = CundefSanitizer.sanitize(project)
            if (issues.length > 0) {
                reject(issues)
                return
            }
            fulfill(project)
        })
    }

    launchSanitization = (project: Project|null) => {
        if (project == null) {
            return
        }
        this.setState(prev => {
            return {
                locked: true,
                sanitizationIssues: prev.sanitizationIssues,
                sanitizedProject: prev.sanitizedProject
            }
        })
        this.sanitization(project).then(proj => {
            this.setState(prev => {
                return {
                    locked: false,
                    sanitizationIssues: null,
                    sanitizedProject: project
                }
            })
        }).catch(err => {
            this.setState(prev => {
                return {
                    locked: false,
                    sanitizationIssues: err,
                    sanitizedProject: project
                }
            })
        })
    }

    render() {
        return <div>
        { this.props.definition == null
            ? this.localize(LocaleKeys.DEFININITION.NONE_LOADED)
            : this.ifNotLocked(() => {
                return <div> 
                    <SanitizedDefinitionView project={this.state.sanitizedProject} />
                    <DefinitionSanitizerIssuesView issues={this.state.sanitizationIssues} />
                </div>
            })
        }
        </div>
    }
}