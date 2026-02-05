$(document).ready(function () {
  // Grocery items array
  let groceryItems = [
    { id: "1", name: "milk", completed: true },
    { id: "2", name: "bread", completed: true },
    { id: "3", name: "eggs", completed: false },
    { id: "4", name: "butter", completed: false },
  ];

  // Render items dynamically
  function renderItems(items) {
    const $app = $("#app");
    $app.empty();

    const $container = $("<div>").addClass("items");

    items.forEach((item) => {
      const $item = $("<div>").addClass("single-item");

      const $checkbox = $("<input>")
        .attr("type", "checkbox")
        .prop("checked", item.completed)
        .on("change", function () {
          // Toggle completed state
          item.completed = $(this).is(":checked");
          renderItems(groceryItems);
        });

      const $name = $("<p>")
        .text(item.name)
        .css("text-decoration", item.completed ? "line-through" : "none");

      const $editBtn = $("<button>")
        .addClass("btn edit-btn")
        .text("Edit");

      const $removeBtn = $("<button>")
        .addClass("btn remove-btn")
        .text("Remove");

      $item.append($checkbox, $name, $editBtn, $removeBtn);
      $container.append($item);
    });

    $app.append($container);
  }

  // Initial render
  renderItems(groceryItems);
});