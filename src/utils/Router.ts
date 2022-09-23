/* eslint-disable max-classes-per-file */
import Block from './Block';

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

function render(query: string, block: any) {
    const root = document.querySelector(query);

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`);
    }

    root.innerHTML = '';

    root.append(block.getContent()!);
    block.dispatchComponentDidMount();

    return root;
}

interface ComponentConstructable<P extends Record<string, any>> {
    new(props: P): Block<P>
}

class Route {
    private block: any | null = null;

    constructor(
        private pathname: string,
        private readonly blockClass: ComponentConstructable<any>,
        private readonly query: string) {
    }

    leave() {
        this.block = null;
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    render() {
        if (!this.block) {
            // eslint-disable-next-line new-cap
            this.block = new this.blockClass({});

            render(this.query, this.block);

        }
    }
}

class Router {
    private static __instance: Router;

    private routes: Route[] = [];

    private currentRoute: Route | null = null;

    private history = window.history;

    constructor(private readonly rootQuery: string) {
        // eslint-disable-next-line no-underscore-dangle
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return, no-underscore-dangle
            return Router.__instance;
        }

        this.routes = [];

        // eslint-disable-next-line no-underscore-dangle
        Router.__instance = this;
    }

    public use(pathname: string, block: ComponentConstructable<any>) {
        const route = new Route(pathname, block, this.rootQuery);
        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            // eslint-disable-next-line no-underscore-dangle
            this._onRoute(target.location.pathname);
        }

        // eslint-disable-next-line no-underscore-dangle
        this._onRoute(window.location.pathname);
    }

    // eslint-disable-next-line no-underscore-dangle
    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;

        route.render();
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);

        // eslint-disable-next-line no-underscore-dangle
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('#app');
