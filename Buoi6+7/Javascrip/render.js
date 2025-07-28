document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("employeeTableBody");
  const pageSize = 5;
  let currentPage = 1;

  function renderTable(data, page = 1) {
    tableBody.innerHTML = "";
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageData = data.slice(start, end);

    pageData.forEach(emp => {
      tableBody.innerHTML += `
        <tr>
          <td><input type="checkbox" /></td>
          <td>${emp.name}</td>
          <td>${emp.email}</td>
          <td>${emp.address}</td>
          <td>${emp.phone}</td>
          <td>
            <i class="bi bi-pencil-fill text-warning"></i>
            <i class="bi bi-trash-fill text-danger ms-2"></i>
          </td>
        </tr>
      `;
    });
  }

  renderTable(employees, currentPage);
});
