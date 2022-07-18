export default function priceFormat(data: number): string {
  return data.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
