import { get_otp_name, crypto_safe_random_int } from "./otp_lib.js";


const $ = (selector) => document.querySelector(selector);


function generate_otp(){
    let len = parseInt($("#otp-len").value);
    let min = parseInt($("#otp-range-min").value);
    let max = parseInt($("#otp-range-max").value);
    if((isNaN(len) || isNaN(min) || isNaN(max) || min >= max) || len <= 0){
        return;
    }
    $("#otp-name").innerHTML = get_otp_name();
    $("#otp-stats").innerHTML = `length: ${len}, range: [${min},${max}]`;
    let otp_container = $("#otp");
    otp_container.innerHTML = "";
    for(let i = 0; i < len; i++){
        let num = document.createElement("span");
        num.innerText = crypto_safe_random_int(min, max).toString().padStart(2, "0");
        num.className = "num";
        otp_container.appendChild(num);
    }
}

$("#print").addEventListener("click", function(){
    print();
});
$("#generate").addEventListener("click", function(){
    generate_otp();
});
generate_otp();