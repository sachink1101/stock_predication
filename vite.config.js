import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Stok-prediction1/", // ✅ Set correct base path
  plugins: [react()],
});
