export const eazypassSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Eazypass',
  description: 'A ticket management tool for developers and teams.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',   // Replace with actual average rating
    reviewCount: '0',     // Replace with actual review count
  },
  offers: {
    '@type': 'Offer',
    price: '0',           // Replace with actual price
    priceCurrency: 'USD',
  },
}
