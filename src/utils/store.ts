/* eslint-disable import/prefer-default-export */
import EventBus from "./EventBus";
import { set } from "./helpers";

export enum StoreEvents {
    Updated = 'updated'
}

export class Store extends EventBus {
    private state: any = {
        user: {
            firstName: 'Pavel',
            lastName: 'Postnikov'
        }
    };

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data)

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state
    }
}

export default new Store();
