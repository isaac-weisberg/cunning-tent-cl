import * as React from 'react'
import {  Project } from "cundef";
import { LockableComponentState, LockableComponent } from "../../Application/LockableComponent";
import LocaleKeys from '../../Localize/Keys';
import DeclarationArrayView from './DeclarationViews/DeclarationArrayView';

export class ProjectView extends LockableComponent<{ result: Project }, LockableComponentState> {
    render() {
        return <div>
            { this.localize(LocaleKeys.PROJECT.TITLE).concat(': ', this.props.result.title) } <br />
            { this.localize(LocaleKeys.PROJECT.CLASSNAME.concat(': ', this.props.result.classname)) } <br />
            <DeclarationArrayView decl={this.props.result.generals} />
        </div>
    }
}