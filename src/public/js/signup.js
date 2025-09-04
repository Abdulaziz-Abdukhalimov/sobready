console.log("Signup frontend javascript file");
function validateSignupForm() {
  const memberNick = $(".member-nick").val(),
    memberPhone = $(".member-phone").val(),
    memberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs , please check your password!");
    return false;
  }

  // const memberImage = $(".member-image").get(0)?.files[0]?.name
  //   ? $(".member-image").get(0).files[0].name
  //   : null;

  // const imageInput = $(".member-image").get(0);
  // const memberImage =
  //   imageInput && imageInput.files.length > 0 ? imageInput.files[0].name : null;

  // if (!memberImage) {
  //   alert("Please insert restaurant image!");
  //   return false;
  // }
  return true;
}
