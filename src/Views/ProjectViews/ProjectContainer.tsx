import * as React from 'react'
import { GenericContainer } from '../Generic/GenericContainer';
import { ProjectView } from './ProjectView';
import { Project } from 'cundef/dist';
import { Localize } from '../../Localize/Localize';
import LocaleKeys from '../../Localize/Keys';
import { DirWorker } from '../../Shack/DirWorker';

export const ProjectContainer = (props: { result: DirWorker.SearchResults<Project> }) => {
    return <GenericContainer view={ProjectView} result={props.result} ifNoResult={Localize.shared.get(LocaleKeys.PROJECT.NONE_LOADED)} pathStrings={{ifNull: Localize.shared.get(LocaleKeys.PROJECT.NONE_FOUND), prepend: Localize.shared.get(LocaleKeys.PROJECT.FOUND_AT)}} />
}
