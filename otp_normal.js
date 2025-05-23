import { get_otp_name, crypto_safe_random_int } from "./otp_lib.js";


const $ = (selector) => document.querySelector(selector);


function generate_otp(){
    $("#otp-name").innerHTML = get_otp_name();
    let otp_container = $("#otp");
    for(let i = 0; i < $("#otp-nums").value; i++){
        let num = document.createElement("span");
        num.innerText = crypto_safe_random_int(0, 99).toString().padStart(2, "0");
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