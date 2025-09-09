// let arr = [1, 2, 3, 4, 5];

// arr.forEach(function(val){
//     console.log(val + " hello");
// });

// let newArr = arr.map(function(val){
//     return val + 13;
// });

// console.log(newArr);

// let filterArr = arr.filter(function(val){
//     if(val > 3){
//         return true;
//     }
// })

// console.log(filterArr);

// let findArr = arr.find(function(val){
//     if(val === 3){
//         return true;
//     }
// })

// console.log(findArr);

// let indexOffArr = arr.indexOf(3);
// console.log(indexOffArr);
















// let obj = {
//     name: "Mann Gwal",
//     age: 20
// }
// Object.freeze(obj);
// obj.name = "New Name";

// console.log(obj.name)










const fs = require('fs');

// fs.writeFile('hey.txt', "Hello World", function(err){
//     if(err){
//         console.error(err);
//     } else {
//         console.log("File written successfully");
//     }
// });

// fs.appendFile('hey.txt', "\nHello Again", function(err){
//     if(err){
//         console.error(err);
//     } else {
//         console.log("File appended successfully");
//     }
// });


// fs.rename('hey.txt', 'hello.txt', function(err){
//     if(err){
//         console.error(err);
//     } else {
//         console.log("File renamed successfully");
//     }
// });


// fs.copyFile('hello.txt', './copy/copy_hello.txt', function(err){
//     if(err){
//         console.error(err.message);
//     } else {
//         console.log("File copied successfully");
//     }
// });


// fs.unlink("./copy/copy_hello.txt", function(err){
//     if(err){
//         console.error(err.message);
//     } else {
//         console.log("File deleted successfully");
//     }
// });


// fs.unlink("hello.txt", function(err){
//     if(err){
//         console.error(err.message);
//     } else {
//         console.log("File deleted successfully");
//     }
// });


// fs.rm("./copy", { recursive: true }, function(err){
//     if(err){
//         console.error(err.message);
//     } else {
//         console.log("Directory deleted successfully");
//     }
// });


// fs.writeFile("hey.txt", "Hello World", function(err){
//     if(err){
//         console.error(err);
//     } else {
//         console.log("File written successfully");
//     }
// });

fs.readFile("hey.txt", "utf-8", (err, data) => {
    if(err){
        console.error(err);
    } else {
        console.log(data);
    }
});