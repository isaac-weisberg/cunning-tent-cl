import * as React from 'react'
import CuntentComponent from "../../Application/CuntentComponent";
import { Project } from "cundef";

export interface RootDefinitionViewProps {
    definition: Project|null
}

export class RootDefinitionView extends CuntentComponent<RootDefinitionViewProps, {}> {
    render() {
        return <div>
        { this.props.definition != null
            ? "Project loaded!"
            : "There is no cuntent project loaded."
        }
        </div>
    }
}