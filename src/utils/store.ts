/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import Block from "./Block";
import EventBus from "./EventBus";
import { isEqual, set } from "./helpers";

export enum StoreEvents {
    Updated = 'updated'
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data)

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state
    }
}

interface ComponentConstructable<P extends Record<string, any>> {
    new(props: P): Block<P>
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

    return function wrap(Component: ComponentConstructable<any>) {
        let previousState: any;


        return class WithStore extends Component {

            constructor(props: any) {
                previousState = mapStateToProps(store.getState());

                super({ ...props, ...previousState });

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    if (isEqual(previousState, stateProps)) {
                        return;
                    }

                    previousState = stateProps;

                    this.setProps({ ...stateProps });
                });
            }
        }

    }

}

export default store;