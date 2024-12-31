interface ProjectConfig {
  // 프로젝트 기본 설정
  project: {
    name: string;
    version: string;
    description?: string;
  };
  
  // 개발 환경 설정
  development: {
    port: number;
    host: string;
    apiBaseUrl: string;
    cors?: {
      origin: string[];
      methods: string[];
    };
  };

  // 빌드 설정
  build: {
    outDir: string;
    minify: boolean;
    sourcemap: boolean;
    target: string[];
  };

  // 커스텀 플러그인 설정
  plugins?: {
    name: string;
    options?: Record<string, unknown>;
  }[];

  // 테마 설정
  theme?: {
    colors: {
      primary: string;
      secondary: string;
      [key: string]: string;
    };
    typography: {
      fontFamily: string;
      fontSize: Record<string, string>;
    };
  };
}

const config: ProjectConfig = {
  project: {
    name: "m1nsuplee-project",
    version: "1.0.0",
    description: "A custom project configuration"
  },
  
  development: {
    port: 3000,
    host: "localhost",
    apiBaseUrl: "http://api.example.com",
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  },

  build: {
    outDir: "dist",
    minify: true,
    sourcemap: true,
    target: ["es2020", "chrome80", "firefox80"]
  },

  plugins: [
    {
      name: "m1nsuplee-logger",
      options: {
        level: "debug",
        prefix: "[M1NSUPLEE]"
      }
    }
  ],

  theme: {
    colors: {
      primary: "#3B82F6",
      secondary: "#10B981",
      background: "#FFFFFF",
      text: "#1F2937"
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: {
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem"
      }
    }
  }
};

export default config;
