import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/stock_predication/", // ✅ Set correct base path
  plugins: [react()],
});
