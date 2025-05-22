export { get_otp_name, get_otp_name_entropy, crypto_safe_random_item, crypto_safe_random_int };


var descriptions = await (await fetch("/descriptions.txt")).text();
var animals = await (await fetch("/animals.txt")).text();
descriptions = descriptions.split("\n");
animals = animals.split("\n");

function get_otp_name(){
    let ts = new Date(new Date().toUTCString()).getTime();
    let description = crypto_safe_random_item(descriptions);
    let animal = crypto_safe_random_item(animals);
    return `${ts}-${description}-${animal}`;
}

function get_otp_name_entropy(){
    return Math.log2(descriptions.length*animals.length);
}

function crypto_safe_random_item(list){
    const len = list.length;
    const array = new Uint32Array(1);
    const max = Math.floor(0x100000000 / len) * len;
    do{
        crypto.getRandomValues(array);
    } while(array[0] >= max);
    console.log(array[0], max, array[0] % len);
    return list[array[0] % len];
}

function crypto_safe_random_int(min, max){
    const array = new Uint32Array(1);
    const range = max - min;
    const max_range = Math.floor(0x100000000 / range) * range;
    do{
        crypto.getRandomValues(array);
    } while(array[0] >= max_range);
    return min + (array[0] % range);
}