import Alpine from "alpinejs";
import mask from "@alpinejs/mask";
import persist from "@alpinejs/persist";
import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";
import morph from "@alpinejs/morph";
import dropdown from "./Alpine/dropdown";
import alert from "./Alpine/alert";
import carousel from "./Alpine/carousel";
window.Alpine = Alpine;

Alpine.plugin(mask);
Alpine.plugin(persist);
Alpine.plugin(focus);
Alpine.plugin(collapse);
Alpine.plugin(morph);

Alpine.data("dropdown", dropdown);
Alpine.data("carousel", carousel);
Alpine.data("alert", alert);
Alpine.start();
