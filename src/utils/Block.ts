
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

class Block<T extends Object> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public id = nanoid(6);

    protected props: any;

    public children: Record<string, Block<T> | Block<T>[]>;

    private eventBus: () => EventBus;

    private elementPrivate: HTMLElement | null = null;

    private meta: { tagName: string; props: any; };

    /** JSDoc
       * @param {string} tagName
       * @param {Object} props
       *
       * @returns {void}
       */
    constructor(tagName = 'div', propsWithChildren: T = {} as T) {
        const eventBus = new EventBus();

        const { props, children } = this.getChildrenAndProps(propsWithChildren);

        this.meta = {
            tagName,
            props,
        };

        this.children = children;
        this.props = this.makePropsProxy(props);

        this.eventBus = () => eventBus;

        this.registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }
    // eslint-disable-next-line
    private getChildrenAndProps(childrenAndProps: any) {
        const props: Record<string, any> = {};
        const children: Record<string, any> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
                children[key] = value;
            } else if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    private addEvents() {
        const { events = {} } = this.props as { events: Record<string, () => void> };

        Object.keys(events).forEach((eventName) => {
            this.elementPrivate?.addEventListener(eventName, events[eventName]);
        });
    }

    private registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.initPrivate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMountPrivate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdatePrivate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.renderPrivate.bind(this));
    }

    private createResources() {
        const { tagName } = this.meta;
        this.elementPrivate = this.createDocumentElement(tagName);
    }

    private initPrivate() {
        this.createResources();

        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // eslint-disable-next-line
    protected init() { }

    private componentDidMountPrivate() {
        this.componentDidMount();
    }

    // eslint-disable-next-line
    componentDidMount() { }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children)
            .forEach((child) => (Array.isArray(child)
                ? child.forEach((c) => c.dispatchComponentDidMount)
                : child.dispatchComponentDidMount()));
    }

    private componentDidUpdatePrivate(oldProps: any, newProps: any) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // eslint-disable-next-line
    protected componentDidUpdate(_oldProps: any, _newProps: any) {
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this.elementPrivate;
    }

    private renderPrivate() {
        const fragment = this.render();

        if (this.elementPrivate !== null) {
            this.elementPrivate.innerHTML = '';
        }
        if (this.elementPrivate !== null) {
            this.elementPrivate.append(fragment);
        }
        this.addEvents();
    }

    // eslint-disable-next-line
    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map((el) => `<div data-id="${el.id}"></div>`).join('');
            } else if (component instanceof Block) {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        // eslint-disable-next-line
        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((el: Block<T>) => {
                    const stub = temp.content.querySelector(`[data-id="${el.id}"]`);
                    if (!stub) return;
                    el.getContent()?.append(...Array.from(stub.childNodes));
                    stub.replaceWith(el.getContent() || '');
                });
            } else {
                const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
                if (!stub) return;
                component.getContent()?.append(...Array.from(stub.childNodes));
                stub.replaceWith(component.getContent() || '');
            }
        });

        return temp.content;
    }

    // eslint-disable-next-line
    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    // todo Привести к T
    private makePropsProxy = (props: any) => new Proxy(props, {
        get: (target, prop) => {
            const value = target[prop];
            return typeof value === 'function' ? value.bind(target) : value;
        },
        set: (target, prop, value) => {
            const oldTarget = { ...target };

            // eslint-disable-next-line no-param-reassign
            target[prop] = value;

            this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
            return true;
        },
        deleteProperty: () => {
            throw new Error('Нет доступа');
        },
    })

    // eslint-disable-next-line class-methods-use-this
    private createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = 'block';
    }

    hide() {
        this.getContent()!.style.display = 'none';
    }
}

export default Block;
