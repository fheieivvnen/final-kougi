document.addEventListener('DOMContentLoaded', function() {
  const table = document.getElementById('sort-hyou');
  const tbody = table.querySelector('tbody');
  document.querySelectorAll('#sort-hyou th[data-sort]').forEach(header => {
    header.addEventListener('click', function() {
      sortTable(this);
    });
  });
  calculateTotals();
  function sortTable(header) {
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = Array.from(header.parentNode.children).indexOf(header);
    const currentDir = header.getAttribute('data-sort-direction') || 'asc';
    const newDir = currentDir === 'asc' ? 'desc' : 'asc';
    document.querySelectorAll('#sort-hyou th').forEach(th => {
      th.removeAttribute('data-sort-direction');
    });
    header.setAttribute('data-sort-direction', newDir);
    rows.sort((rowA, rowB) => {
      const aText = rowA.cells[columnIndex].textContent.trim();
      const bText = rowB.cells[columnIndex].textContent.trim();
      const aIsEmpty = aText === '-' || aText === '';
      const bIsEmpty = bText === '-' || bText === '';
      if (aIsEmpty && bIsEmpty) return 0;
      if (aIsEmpty) return 1;  
      if (bIsEmpty) return -1; 
      const valA = parseFloat(aText);
      const valB = parseFloat(bText);
      return (newDir === 'asc' ? 1 : -1) * (valA - valB);
    });
    rows.forEach(row => tbody.appendChild(row));
  }
  function calculateTotals() {
    const rows = tbody.querySelectorAll('tr');
    let rateSum = 0, rateCount = 0;
    let hitsSum = 0, hrSum = 0, rbiSum = 0;
    let sbSum = 0, shSum = 0, bbSum = 0, soSum = 0;
    rows.forEach(row => {
      const cells = row.cells;
      const rateVal = parseFloat(cells[3].textContent.trim());
      if (!isNaN(rateVal)) {
        rateSum += rateVal;
        rateCount++;
      }
      const getNum = (index) => {
        const val = parseFloat(cells[index].textContent.trim());
        return isNaN(val) ? 0 : val;
      };
      hitsSum += getNum(4);
      hrSum   += getNum(5);
      rbiSum  += getNum(6);
      sbSum   += getNum(7);
      shSum   += getNum(8);
      bbSum   += getNum(9);
      soSum   += getNum(10);
    });
    const avgRate = rateCount > 0 ? (rateSum / rateCount).toFixed(3).replace(/^0/, '') : '-';
    document.getElementById('avg-rate').textContent = avgRate;
    document.getElementById('sum-hits').textContent = hitsSum;
    document.getElementById('sum-hr').textContent = hrSum;
    document.getElementById('sum-rbi').textContent = rbiSum;
    document.getElementById('sum-sb').textContent = sbSum;
    document.getElementById('sum-sh').textContent = shSum;
    document.getElementById('sum-bb').textContent = bbSum;
    document.getElementById('sum-so').textContent = soSum;
  }
});