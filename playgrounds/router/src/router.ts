type Route = {
  path: string;
  component: () => string | Promise<string>;
};

export class Router {
  private routes: Route[] = [];
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;
    
    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', () => {
      this.render(window.location.pathname);
    });
  }

  // 라우트 등록
  addRoute(path: string, component: () => string | Promise<string>) {
    this.routes.push({ path, component });
    return this;
  }

  // 페이지 이동
  navigate(path: string) {
    window.history.pushState(null, '', path);
    return this.render(path);
  }

  // 현재 경로에 맞는 컴포넌트 찾기
  private findRoute(path: string): Route | undefined {
    return this.routes.find(route => route.path === path);
  }

  // 컴포넌트 렌더링
  private async render(path: string) {
    const route = this.findRoute(path);
    
    if (!route) {
      this.container.innerHTML = '<h1>404 Not Found</h1>';
      return;
    }

    const content = await route.component();
    this.container.innerHTML = content;
  }

  // 초기 라우트 설정
  init() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(target.getAttribute('href') || '/');
      }
    });

    // 초기 페이지 렌더링
    this.render(window.location.pathname);
  }
}