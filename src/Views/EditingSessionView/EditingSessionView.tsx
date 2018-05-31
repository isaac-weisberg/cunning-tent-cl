import * as React from 'react'
import { EditingSession } from '../../Shack/EditingSession';
import { LockableComponent } from '../../Application/LockableComponent';
import CuntentComponent from '../../Application/CuntentComponent';

export class EditingSessionView<SessionType> extends LockableComponent<{ session: EditingSession<SessionType> }, { locked: boolean }> {
    render() {
        let session = this.props.session
        return <div>
            { session.objectRenderer != null 
                ? <session.objectRenderer object={session.object} />
                : null
            }
            { session.pathRenderer != null
                ? <session.pathRenderer path={session.path} />
                : null
            }
        </div>
    }
}

export class EditingSessionPathView extends CuntentComponent<{ path: string }, {}> {

}

export class EditingSessionObjectView<ObjectType> extends CuntentComponent<{ object: ObjectType }, {}> {

}