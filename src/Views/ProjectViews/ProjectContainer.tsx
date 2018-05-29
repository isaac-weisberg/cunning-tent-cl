import * as React from 'react'
import { GenericContainer } from '../Generic/GenericContainer';
import { ProjectView } from './ProjectView';
import { Project } from 'cundef/dist';
import { Localize } from '../../Localize/Localize';
import LocaleKeys from '../../Localize/Keys';

export const ProjectContainer = (props: { path: string, result: Project }) => {
    return <GenericContainer view={ProjectView} path={props.path} result={props.result} ifNoResult={Localize.shared.get(LocaleKeys.PROJECT.NONE_LOADED)} pathStrings={{ifNull: Localize.shared.get(LocaleKeys.PROJECT.NONE_FOUND), prepend: Localize.shared.get(LocaleKeys.PROJECT.FOUND_AT)}} />
}
