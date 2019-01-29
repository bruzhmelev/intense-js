let obj = {};

function a() {
  let x = 1;
  obj.f = b;
  function b() {
    var y = "asd";
    console.log("x: " + x);
  }
}

a();

console.log(obj);
obj.f();