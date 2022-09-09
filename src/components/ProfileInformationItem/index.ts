import Block from '../../utils/Block';
import template from './profileInformationItem.pug';
import styles from './profileInformationItem.scss';

interface ProfileInformationItemProps {
  textConst: string;
  textProfile: string;
}

export default class ProfileInformationItem extends Block {
  constructor(props: ProfileInformationItemProps) {
    super('div', props);
    this.element!.classList.add('profileInformationItem');
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
