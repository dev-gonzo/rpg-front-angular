export function formatDateToISO(date: string | Date | null | undefined): string {
  if (!date) return '';

  let parsed: Date;

  if (typeof date === 'string') {
    // Remove qualquer não-dígito
    const digits = date.replace(/\D/g, '');

    if (digits.length === 8) {
      // Trata formato ddMMyyyy
      const day = parseInt(digits.slice(0, 2), 10);
      const month = parseInt(digits.slice(2, 4), 10) - 1; // mês 0-based
      const year = parseInt(digits.slice(4, 8), 10);
      parsed = new Date(year, month, day);
    } else if (date.includes('/')) {
      // Trata formato dd/MM/yyyy
      const [d, m, y] = date.split('/');
      parsed = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    } else {
      // Tenta parsear formatos ISO ou outros válidos
      parsed = new Date(date);
    }
  } else {
    parsed = date;
  }

  // Garante que a data é válida
  if (isNaN(parsed.getTime())) return '';

  return parsed.toISOString().split('T')[0]; // yyyy-MM-dd
}
