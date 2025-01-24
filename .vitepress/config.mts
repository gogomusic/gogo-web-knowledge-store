import { defineConfig } from "vitepress";
import { tasklist } from "@mdit/plugin-tasklist";

const base = "/gogo-web-knowledge-store/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Web Knowledge Store",
  description: "静夜聆雨的WEB前端学习笔记",
  head: [["link", { rel: "icon", href: `${base}favicon.ico` }]],
  base,
  lang: "zh-CN",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "前端导航", link: "/nav" },
      {
        text: "前端笔记",
        items: [
          { text: "HTML", link: "/HTML/img" },
          { text: "CSS", link: "/CSS/CSS常用样式" },
          { text: "浏览器与网络", link: "/浏览器与网络/强缓存与协商缓存" },
          { text: "Node.js", link: "/Node.js/" },
        ],
      },
      {
        text: "后端开发",
        items: [
          { text: "NestJS", link: "/NestJS" },
          { text: "MySQL", link: "/数据库/MySQL" },
        ],
      },
      { text: "关于", link: "/about" },
    ],
    sidebar: {
      "/HTML/": [
        {
          text: "HTML",
          items: [{ text: `img`, link: "/HTML/img" }],
        },
      ],
      "/CSS/": [
        {
          text: "CSS",
          items: [
            { text: `CSS常用样式`, link: "/CSS/CSS常用样式" },
            { text: `grid 网格布局`, link: "/CSS/grid 网格布局" },
            { text: `Tailwind CSS`, link: "/CSS/Tailwind CSS" },
          ],
        },
      ],
      "/浏览器与网络/": [
        {
          text: "HTTP",
          items: [
            {
              text: `强缓存与协商缓存`,
              link: "/浏览器与网络/强缓存与协商缓存",
            },
          ],
        },
      ],
      "/Node.js/": [
        {
          text: "Node.js",
          items: [
            {
              text: `Node.js`,
              link: "/Node.js/",
            },
          ],
        },
      ],
      "/NestJS/": [
        {
          text: "NestJS",
          items: [
            {
              text: `NestJS`,
              link: "/NestJS",
            },
          ],
        },
      ],
    },
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
