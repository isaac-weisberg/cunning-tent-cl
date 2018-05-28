import * as React from 'react'
import { CundefSanitizer } from 'cuntent-assembler/dist';
import CuntentComponent from '../../Application/CuntentComponent';
import LocaleKeys from '../../Localize/Keys';

export class ProjectSanitizerIssuesView extends CuntentComponent<{ issues: CundefSanitizer.SanitizerIssue[]|null }, {}> {
    render() {
        if (this.props.issues == null) {
            return this.localize(LocaleKeys.PROJECT.SANITIZER_FAILED)
        }
        if (this.props.issues.length == 0) {
            return this.localize(LocaleKeys.PROJECT.SANITIZER_FOUND_NO_ISSUES)
        }

        return <div>
            { this.props.issues.map((issue, index) => <div key={index}>{issue.displayable} {JSON.stringify(issue.data)}</div> )}
        </div>
    }
}