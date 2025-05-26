import { defineConfig } from "vitepress";
import { tasklist } from "@mdit/plugin-tasklist";
import { generateSidebar } from "vitepress-sidebar";

const base = "/gogo-web-knowledge-store/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Web Knowledge Store",
  description: "静夜聆雨的WEB前端学习笔记",
  head: [
    ["link", { rel: "icon", href: `${base}favicon.ico` }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "前端,学习笔记,静夜聆雨,HTML,CSS,JavaScript,TypeScript,Vue,React,Node.js,Next.js,NestJS,Web开发",
      },
    ],
  ],
  base,
  lang: "zh-CN",
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  sitemap: {
    hostname: "https://gogomusic.github.io/gogo-web-knowledge-store/",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "前端",
        items: [
          { text: "前端导航", link: "/nav" },
          { text: "前端基础", link: "/前端基础/CSS/CSS常用样式" },
          { text: "Vue", link: "/Vue/Vue3" },
          { text: "React", link: "/React" },
          { text: "TypeScript", link: "/TypeScript" },
          { text: "Node.js", link: "/Node.js" },
          { text: "前端工程化", link: "/前端工程化" },
          { text: "常用库&解决方案", link: "/常用库&解决方案" },
        ],
      },

      { text: "学习计划", link: "/study" },
      { text: "关于", link: "/about" },
    ],
    sidebar: generateSidebar(
      [
        "前端基础",
        "Vue",
        "React",
        "TypeScript",
        "Node.js",
        "经验积累",
        "常用库&解决方案",
        "跨平台",
        "服务端渲染(SSR)",
        "前端工程化",
        "数据库",
        "NestJS",
      ].map(item => ({
        scanStartPath: item,
        basePath: `/${item}/`,
        resolvePath: `/${item}/`,
        sortMenusByName: true,
        includeRootIndexFile: true,
        includeFolderIndexFile: true,
        collapsed: false,
        useTitleFromFileHeading: true,
        useFolderLinkFromIndexFile: true,
      }))
    ),
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/gogomusic/gogo-web-knowledge-store",
      },
    ],
    search: {
      provider: "local",
    },
    outline: {
      level: "deep",
    },
  },
  markdown: {
    config: md => {
      md.use(tasklist);
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    assetsInclude: ["**/*.JPG"],
  },
});
