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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "首页", link: "/" }],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/gogomusic/gogo-web-knowledge-store",
      },
    ],
  },
  markdown: {
    config: md => {
      md.use(tasklist);
    },
  },
});
