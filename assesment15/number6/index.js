function createCounter(initialValue) {
  let value = initialValue;

  return {
    increment: function () {
      value++;
      updateUI(value);
    },
    decrement: function () {
      value--;
      updateUI(value);
    },
  };
}

function updateUI(value) {
  document.getElementById("counter").textContent = value;
}

const counter = createCounter(0);
