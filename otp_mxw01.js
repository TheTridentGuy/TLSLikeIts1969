import { get_otp_name, crypto_safe_random_int } from "./otp_lib.js";


const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const num_per_row = 16;
const row_height = 20;
const header_height = 50;

var otp_canvas = $("#otp-canvas");
var otp_ctx = otp_canvas.getContext("2d");


function generate_otp() {
    let len = parseInt($("#otp-len").value);
    let min = parseInt($("#otp-range-min").value);
    let max = parseInt($("#otp-range-max").value);
    if((isNaN(len) || isNaN(min) || isNaN(max) || min >= max) || len <= 0){
        return;
    }
    otp_canvas.height = row_height * len + header_height;
    otp_ctx.font = "12px monospace";
    otp_ctx.fillText(`[${min},${max}]x${num_per_row*len} ` + get_otp_name(), 10, 20);
    for(let i = 0; i < len; i++){
        for(let j = 0; j < num_per_row; j++) {
            let x = (j % num_per_row) * ((384-20) / num_per_row) + 10;
            let y = i * row_height + header_height;
            let num = crypto_safe_random_int(min, max);
            otp_ctx.fillText(num, x, y);
        }
    }
}


$("#generate").addEventListener("click", function(){
    generate_otp();
});
$$("input").forEach((input) => {
    input.addEventListener("change", function() {
        generate_otp();
    });
});
generate_otp();