const btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
  window.alert(`высота: ${document.documentElement.clientHeight}` + ` ширина: ${document.documentElement.clientWidth}`);
});
