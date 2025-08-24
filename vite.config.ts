
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isUserOrOrgSite = !!repoName && repoName.endsWith(".github.io");

  return {
    // If developing locally: '/'
    // If deploying to GitHub Pages:
    //  - user/org sites like "<user>.github.io": '/'
    //  - project sites: '/<repo>/'
    base:
      mode === "development"
        ? "/"
        : isUserOrOrgSite
        ? "/"
        : repoName
        ? `/${repoName}/`
        : "/",

    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
