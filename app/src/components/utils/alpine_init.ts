import Alpine from "alpinejs";
import mask from "@alpinejs/mask";
import persist from "@alpinejs/persist";
import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";
import morph from "@alpinejs/morph";
import alert from "./Alpine/alert";
import dropdown from "./Alpine/dropdown";
window.Alpine = Alpine;

Alpine.plugin(mask);
Alpine.plugin(persist);
Alpine.plugin(focus);
Alpine.plugin(collapse);
Alpine.plugin(morph);

Alpine.data("dropdown", dropdown);
Alpine.data("alert", alert);
Alpine.start();
