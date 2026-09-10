export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount).replace(/\s+/g, ' ');
};

export const generateInvoiceId = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const randomStr = Math.floor(10000 + Math.random() * 90000);
  return `PJN-${year}${month}${day}-${randomStr}`;
};

export const generateVANumber = (bank: string): string => {
  const prefixMap: Record<string, string> = {
    bca_va: '88089',
    mandiri_va: '89001',
    bri_va: '12889',
  };
  const prefix = prefixMap[bank] || '88123';
  const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}${randomDigits}`;
};
