import { memo, useState } from "react";
import dynamic from 'next/dynamic'
import lodash from 'lodash'
import { AddProductToWishlistProps } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import("./AddProductToWishlist").then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  },
  onAddToWishList: (id: number) => void;
}

export const ProductItemComponent = ({ product, onAddToWishList }: ProductItemProps) => {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      {isAddingToWishList && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})