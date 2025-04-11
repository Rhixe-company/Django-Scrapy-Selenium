import { Alpine as AlpineType } from "alpinejs";

export {};

declare global {
  interface Window {
    Alpine: AlpineType;
    htmx: any; // You can specify the actual type if known
  }
}
