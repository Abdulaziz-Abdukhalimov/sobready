console.log("Users frontend javascript file");

$(".member-status").on("change", async function (e) {
  const id = e.target.id,
    memberStatus = $(`#${id}.member-status`).val();

  try {
    const response = await axios.post(`/admin/user/edit/${id}`, {
      memberStatus: memberStatus,
    });
    console.log("responsedata:", response);
    const result = response.data;
    if (result.data) {
      console.log("User updated");
      $(".member-status").blur();
    } else {
      alert("user update failed");
    }
  } catch (err) {
    console.log(err);
    alert("user update failed");
  }
});

function updateSelectColor(select) {
  // Remove old classes
  select.classList.remove("active", "block");

  // Add new class based on selected value
  if (select.value === "ACTIVE") {
    select.classList.add("active");
  } else if (select.value === "BLOCK") {
    select.classList.add("block");
  } else if (select.value === "DELETE") {
    select.classList.add("delete");
  }
}

// Run once at page load for initial colors
document.querySelectorAll(".spec-select").forEach((select) => {
  updateSelectColor(select);
});
