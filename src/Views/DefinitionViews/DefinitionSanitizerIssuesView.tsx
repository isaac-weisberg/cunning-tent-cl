import * as React from 'react'
import { CundefSanitizer } from 'cuntent-assembler/dist';
import CuntentComponent from '../../Application/CuntentComponent';
import LocaleKeys from '../../Localize/Keys';

export class DefinitionSanitizerIssuesView extends CuntentComponent<{ issues: CundefSanitizer.SanitizerIssue[]|null }, {}> {
    render() {
        if (this.props.issues == null || this.props.issues.length == 0) {
            return this.localize(LocaleKeys.DEFININITION.SANITIZER_FOUND_NO_ISSUES)
        }

        return <div>
            Some issues were found.
        </div>
    }
}