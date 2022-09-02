import Block from '../../utils/Block';
import template from './home.pug';
import { Button } from '../../components/Button';
import { InputArea } from '../../components/InputArea';
import styles from '../Registration/Registration.scss';



interface HomePageProps {
    title: string;
}

export class HomePage extends Block {
    constructor(props: HomePageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Button({
                label: 'Click me',
                href: 'https://vk.com/ads?act=office&union_id=1600191398',
                events: {
                    click: () => console.log('clicked'),
                },
            }),
            new Button({
                label: 'Click me',
                href: 'https://vk.com/ads?act=office&union_id=1600191398',
                events: {
                    click: () => console.log('clicked'),
                },
            })
        ];
        this.children.inputArea = new InputArea({
            nameInputText: 'Click',
            nameInput: 'Click',
            type: 'password',
            placeholderText: 'Click',
        });
    }
    // init() {
    //     let arr: any = [];
    //     arr.push(new Button({
    //         label: 'Click me1',
    //         href: '#',
    //         events: {
    //             click: () => console.log('clicked1'),
    //         },
    //     }))
    //     arr.push(new Button({
    //         label: 'Click me2',
    //         href: '#',
    //         events: {
    //             click: () => console.log('clicked2'),
    //         },
    //     }))
    //     this.children.button = arr;

    //     this.children.inputArea = new InputArea({
    //         nameInputText: 'Click',
    //         nameInput: 'Click',
    //         type: 'password',
    //         placeholderText: 'Click',
    //     });
    //}

    // init() {
    //     this.children.button = new Button({
    //         label: 'Click me',
    //         href: 'https://vk.com/ads?act=office&union_id=1600191398',
    //         events: {
    //             click: () => console.log('clicked'),
    //         },
    //     });
    //     this.children.inputArea = new InputArea({
    //         nameInputText: 'Click',
    //         nameInput: 'Click',
    //         type: 'password',
    //         placeholderText: 'Click',
    //     });
    // }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
