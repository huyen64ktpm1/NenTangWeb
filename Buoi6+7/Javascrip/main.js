document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const errorDiv = document.getElementById("error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !email || !address || !phone) {
      errorDiv.innerHTML = `<div class="alert alert-danger p-2">❗ Vui lòng điền đầy đủ thông tin.</div>`;
      return;
    }

    if (!/^0\\d{9}$/.test(phone)) {
      errorDiv.innerHTML = `<div class="alert alert-warning p-2">❗ Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.</div>`;
      return;
    }

    errorDiv.innerHTML = "";
    alert("✅ Dữ liệu hợp lệ. Thêm thành công!");
    form.reset();

    const modalElement = document.getElementById("addModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
  });
});
