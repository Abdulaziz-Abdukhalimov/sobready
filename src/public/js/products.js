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

// Update product logic
$(document).ready(function () {
  // Edit button
  $(document).on("click", ".edit-product", async function () {
    const id = $(this).data("id"); // product id

    try {
      const response = await axios.get(`/admin/product/${id}`);
      const product = response.data.product;

      // Fill form
      $(".product-name").val(product.productName);
      $(".product-price").val(product.productPrice);
      $(".product-left-count").val(product.productLeftCount);
      $(".product-collection").val(product.productCollection);
      $(".product-desc").val(product.productDesc || "");

      if (product.productCollection === "DRINK") {
        $("#product-collection").hide();
        $("#product-volume").show();
        $(".product-volume").val(product.productVolume);
      } else {
        $("#product-volume").hide();
        $("#product-collection").show();
        $(".product-size").val(product.productSize);
      }

      // Store id
      $(".dish-container").data("id", id);

      // Switch button to Save mode
      $("#create-btn").text("Save").addClass("update-mode");

      // Show form
      $(".dish-container").slideDown(500);
      $("#process-btn").hide();

      $("html, body").animate(
        { scrollTop: $(".dish-container").offset().top },
        500
      );
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product for editing.");
    }
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
        alert("Product updated successfully!");

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
