let selectedRow = null;

// Tiết 3 – Hiển thị thông báo
function thongBao(message) {
  const tb = document.getElementById("thongBao");
  tb.innerText = message;
  setTimeout(() => (tb.innerText = ""), 3000);
}

// Tiết 2 – Thêm dòng vào bảng
function themSinhVien(sv) {
  const table = document.getElementById("bangSinhVien").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  newRow.insertCell(0).innerText = sv.maSV;
  newRow.insertCell(1).innerText = sv.hoTen;
  newRow.insertCell(2).innerText = sv.gioiTinh;
  newRow.insertCell(3).innerText = sv.ngaySinh;
  newRow.insertCell(4).innerText = sv.khoa;
  newRow.insertCell(5).innerText = sv.chuyenNganh;
  newRow.insertCell(6).innerHTML = `
    <button onclick="suaDong(this)" class="btn btn-warning btn-sm me-1">Sửa</button>
    <button onclick="xoaDong(this)" class="btn btn-danger btn-sm">Xoá</button>`;
}

// Tiết 4 – Xoá dòng
function xoaDong(btn) {
  if (confirm("Bạn có chắc chắn muốn xoá?")) {
    btn.parentElement.parentElement.remove();
    thongBao("Xoá thành công!");
  }
}

// Tiết 6 – Sửa dòng
function suaDong(btn) {
  selectedRow = btn.parentElement.parentElement;
  document.getElementById("maSV").value = selectedRow.cells[0].innerText;
  document.getElementById("hoTen").value = selectedRow.cells[1].innerText;
  document.getElementById("gioiTinh").value = selectedRow.cells[2].innerText;
  document.getElementById("ngaySinh").value = selectedRow.cells[3].innerText;
  document.getElementById("khoa").value = selectedRow.cells[4].innerText;
  document.getElementById("chuyenNganh").value = selectedRow.cells[5].innerText;
}

// Tiết 6 – Cập nhật dòng
function capNhatSinhVien() {
  if (selectedRow) {
    selectedRow.cells[0].innerText = document.getElementById("maSV").value;
    selectedRow.cells[1].innerText = document.getElementById("hoTen").value;
    selectedRow.cells[2].innerText = document.getElementById("gioiTinh").value;
    selectedRow.cells[3].innerText = document.getElementById("ngaySinh").value;
    selectedRow.cells[4].innerText = document.getElementById("khoa").value;
    selectedRow.cells[5].innerText = document.getElementById("chuyenNganh").value;
    thongBao("Cập nhật thành công!");
    document.getElementById("formSV").reset();
    selectedRow = null;
  }
}

// Tiết 5 – Xác thực đầu vào
function kiemTraDauVao(sv) {
  if (
    !sv.maSV.trim() ||
    !sv.hoTen.trim() ||
    !sv.gioiTinh ||
    !sv.ngaySinh ||
    !sv.khoa.trim() ||
    !sv.chuyenNganh.trim()
  ) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return false;
  }
  return true;
}

// Tiết 1 + Thêm sự kiện submit
document.getElementById("formSV").addEventListener("submit", function (e) {
  e.preventDefault();

  const sv = {
    maSV: document.getElementById("maSV").value,
    hoTen: document.getElementById("hoTen").value,
    gioiTinh: document.getElementById("gioiTinh").value,
    ngaySinh: document.getElementById("ngaySinh").value,
    khoa: document.getElementById("khoa").value,
    chuyenNganh: document.getElementById("chuyenNganh").value,
  };

  if (kiemTraDauVao(sv)) {
    themSinhVien(sv);
    thongBao("Thêm sinh viên thành công!");
    document.getElementById("formSV").reset();
  }
});
