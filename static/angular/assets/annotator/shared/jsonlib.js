function geroupArrayByKey(arr, key)
{
    var grouped = arr.reduce((h, a) => Object.assign(h, { [a[key]]:( h[a[key]] || [] ).concat(a) }), {});
    return grouped;
}

// function geroupedByKeysToArray(jobj, key)
// {
//     for(var key in jobj)
//     {

//     }
//     var grouped = arr.reduce((h, a) => Object.assign(h, { [a[key]]:( h[a[key]] || [] ).concat(a) }), {});
//     return grouped;
// }

// function putExtraKeys(jobj, extras)
// {
//     for(var key in jobj)
//     {
//         for(var i in extras)
//         {
//             jobj[key][extras[i][key]] = extras[i][value]
//         }        
//     }
//     var grouped = arr.reduce((h, a) => Object.assign(h, { [a[key]]:( h[a[key]] || [] ).concat(a) }), {});
//     return grouped;
// }

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}