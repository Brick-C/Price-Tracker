export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const match = priceText.match(/([0-9]+(\.[0-9]+)?)/);
      if (match) {
        return match[0];
      }
    }
  }

  return "";
}
