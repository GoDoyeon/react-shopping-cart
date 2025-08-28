import type { ProductResponseData } from '../../types/product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBookmark,
	faEye,
	faStar,
	faCartShopping,
} from '@fortawesome/free-solid-svg-icons'
import useBookmarkStore from '../../stores/useBookmarkStore'
import useCartStore from '../../stores/useCartStore'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type Props = {
	product: ProductResponseData
}

const ProductCard = ({ product }: Props) => {
	const { bookmarkList, toggleBookmark } = useBookmarkStore()
	const { addToCart, cartList } = useCartStore()
	const navigate = useNavigate()

	const isInCart = useMemo(() => {
		return cartList.some((item) => item.id === product.id)
	}, [cartList, product.id])

	const handleAddToCart = useCallback(() => {
		if (isInCart) {
			navigate('/cart')
		} else {
			addToCart(product)
			toast.success('장바구니에 상품이 추가되었습니다!')
		}
	}, [product, addToCart, navigate, isInCart])

	return (
		<li
			className="bg-white rounded-lg p-4 flex flex-col shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
			id={`card-${product.id}`}
		>
			<div className="relative mb-3">
				<button
					onClick={() => toggleBookmark(product.id)}
					className="absolute top-3 right-3 z-10 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
				>
					<FontAwesomeIcon
						icon={faBookmark}
						className={`transition-all duration-300 ease-in-out ${
							bookmarkList?.includes(product.id)
								? 'text-primary scale-110 drop-shadow-lg'
								: 'text-gray-400 hover:text-gray-600'
						}`}
						style={{
							color: bookmarkList?.includes(product.id)
								? 'var(--color-primary)'
								: 'var(--color-gray-400)',
						}}
					/>
				</button>

				<div className="h-[10em] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
					<img
						src={product.image}
						alt={product.title}
						className="w-full h-full object-contain p-2"
					/>
				</div>
			</div>

			<div className="flex flex-col justify-between">
				<div className="text-sm text-start text-ellipsis overflow-hidden whitespace-nowrap mb-3">
					{product.title}
				</div>

				<div className="flex justify-between items-center mb-3">
					<div className="text-lg font-bold text-primary-700">
						${product.price}
					</div>

					<div className="flex gap-3 text-xs text-gray-600">
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faStar}
								className="text-yellow-400"
								size="sm"
							/>
							<span>{product.rating.rate}</span>
						</div>
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faEye}
								className="text-gray-400"
								size="sm"
							/>
							<span>{product.rating.count}</span>
						</div>
					</div>
				</div>

				<button
					onClick={handleAddToCart}
					className="w-full bg-primary text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2 font-medium"
				>
					<FontAwesomeIcon icon={faCartShopping} size="sm" />
					{isInCart ? '장바구니 이동' : '장바구니 담기'}
				</button>
			</div>
		</li>
	)
}

export default ProductCard
