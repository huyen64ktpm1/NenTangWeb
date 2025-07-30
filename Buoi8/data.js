// Khi DOM đã sẵn sàng
window.addEventListener('DOMContentLoaded', () => {
  // Dữ liệu mẫu
  const data = [
    { id: 1102, customer: "Võ Hoài An", staff: "Mai Thục Anh", amount: 250000, date: "06 Tháng 6 2024 9:00" },
    { id: 1199, customer: "Hoàng Thị Thắng", staff: "Nguyễn Văn Hồng", amount: 600000, date: "06 Tháng 6 2024 9:03" },
    { id: 1239, customer: "Nguyễn Huy Quang", staff: "Nguyễn Văn Hồng", amount: 934000, date: "06 Tháng 6 2024 9:10" },
    { id: 1677, customer: "Huỳnh Văn Nam", staff: "Mai Thục Anh", amount: 150000, date: "06 Tháng 6 2024 9:20" },
    { id: 1439, customer: "Nguyễn Hồng Minh", staff: "Mai Thục Anh", amount: 354000, date: "06 Tháng 6 2024 9:24" }
  ];

  // Định dạng ngày giờ
  function formatVietnameseDate(dateObj) {
    const d = dateObj.getDate();
    const m = dateObj.getMonth();
    const y = dateObj.getFullYear();
    const h = dateObj.getHours();
    const min = dateObj.getMinutes();
    const months = [
      "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
      "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"
    ];
    return `${d < 10 ? '0'+d : d} ${months[m]} ${y} ${h < 10 ? '0'+h : h}:${min < 10 ? '0'+min : min}`;
  }

  // Tạo một hàng
  function createTableRow(item) {
    return `
      <tr>
        <td class="text-center"><button class='btn btn-sm text-dark' onclick="deleteRow(${item.id})"><i class="fas fa-times"></i></button></td>
        <td class="text-center">
          <button class='btn btn-sm btn-primary'><i class="fas fa-eye"></i></button>
          <button class='btn btn-sm btn-warning'><i class="fas fa-edit"></i></button>
          <button class='btn btn-sm btn-danger' onclick="deleteRow(${item.id})"><i class="fas fa-trash"></i></button>
        </td>
        <td>${item.id}</td>
        <td>${item.customer}</td>
        <td>${item.staff}</td>
        <td>${item.amount.toLocaleString("vi-VN")}</td>
        <td>${item.date}</td>
      </tr>`;
  }

  // Load bảng
  function loadTable(dataArray = data) {
    document.getElementById("data-body").innerHTML = dataArray.map(createTableRow).join("");
  }

  // Xoá dòng
  window.deleteRow = function(id) {
    const idx = data.findIndex(item => item.id === id);
    if (idx !== -1 && confirm("Bạn có chắc chắn muốn xoá dòng này?")) {
      data.splice(idx, 1);
      loadTable();
    }
  }

  // Thêm giao dịch
  document.getElementById("addBtn").addEventListener("click", () => $('#addModal').modal('show'));
  document.getElementById("transactionForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const customer = this.customer.value.trim();
    const staff = this.staff.value.trim();
    const amount = this.amount.value.trim();
    const errCust = document.getElementById("customer-error");
    const errStaff = document.getElementById("staff-error");
    const errAmount = document.getElementById("amount-error");
    let valid = true;
    // Clear previous errors
    errCust.textContent = "";
    errStaff.textContent = "";
    errAmount.textContent = "";
    // Validate customer
    if (!customer) {
      errCust.textContent = "Khách hàng không được bỏ trống.";
      valid = false;
    } else if (customer.length > 30) {
      errCust.textContent = "Khách hàng không được vượt quá 30 ký tự.";
      valid = false;
    }
    // Validate staff
    if (!staff) {
      errStaff.textContent = "Nhân viên không được bỏ trống.";
      valid = false;
    } else if (staff.length > 30) {
      errStaff.textContent = "Nhân viên không được vượt quá 30 ký tự.";
      valid = false;
    }
    // Validate amount
    if (!amount) {
      errAmount.textContent = "Số tiền không được bỏ trống.";
      valid = false;
    } else if (isNaN(amount) || parseInt(amount) <= 0) {
      errAmount.textContent = "Số tiền phải là số lớn hơn 0.";
      valid = false;
    }
    if (!valid) return;
    // Nếu hợp lệ, tạo mới và thêm vào bảng
    const newItem = {
      id: data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1000,
      customer,
      staff,
      amount: parseInt(amount),
      date: formatVietnameseDate(new Date())
    };
    data.push(newItem);
    loadTable();
    alert("Thêm giao dịch thành công!");
    this.reset();
    $('#addModal').modal('hide');
  });

  // Tìm kiếm
  document.getElementById("searchBtn").addEventListener("click", () => {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const filtered = data.filter(item => item.customer.toLowerCase().includes(term));
    loadTable(filtered);
    document.getElementById("result-info").textContent = `Kết quả ${filtered.length} trong ${Math.ceil(data.length / parseInt(document.getElementById("resultSelect").value))} trang`;
  });

  // Khởi tạo
  loadTable();
});