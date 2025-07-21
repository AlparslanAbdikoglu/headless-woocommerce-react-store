import React, { useEffect, useState } from 'react';
import ProductDetailPage, { Product } from './ProductDetailPage';

interface WooProductDetailContainerProps {
  productId: number;
}

const WooProductDetailContainer: React.FC<WooProductDetailContainerProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const consumerKey = import.meta.env.VITE_WOO_CONSUMER_KEY;
  const consumerSecret = import.meta.env.VITE_WOO_CONSUMER_SECRET;
  const storeUrl = 'https://api.lifeisnatural.eu';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${storeUrl}/wp-json/wc/v3/products/${productId}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`WooCommerce API error: ${res.statusText}`);
        }
        const data = await res.json();

        const productData: Product = {
          id: data.id,
          name: data.name,
          description: data.description,
          short_description: data.short_description,
          regular_price: data.regular_price,
          sale_price: data.sale_price,
          stock_quantity: data.stock_quantity,
          images: data.images || [],
          attributes: data.attributes || [],
        };

        setProduct(productData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <ProductDetailPage
      product={product}
      onAddToCart={() => {}}  // Pass empty function if addToCart not implemented yet
    />
  );
};

export default WooProductDetailContainer;
