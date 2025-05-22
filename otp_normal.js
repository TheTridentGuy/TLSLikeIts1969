import { get_otp_name } from "./otp_lib.js";


const $ = (selector) => document.querySelector(selector);


console.log("otp_normal.js loaded");
function generate_otp(){
    $("#otp-name").innerHTML = get_otp_name();
}

generate_otp();