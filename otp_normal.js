import { get_otp_name } from "./otp_lib.js";


const $ = (selector) => document.querySelector(selector);


console.log("otp_normal.js loaded");
function generate_otp(){
    $("#otp-name").innerHTML = get_otp_name();
}

$("#print").addEventListener("click", function(){
    print();
});
$("#generate").addEventListener("click", function(){
    generate_otp();
});
generate_otp();