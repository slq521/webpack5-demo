// polyfill会转义所有的js新语法
// import '@babel/polyfill';
import './main.css';
import './index.less';
// eslint-disable-next-line
import logo from './image/logo.png';

function component() {
  // eslint-disable-next-line
  const element = document.createElement('div');

  element.innerHTML = '勇敢的牛牛1';
  element.classList.add('hello');

  // eslint-disable-next-line
  const myIcon = new Image();
  myIcon.src = logo;
  myIcon.alt = '';

  element.appendChild(myIcon);

  return element;
}
// eslint-disable-next-line
document.body.appendChild(component());

// const testFn = () => {
//   console.log('babel 转义');
// }

// eslint-disable-next-line
console.log('接口地址', API_BASE_URL);
