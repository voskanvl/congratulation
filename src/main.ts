import "./style.sass"
import "@splidejs/splide/css/default"
import Splide from "@splidejs/splide"

const slider = new Splide("#slider", {
    type: "loop",
    autoplay: true,
})
slider.mount()

slider.on("moved", a => console.log(a))
