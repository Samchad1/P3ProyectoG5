function addDonation(entry) {
  const donors = JSON.parse(localStorage.getItem('donors') || '[]');
  entry.nombre = entry.nombre && entry.nombre.trim() ? entry.nombre.trim() : 'Anónima';
  entry.fecha = entry.fecha || new Date().toISOString().split('T')[0];
  const monto = parseFloat(entry.monto);
  if (isNaN(monto) || monto <= 0) return;
  entry.monto = monto;
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
      const seccion = d.seccion || 'No proviene de sección';
      const organizacion = d.organizacion || 'No proviene de organización';
      const monto = Number(d.monto || 0).toFixed(2);
      const fecha = d.fecha || new Date().toISOString().split('T')[0];
      tr.innerHTML = `<td>${nombre}</td><td>${seccion}</td><td>${organizacion}</td><td>$${monto}</td><td>${fecha}</td>`;
      tbody.appendChild(tr);
    });
}
