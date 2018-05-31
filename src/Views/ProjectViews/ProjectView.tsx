import * as React from 'react'
import {  Project } from "cundef";
import LocaleKeys from '../../Localize/Keys';
import DeclarationArrayView from './DeclarationViews/DeclarationArrayView';
import { EditingSessionObjectView } from '../EditingSessionView/EditingSessionView';

export class ProjectView extends EditingSessionObjectView<Project> {
    render() {
        return <div>
            { this.localize(LocaleKeys.PROJECT.TITLE).concat(': ', this.props.object.title) } <br />
            { this.localize(LocaleKeys.PROJECT.CLASSNAME.concat(': ', this.props.object.classname)) } <br />
            <DeclarationArrayView decl={this.props.object.generals} />
        </div>
    }
}