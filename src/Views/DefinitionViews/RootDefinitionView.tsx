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
    sanitizationIssues: CundefSanitizer.SanitizerIssue[]|null
}

export class RootDefinitionView extends LockableComponent<RootDefinitionViewProps, RootDefinitionViewState> {
    constructor(props) {
        super(props)
        this.state = {
            locked: false,
            sanitizationIssues: null
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
        { this.props.definition == null
            ? this.localize(LocaleKeys.DEFININITION.NONE_LOADED)
            : this.ifNotLocked(() => {
                return <div> 
                    <SanitizedDefinitionView project={this.props.definition} />
                    <DefinitionSanitizerIssuesView issues={this.state.sanitizationIssues} />
                </div>
            })
        }
        </div>
    }
}