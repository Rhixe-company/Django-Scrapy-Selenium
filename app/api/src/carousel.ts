import { Carousel } from "flowbite";
import type {
    CarouselItem,
    CarouselOptions,
    CarouselInterface,
} from "flowbite";
import type { InstanceOptions } from "flowbite";

const carouselElement: HTMLElement = document.getElementById(
    "default-carousel",
) as HTMLElement;

const items: CarouselItem[] = [
    {
        position: 0,
        el: document.getElementById("carousel-item-1") as HTMLElement,
    },
    {
        position: 1,
        el: document.getElementById("carousel-item-2") as HTMLElement,
    },
    {
        position: 2,
        el: document.getElementById("carousel-item-3") as HTMLElement,
    },
    {
        position: 3,
        el: document.getElementById("carousel-item-4") as HTMLElement,
    },
    {
        position: 4,
        el: document.getElementById("carousel-item-5") as HTMLElement,
    },
    {
        position: 5,
        el: document.getElementById("carousel-item-6") as HTMLElement,
    },
    {
        position: 6,
        el: document.getElementById("carousel-item-7") as HTMLElement,
    },
];

// object options with default values
const options: CarouselOptions = {
    defaultPosition: 0,
    interval: 9000,

    indicators: {
        activeClasses: "selected",
        // inactiveClasses: 'dot',
        items: [
            {
                position: 0,
                el: document.getElementById(
                    "carousel-indicator-1",
                ) as HTMLElement,
            },
            {
                position: 1,
                el: document.getElementById(
                    "carousel-indicator-2",
                ) as HTMLElement,
            },
            {
                position: 2,
                el: document.getElementById(
                    "carousel-indicator-3",
                ) as HTMLElement,
            },
            {
                position: 3,
                el: document.getElementById(
                    "carousel-indicator-4",
                ) as HTMLElement,
            },
            {
                position: 4,
                el: document.getElementById(
                    "carousel-indicator-5",
                ) as HTMLElement,
            },
            {
                position: 5,
                el: document.getElementById(
                    "carousel-indicator-6",
                ) as HTMLElement,
            },
            {
                position: 6,
                el: document.getElementById(
                    "carousel-indicator-7",
                ) as HTMLElement,
            },
        ],
    },

    // // callback functions
    // onNext: () => {
    //     console.log('next slider item is shown');
    // },
    // onPrev: () => {
    //     console.log('previous slider item is shown');
    // },
    // onChange: () => {
    //     console.log('new slider item has been shown');
    // },
};

// instance options object
const instanceOptions: InstanceOptions = {
    id: "default-carousel",
    override: true,
};

const carousel: CarouselInterface = new Carousel(
    carouselElement,
    items,
    options,
    instanceOptions,
);

carousel.cycle();

// set event listeners for prev and next buttons
const $prevButton = document.getElementById(
    "data-carousel-prev",
) as HTMLElement;
const $nextButton = document.getElementById(
    "data-carousel-next",
) as HTMLElement;

$prevButton.addEventListener("click", () => {
    carousel.prev();
});

$nextButton.addEventListener("click", () => {
    carousel.next();
});
