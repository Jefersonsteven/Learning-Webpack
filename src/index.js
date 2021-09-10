import Template from '@templates/Template.js';
import '@styles/main.css';
import '@styles/header.scss';

(async function App() {
    const main = null || document.getElementById('main');
    main.innerHTML = await Template();
})();

console.log('Hola Mundo');