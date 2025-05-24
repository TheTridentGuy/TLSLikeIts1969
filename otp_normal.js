import { get_otp_name, crypto_safe_random_int } from "./otp_lib.js";


const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const num_per_page = 1100;

function generate_otp(){
    let len = parseInt($("#otp-len").value);
    let min = parseInt($("#otp-range-min").value);
    let max = parseInt($("#otp-range-max").value);
    if((isNaN(len) || isNaN(min) || isNaN(max) || min >= max) || len <= 0){
        return;
    }
    let name = get_otp_name();
    let otp_container = $("#otp-container");
    otp_container.innerHTML = "";
    for(let page = 1; page <= len; page++){
        let page_element = document.createElement("div");
        page_element.classList.add("page");
        page_element.classList.add("flex-col");

        let page_header = document.createElement("div");
        page_header.classList.add("flex-row");

        let num_container = document.createElement("div");
        num_container.classList.add("num-container");
        num_container.classList.add("flex-row");

        for(let i = 0; i < num_per_page; i++){
            let num = document.createElement("span");
            num.innerText = crypto_safe_random_int(min, max).toString().padStart(2, "0");
            num.className = "num";
            num_container.appendChild(num);
        }

        let page_stats = document.createElement("span");
        page_stats.innerHTML = `${page}/${len} - range: [${min},${max}]`;

        let spacer = document.createElement("div");
        spacer.classList.add("flex-grow");
        
        let page_name = document.createElement("span");
        page_name.innerHTML = name;

        page_header.appendChild(page_stats);
        page_header.appendChild(spacer);
        page_header.appendChild(page_name);
        page_element.appendChild(page_header);
        page_element.appendChild(num_container);
        otp_container.appendChild(page_element);
    }
}

$("#print").addEventListener("click", function(){
    print();
});
$("#generate").addEventListener("click", function(){
    generate_otp();
});
generate_otp();