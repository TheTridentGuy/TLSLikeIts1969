import { get_otp_name, crypto_safe_random_int } from "./otp_lib.js";
import { connect_printer, print_image } from "./printer.js";
import { error } from "./message.js";


const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const num_per_row = 16;
const row_height = 20;
const header_height = 50;

var otp_canvas = $("#otp-canvas");
var otp_ctx = otp_canvas.getContext("2d");
var connect_btn = $("#connect");
var print_btn = $("#print")

function threshold(image_data, threshold){
    var data = image_data.data;
    for (let i = 0; i < data.length; i += 4) {
        var v = data[i] < threshold ? 0 : 255;
        data[i] = data[i + 1] = data[i + 2] = v;
    }
}

function floyd_steinberg(image_data, threshold){
    var width = image_data.width;
    var height = image_data.height;
    var data = image_data.data;
    var luminance = new Array(width * height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            var idx = (i * width + j) * 4;
            luminance[i * width + j] = data[idx];
        }
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            var idx = i * width + j;
            var oldPixel = luminance[idx];
            var newPixel = oldPixel < threshold ? 0 : 255;
            luminance[idx] = newPixel;
            
            var error = oldPixel - newPixel;
            
            if (j + 1 < width) {
                luminance[idx + 1] += error * 7 / 16;
            }
            if (i + 1 < height) {
                if (j - 1 >= 0) {
                    luminance[(i + 1) * width + j - 1] += error * 3 / 16;
                }
                luminance[(i + 1) * width + j] += error * 5 / 16;
                if (j + 1 < width) {
                    luminance[(i + 1) * width + j + 1] += error * 1 / 16;
                }
            }
        }
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            var idx = (i * width + j) * 4;
            var v = luminance[i * width + j];
            data[idx] = data[idx + 1] = data[idx + 2] = v;
        }
    }
}

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
    let img_data = otp_ctx.getImageData(0, 0, otp_canvas.width, otp_canvas.height);
    console.log(img_data.data);
    threshold(img_data, 50);
    otp_ctx.putImageData(img_data, 0, 0);
}



$$("input").forEach((input) => {
    input.addEventListener("change", function() {
        generate_otp();
    });
});
if(typeof navigator.bluetooth == "undefined"){
    error("No WebBluetooth");
    connect_btn.style.cursor = "not-allowed";
    print_btn.style.cursor = "not-allowed";
}else{
    error("Not Connected")
    connect_btn.addEventListener("click", (event) => {
        connect_printer();
    })
    print_btn.addEventListener("click", (event) => {
        print_image($("#otp-canvas"));
    })
}
generate_otp();