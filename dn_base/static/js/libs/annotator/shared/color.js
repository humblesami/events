function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {    
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbStringToHex(rgb) {    
    rgb = rgb.replace('rgb(','');
    rgb = rgb.replace(')','');
    rgb = rgb.split(',');
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[1]);
    return rgbToHex(r, g, b);
}

function background_color_to_hex(el) {
    rgb = el.style.backgroundColor;
    //console.log(rgb);
    rgb = rgb.replace('rgb(','');
    rgb = rgb.replace(')','');
    //console.log(rgb);
    rgb = rgb.split(',');
    //console.log(rgb);
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[1]);
    //console.log(r,g, b);
    var hex = componentToHex(r) + componentToHex(g) + componentToHex(b);
    //console.log(hex);
    return hex;
}
function background_color_to_hashed_hex(el) {
    var hex = background_color_to_hex(el);
    hex = '#'+hex;
    return hex;
}