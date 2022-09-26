import Block from './Block';

function render(query: string, block: any) {
    const root = document.querySelector(query);

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`);
    }

    root.innerHTML = '';

    root.append(block.getContent()!);

    return root;
}

interface ComponentConstructable<P extends Record<string, any>> {
    new(props: P): Block<P>
}

export default class Route {
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
        return pathname === this.pathname;
    }

    render() {
        if (!this.block) {
            // eslint-disable-next-line new-cap
            this.block = new this.blockClass({});

            render(this.query, this.block);

        }
    }
}