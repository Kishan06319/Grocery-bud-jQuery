$(document).ready(function () {
  let groceryItems = [
    { id: "1", name: "milk", completed: true },
    { id: "2", name: "bread", completed: true },
    { id: "3", name: "eggs", completed: false },
    { id: "4", name: "butter", completed: false },
  ];

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
        .text("Remove")
        .on("click", function () {
          // Remove item by filtering out its id
          groceryItems = groceryItems.filter((i) => i.id !== item.id);
          renderItems(groceryItems);
        });

      $item.append($checkbox, $name, $editBtn, $removeBtn);
      $container.append($item);
    });

    $app.append($container);
  }

  renderItems(groceryItems);
});