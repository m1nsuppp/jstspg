import { resolve } from 'path';
import type { ProjectConfig } from '../m1nsuplee.config';

export async function loadConfig(configPath?: string): Promise<ProjectConfig> {
  const defaultConfigPath = resolve(process.cwd(), 'm1nsuplee.config.ts');
  const finalPath = configPath || defaultConfigPath;

  try {
    const config = await import(finalPath);
    return config.default;
  } catch (error) {
    console.error('Failed to load configuration:', error);
    throw error;
  }
}

// 설정 사용 예시
export async function initializeApp() {
  const config = await loadConfig();
  
  // 개발 서버 설정 적용
  const { port, host } = config.development;
  console.log(`Starting server on ${host}:${port}`);

  // 테마 설정 적용
  if (config.theme) {
    document.documentElement.style.setProperty('--primary-color', config.theme.colors.primary);
    document.documentElement.style.setProperty('--font-family', config.theme.typography.fontFamily);
  }

  // 플러그인 초기화
  config.plugins?.forEach(plugin => {
    console.log(`Initializing plugin: ${plugin.name}`);
    // 여기서 플러그인 로직 구현
  });

  return config;
}
