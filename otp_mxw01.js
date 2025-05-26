import { get_otp_name, crypto_safe_random_int } from "./otp_lib.js";


const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const num_per_row = 10;

var otp_canvas = $("#otp-canvas");
var otp_ctx = otp_canvas.getContext("2d");


function generate_otp() {
    let len = parseInt($("#otp-len").value);
    let min = parseInt($("#otp-range-min").value);
    let max = parseInt($("#otp-range-max").value);
    otp_ctx.font = "12px monospace";
    otp_ctx.fillText(`[${min},${max}] ` + get_otp_name(), 10, 20);
}


$("#generate").addEventListener("click", function(){
    generate_otp();
});
generate_otp();