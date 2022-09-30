import Post from './Post'
import './styles/styles.css'
import './styles/styles.scss'
import json from './assets/json.json';
import WebpackLogo from './assets/webpack-logo.png'

const post = new Post('Webpack Post Title', WebpackLogo);
console.log('Post to string1', post.toString());

console.log(json);