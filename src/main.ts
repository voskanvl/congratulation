import "./style.sass"
import "@splidejs/splide/css/default"
import Splide from "@splidejs/splide"

const slider = new Splide("#slider", {
    type: "loop",
    autoplay: true,
})
slider.mount()

const hasid = document.querySelector<HTMLVideoElement>("#hasid"),
    loading = document.querySelector<HTMLElement>(".loading")
hasid && hasid.addEventListener("loadeddata", () => loading?.setAttribute("hidden", "hidden"))
