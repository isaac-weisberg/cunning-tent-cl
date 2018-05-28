import * as React from 'react'
import { CustomField } from "cuntent-assembler/dist";
import CuntentComponent from '../../../Application/CuntentComponent';
import LocaleKeys from '../../../Localize/Keys';

export class CustomStringFieldView extends CuntentComponent<{ field: CustomField }, {}> {
    drawKey = () => {
        return this.localizePair(LocaleKeys.CUSTOM_FIELD.KEY, this.props.field.key)
    }

    drawValue = () => {
        return this.localizePair(LocaleKeys.CUSTOM_FIELD.VALUE, this.props.field.value)
    }

    render() {
        return <div>
            { this.drawKey() }
            { this.drawValue() }
        </div>
    }
}