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

    const $list = $("<ul>").addClass("items");

    items.forEach((item) => {
      const $li = $("<li>").addClass("single-item");

      const $checkbox = $("<input>")
        .attr("type", "checkbox")
        .prop("checked", item.completed)
        .on("change", function () {
          item.completed = $(this).is(":checked");
          renderItems(groceryItems);
        });

      const $name = $("<span>")
        .text(item.name)
        .css("text-decoration", item.completed ? "line-through" : "none");

      const $editBtn = $("<button>")
        .addClass("btn edit-btn")
        .text("Edit")
        .on("click", function () {
          // Replace span with input for editing
          const $input = $("<input>")
            .attr("type", "text")
            .val(item.name)
            .on("blur keypress", function (e) {
              if (e.type === "blur" || e.key === "Enter") {
                item.name = $(this).val().trim() || item.name;
                renderItems(groceryItems);
              }
            });
          $name.replaceWith($input);
          $input.focus();
        });

      const $removeBtn = $("<button>")
        .addClass("btn remove-btn")
        .text("Remove")
        .on("click", function () {
          groceryItems = groceryItems.filter((i) => i.id !== item.id);
          renderItems(groceryItems);
        });

      $li.append($checkbox, $name, $editBtn, $removeBtn);
      $list.append($li);
    });

    $app.append($list);
  }

  // Handle form submission
  $("#grocery-form").on("submit", function (e) {
    e.preventDefault();
    const inputVal = $("#grocery-input").val().trim();

    if (inputVal) {
      const newItem = {
        id: Date.now().toString(),
        name: inputVal,
        completed: false,
      };
      groceryItems.push(newItem);
      $("#grocery-input").val(""); // clear input
      renderItems(groceryItems);
    }
  });

  renderItems(groceryItems);
});
