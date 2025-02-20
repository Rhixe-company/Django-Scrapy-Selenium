import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import htmx from "htmx.org";

const comicButton: HTMLElement | null = document.getElementById("comicButton");
const comicimageButton: HTMLElement | null =
    document.getElementById("comicimageButton");
const chapterButton: HTMLElement | null =
    document.getElementById("chapterButton");

function myconfirm(e: any) {
    e.preventDefault();
    Swal.fire({
        title: "Delete",
        icon: "error",
        confirmButtonText: "Confirm",
        text: "Are you sure you want to delete?",
    }).then((result) => {
        if (result.isConfirmed) {
            htmx.trigger(this, "confirmed");
        }
    });
}
if (comicButton) {
    comicButton.addEventListener("click", myconfirm);
}
if (comicimageButton) {
    comicimageButton.addEventListener("click", myconfirm);
}
if (chapterButton) {
    chapterButton.addEventListener("click", myconfirm);
}
