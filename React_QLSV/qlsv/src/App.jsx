import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { maSV: '123456', hoTen: 'Nguyễn Thị Thanh Huyền', ngaySinh: '2004-03-06', lop: '64KTPM1' },
    { maSV: '123455', hoTen: 'Nguyễn Thị Thanh', ngaySinh: '2004-05-06', lop: '64KTPM1' }
  ]);

  const [form, setForm] = useState({
    maSV: '',
    hoTen: '',
    ngaySinh: '',
    lop: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'Không được để trống';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStudents([...students, form]);
    setForm({ maSV: '', hoTen: '', ngaySinh: '', lop: '' });
    setErrors({});
  };

  return (
    <div className="toan-bo">
      <div className="cot cot-trai">
        <h2>Thêm sinh viên</h2>
        <form onSubmit={handleSubmit}>
          <label>Mã Sinh Viên:</label>
          <input
            type="text"
            name="maSV"
            value={form.maSV}
            onChange={handleChange}
            placeholder="Nhập mã sinh viên..."
          />
          {errors.maSV && <div className="error-text">{errors.maSV}</div>}

          <label>Họ và Tên:</label>
          <input
            type="text"
            name="hoTen"
            value={form.hoTen}
            onChange={handleChange}
            placeholder="Nhập họ và tên..."
          />
          {errors.hoTen && <div className="error-text">{errors.hoTen}</div>}

          <label>Ngày Sinh:</label>
          <input
            type="date"
            name="ngaySinh"
            value={form.ngaySinh}
            onChange={handleChange}
          />
          {errors.ngaySinh && <div className="error-text">{errors.ngaySinh}</div>}

          <label>Lớp:</label>
          <input
            type="text"
            name="lop"
            value={form.lop}
            onChange={handleChange}
            placeholder="Nhập lớp..."
          />
          {errors.lop && <div className="error-text">{errors.lop}</div>}

          <button type="submit">Thêm sinh viên</button>
        </form>
      </div>

      <div className="cot">
        <h2>Danh sách sinh viên</h2>
        <table>
          <thead>
            <tr>
              <th>Mã Sinh Viên</th>
              <th>Họ và tên</th>
              <th>Ngày Sinh</th>
              <th>Lớp</th>
            </tr>
          </thead>
          <tbody>
            {students.map((sv, index) => (
              <tr key={index}>
                <td>{sv.maSV}</td>
                <td>{sv.hoTen}</td>
                <td>{new Date(sv.ngaySinh).toLocaleDateString('vi-VN')}</td>
                <td>{sv.lop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;