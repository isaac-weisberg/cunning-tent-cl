import * as React from 'react'
import {  Project } from "cundef";
import { LockableComponentState, LockableComponent } from "../../Application/LockableComponent";
import LocaleKeys from '../../Localize/Keys';
import DeclarationView from './DeclarationViews/DeclarationView';
import { CundefSanitizer } from 'cuntent-assembler/dist';
import { ProjectSanitizerIssuesView } from './ProjectSanitizerIssuesView';


export interface SanitizedDefinitionViewProps {
    project: Project
    sanitizationIssues: CundefSanitizer.SanitizerIssue[]|null
}

export class ProjectView extends LockableComponent<SanitizedDefinitionViewProps, LockableComponentState> {
    render() {
        return <div>
            { this.localize(LocaleKeys.PROJECT.TITLE).concat(': ', this.props.project.title) } <br />
            { this.localize(LocaleKeys.PROJECT.CLASSNAME.concat(': ', this.props.project.classname)) } <br />
            <ProjectSanitizerIssuesView issues={this.props.sanitizationIssues} />
            <DeclarationView decl={this.props.project.generals} />
        </div>
    }
}