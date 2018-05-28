import * as React from 'react'
import { Localize } from '../Localize/Localize';

export default class CuntentComponent<P, S> extends React.Component<P, S> {
    localize(string: string): string {
        return Localize.shared.get(string)
    }

    localizePair(one: string, another: string): string {
        return this.localize(one).concat(": ", another)
    }
}