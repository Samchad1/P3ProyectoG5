function addDonation(entry) {
  const donors = JSON.parse(localStorage.getItem('donors') || '[]');
  donors.push(entry);
  localStorage.setItem('donors', JSON.stringify(donors));
}

function renderDonations() {
  const tbody = document.querySelector('#donor-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const donors = JSON.parse(localStorage.getItem('donors') || '[]');
  donors.forEach(d => {
    const tr = document.createElement('tr');
    const nombre = d.nombre || 'Anónima';
    const seccion = d.seccion || '';
    const organizacion = d.organizacion || '';
    const monto = Number(d.monto || 0).toFixed(2);
    tr.innerHTML = `<td>${nombre}</td><td>${seccion}</td><td>${organizacion}</td><td>$${monto}</td>`;
    tbody.appendChild(tr);
  });
}
