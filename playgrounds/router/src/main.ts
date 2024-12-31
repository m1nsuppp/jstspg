import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { Router } from './router'

// 컴포넌트들
const Home = () => `
  <h1>Home</h1>
  <nav>
    <a href="/about" data-link>About</a>
    <a href="/contact" data-link>Contact</a>
  </nav>
`;

const About = () => `
  <h1>About</h1>
  <nav>
    <a href="/" data-link>Home</a>
    <a href="/contact" data-link>Contact</a>
  </nav>
`;

const Contact = () => `
  <h1>Contact</h1>
  <nav>
    <a href="/" data-link>Home</a>
    <a href="/about" data-link>About</a>
  </nav>
`;

// HTML에 app 컨테이너 추가
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div id="router-view"></div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// 라우터 초기화 및 라우트 설정
const router = new Router('router-view');

router
  .addRoute('/', Home)
  .addRoute('/about', About)
  .addRoute('/contact', Contact)
  .init();
