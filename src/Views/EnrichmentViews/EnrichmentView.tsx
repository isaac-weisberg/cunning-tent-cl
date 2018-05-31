import * as React from 'react'
import { Enrichment, GenericAssetCollation } from 'cuntent-assembler/dist';
import LocaleKeys from '../../Localize/Keys';
import { GenericAssetCollationView } from './CollationViews/GenericAssetCollationView';
import CuntentComponent from '../../Application/CuntentComponent';
import { EditingSessionObjectView } from '../EditingSessionView/EditingSessionView';
import { AnyAction, Store, createStore } from 'redux';
import { Provider, connect } from 'react-redux';

export class RGenericCollationsView extends CuntentComponent<{ generics: GenericAssetCollation[], onAction: (_: GenericAssetCollationAction) => void }, {}> {
    static mapProps(state) {
        return {
            generics: state
        }
    }

    static mapDispatch(dispatch) {
        return {
            onAction: action => {
                dispatch(action)
            }
        }
    }
    
    render() {
        return this.props.generics.length == 0 
            ? this.localize(LocaleKeys.ASSET_COLLATION.NO_COLLATIONS)
            : this.props.generics.map(collation => <GenericAssetCollationView key={collation.codepath} collation={collation} />)
    }
}

const GenericCollationsView = connect(
    RGenericCollationsView.mapProps, 
    RGenericCollationsView.mapDispatch
)(RGenericCollationsView)

export interface GenericAssetCollationAction extends AnyAction {

}

function assetCollationReducer(prev: [GenericAssetCollation], action: GenericAssetCollationAction): [GenericAssetCollation] {
    return prev
}

export class EnrichmentView extends EditingSessionObjectView<Enrichment> {
    constructor(props) {
        super(props)

        this.store = createStore(assetCollationReducer, props.object.generics)
    }

    store: Store<[GenericAssetCollation]>

    render() {
        return <Provider store={this.store} >
            <GenericCollationsView />
        </Provider>
    }
}

