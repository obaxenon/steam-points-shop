
import React from 'react';

interface Package {
  title: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;
}

interface StructuredDataProps {
  packages: Package[];
  activeSection: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ packages, activeSection }) => {
  const getSchemaForSection = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SteamPoints.shop",
      "url": "https://steampoints.shop",
      "description": "Get Steam Points delivered instantly to your profile through Steam's official award system"
    };

    switch (activeSection) {
      case 'products':
      case 'featured':
        return [
          baseSchema,
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Steam Points Packages",
            "description": "Premium Steam Points packages delivered through Steam's official award system",
            "brand": {
              "@type": "Brand",
              "name": "SteamPoints.shop"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "95000",
              "bestRating": "5",
              "worstRating": "1"
            },
            "offers": packages.map(pkg => ({
              "@type": "Offer",
              "name": pkg.title,
              "price": pkg.price.replace('$', ''),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2024-12-31"
            }))
          }
        ];

      case 'testimonials':
        return [
          baseSchema,
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Steam Points Delivery Service",
            "description": "Professional Steam Points delivery service with 95,000+ satisfied customers",
            "provider": {
              "@type": "Organization",
              "name": "SteamPoints.shop"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "95000",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "GamerX92"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Amazing service! Got my Steam Points instantly and my profile looks incredible now."
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "DinoRush"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Fast delivery and great customer support. Highly recommend!"
              }
            ]
          }
        ];

      case 'how-it-works':
        return [
          baseSchema,
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do Steam Points get delivered?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Steam Points are delivered to your profile as awards through Steam's official award system. You'll receive the equivalent point value through various Steam awards applied to your screenshots, artworks, or other profile content."
                }
              },
              {
                "@type": "Question",
                "name": "How long does delivery take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Delivery is typically instant to within a few minutes. Our automated system processes orders 24/7 for the fastest possible delivery."
                }
              },
              {
                "@type": "Question",
                "name": "What are the requirements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You need to have the minimum number of screenshots or artworks uploaded to your Steam profile as specified in each package. This is where the awards (and thus points) will be delivered."
                }
              }
            ]
          }
        ];

      default:
        return [baseSchema];
    }
  };

  const schemas = getSchemaForSection();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  );
};

export default StructuredData;
