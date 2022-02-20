// indexOf, inclueds
// function unique(arr) {
//   var res = [];
//   for (let index = 0; index < arr.length; index++) {
//     if (res.indexOf(arr[index]) === -1) {
//       res.push(arr[index]);
//     }
//   }
//   return res;
// }

// fliter
function unique(arr) {
  var res = arr.filter((item, index, array) => {
    //   如果有相同的数据就不可能是同一个次序
    return array.indexOf(item) === index;
  });
  return res;
}

var arr = [1, 2, 3, "3", 2, 3, 3, 1, "2"];
console.log(unique(arr));
