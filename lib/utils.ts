export function extractPrice(...elements: any) {
  for (const element of elements) {
    let priceText = element.text().trim()

    if(priceText) {
      // Remove todos os caracteres não numéricos, exceto vírgulas e pontos
      priceText = priceText.replace(/[^\d.,]/g, '')

      // Substitui vírgulas por pontos para compatibilidade com parseFloat
      priceText = priceText.replace(/,/g, '.')

      // Converte o texto do preço em um número
      const price = parseFloat(priceText)

      // Formata o preço como uma string de moeda
      // const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

      return price
    }
  }

  return ''
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1)

  return currencyText ? currencyText : ''
}

// Extracts description from two possible elements from amazon
export function extractDescription($: any) {
  // these are possible elements holding description of the product
  const selectors = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  // If no matching elements were found, return an empty string
  return "";
}