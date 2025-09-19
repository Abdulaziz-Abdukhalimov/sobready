console.log("Products frontend javascript file");

$(function () {
  // Handle product collection (Dish vs Drink)
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "DRINK") {
      $("#product-collection").hide();
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  // Show create form
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  // Cancel form
  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");

    // Reset form + switch back to create mode
    $(".dish-container")[0].reset();
    $("#create-btn").text("Create").removeClass("update-mode");
    $(".dish-container").removeData("id");
  });

  // Update product status (dropdown)
  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id,
      productStatus = $(`#${id}.new-product-status`).val();

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      console.log("responsedata:", response);
      const result = response.data;

      if (result) {
        console.log("Product updated");
        $(".new-product-status").blur();
      } else {
        alert("Product update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Product update failed");
    }
  });
});

//Image handling
function renderImagesToForm(imageUrls) {
  // Clear any existing images
  for (let i = 1; i <= 5; i++) {
    $(`#image-section-${i}`).attr("src", "/img/upload-bro.svg");
  }

  // Render the new images from the provided URLs
  imageUrls.forEach((url, index) => {
    if (index < 5) {
      $(`#image-section-${index + 1}`).attr("src", `/${url}`);
    }
  });
}

// Update product logic
$(document).on("click", ".edit-product", function () {
  // find the parent <tr> of the clicked button
  const row = $(this).closest("tr");

  // read data from attributes
  const id = row.data("id");
  const name = row.data("name");
  const price = row.data("price");
  const left = row.data("left");
  const collection = row.data("collection");
  const size = row.data("size");
  const volume = row.data("volume");
  const desc = row.data("desc");
  const images = row.data("images");

  // fill the form fields
  $(".product-name").val(name);
  $(".product-price").val(price);
  $(".product-left-count").val(left);
  $(".product-collection").val(collection);
  $(".product-desc").val(desc || "");

  renderImagesToForm(images);

  // toggle between size/volume fields
  if (collection === "DRINK") {
    $("#product-collection").hide();
    $("#product-volume").show();
    $(".product-volume").val(volume);
  } else {
    $("#product-volume").hide();
    $("#product-collection").show();
    $(".product-size").val(size);
  }

  // store product id for saving later
  $(".dish-container").data("id", id);

  // change button text → Save
  $("#create-btn").text("Save").addClass("update-mode");

  // ✅ SHOW the form (instead of waiting for New Product button)
  $(".dish-container").slideDown(300);
  $("#process-btn").css("display", "none");

  // scroll to the form
  $("html, body").animate(
    {
      scrollTop: $(".dish-container").offset().top,
    },
    500
  );
});

// Save (update) product
$(document).on("click", "#create-btn.update-mode", async function (e) {
  e.preventDefault();

  const id = $(".dish-container").data("id");

  const updatedProduct = {
    productName: $(".product-name").val(),
    productPrice: $(".product-price").val(),
    productLeftCount: $(".product-left-count").val(),
    productCollection: $(".product-collection").val(),
    productSize: $(".product-size").val(),
    productVolume: $(".product-volume").val(),
    productDesc: $(".product-desc").val(),
    productStatus: $(".product-status").val(),
  };

  try {
    const response = await axios.post(`/admin/product/${id}`, updatedProduct);
    const result = response.data.product;

    if (result) {
      // alert("Product updated successfully!");

      // Update table row
      const row = $(`#row-${id}`);
      row.find(".product-name-cell").text(result.productName);
      row.find(".product-collection-cell").text(result.productCollection);
      row
        .find(".product-volume-cell")
        .text(
          result.productCollection === "DRINK"
            ? result.productVolume
            : result.productSize
        );
      row.find(".product-price-cell").text(result.productPrice);
      row.find(".product-left-cell").text(result.productLeftCount);

      // Reset form
      $(".dish-container")[0].reset();
      $("#create-btn").text("Create").removeClass("update-mode");
      $(".dish-container").removeData("id");

      $(".dish-container").slideUp(200);
      $("#process-btn").css("display", "flex");
    } else {
      alert("Product update failed");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Product update failed");
  }
});

///////////////////////////////
function validateForm() {
  const productName = $(".product-name").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productDesc = $(".product-desc").val(),
    productCollection = $(".product-collection").val(),
    productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productDesc === "" ||
    productCollection === "" ||
    productStatus === ""
  ) {
    alert("Please insert all details");
    return false;
  } else return true;
}

function previewFileHandler(input, order) {
  const imgClassName = input.className;
  const file = $(`.${imgClassName}`).get(0).files[0];

  if (!file) return;

  const fileType = file["type"],
    validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpg,jpeg and png!");
  } else {
    const reader = new FileReader();
    reader.onload = function () {
      $(`#image-section-${order}`).attr("src", reader.result);
    };
    reader.readAsDataURL(file);
  }
}
