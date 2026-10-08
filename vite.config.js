import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ base: "/trip-itinerary-builder/", build: { sourcemap: false }, plugins: [react()] });
