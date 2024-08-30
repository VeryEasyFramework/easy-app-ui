/// <reference types="vite/client" />

declare module '*.vue' {
   import type {DefineComponent} from 'vue'
   const component: DefineComponent<{}, {}, any>
   export default component
}

// vite env

interface ImportMetaEnv {
   VITE_API: string
   VITE_DEBUG: boolean
   VITE_GRID_DEBUG: boolean

}
