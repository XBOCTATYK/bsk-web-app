import {defineConfig} from "vite";
import sri from "@small-tech/vite-plugin-sri";

export default defineConfig({
    // …
    plugins: [sri()]
})