// script.js — chỉ xử lý load bảng & Thêm mới với validation
window.addEventListener('DOMContentLoaded', () => {
  const data = [...employees];
  const tbody = document.getElementById('data-body');
  const form  = document.getElementById('employeeForm');

  // 1. Render lại bảng
  function renderTable() {
    tbody.innerHTML = data.map((item, idx) => `
      <tr>
        <td class="text-center">
          <button class="btn btn-sm text-dark"><i class="fas fa-chevron-down"></i></button>
        </td>
        <td class="text-center">
          <button class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
        </td>
        <td>${idx + 1}</td>
        <td>${item.firstName}</td>
        <td>${item.middleName}</td>
        <td>${item.address}</td>
        <td>
          ${item.active
            ? '<i class="fas fa-check text-success"></i>'
            : '<i class="fas fa-times text-danger"></i>'}
        </td>
      </tr>
    `).join('');
    // Cập nhật info (tạm 1 trang)
    document.getElementById('result-info').textContent = `Kết quả ${data.length} trong 1 trang`;
  }

  // 2. Xử lý submit Form Thêm Nhân viên
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fn = form.firstName.value.trim();
    const mn = form.middleName.value.trim();
    const ad = form.address.value.trim();
    let valid = true;

    // Xóa lỗi cũ
    ['firstName','middleName','address'].forEach(id =>
      document.getElementById(id + '-error').textContent = ''
    );

    // Validate Tên
    if (!fn) {
      document.getElementById('firstName-error').textContent = 'Tên không được bỏ trống.';
      valid = false;
    } else if (fn.length > 15) {
      document.getElementById('firstName-error').textContent = 'Tên không được quá 15 ký tự.';
      valid = false;
    }
    // Validate Họ đệm
    if (!mn) {
      document.getElementById('middleName-error').textContent = 'Họ đệm không được bỏ trống.';
      valid = false;
    } else if (mn.length > 20) {
      document.getElementById('middleName-error').textContent = 'Họ đệm không được quá 20 ký tự.';
      valid = false;
    }
    // Validate Địa chỉ
    if (!ad) {
      document.getElementById('address-error').textContent = 'Địa chỉ không được bỏ trống.';
      valid = false;
    } else if (ad.length > 50) {
      document.getElementById('address-error').textContent = 'Địa chỉ không được quá 50 ký tự.';
      valid = false;
    }

    if (!valid) return;

    // Thêm mới & render lại
    data.push({ firstName: fn, middleName: mn, address: ad, active: true });
    renderTable();

    // Reset và đóng modal
    form.reset();
    $('#addModal').modal('hide');
  });

  // 3. Khởi tạo
  renderTable();
});
