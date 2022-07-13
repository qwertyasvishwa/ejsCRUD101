const button = document.getElementById("update-button");

const update = button.addEventListener("click", function (req, res) {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
      quote: "I find your lack of faith disturbing.",
    }),
  });

  console.log("Here in main.js button function");
});

console.log("We are here in main.js file");
