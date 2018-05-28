import * as React from 'react'
import {  Project } from "cundef";
import { LockableComponentState, LockableComponent } from "../../Application/LockableComponent";


export interface SanitizedDefinitionViewProps {
    project: Project|null
}

export class ProjectView extends LockableComponent<SanitizedDefinitionViewProps, LockableComponentState> {
    render() {
        if (this.props.project == null) {
            return null
        }
        return <div>
            <h1>{ this.props.project.title }</h1>
        </div>
    }
}