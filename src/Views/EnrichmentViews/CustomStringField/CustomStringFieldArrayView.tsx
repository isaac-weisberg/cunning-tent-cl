import * as React from 'react'
import { CustomField } from 'cuntent-assembler/dist';
import { CustomStringFieldView } from './CustomStringFieldView';
import CuntentComponent from '../../../Application/CuntentComponent';
import LocaleKeys from '../../../Localize/Keys';

export class CustomStringFieldArrayView extends CuntentComponent<{ fields: CustomField[] }, {}> {
    render() {
        return <div>
            { this.props.fields.length == 0
                ? this.localize(LocaleKeys.CUSTOM_FIELD.NO_FIELDS)
                : this.props.fields.map(field => <CustomStringFieldView key={field.key} field={field} /> )
            }
        </div>
    }
}