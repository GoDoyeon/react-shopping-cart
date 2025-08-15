import type { ProductResponseData } from '../../types/product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons'

type Props = {
	product: ProductResponseData
}

const ProductCard = ({ product }: Props) => {
	return (
		<li
			className="bg-gray-100 rounded-lg p-4 w-[14em] h-[14em] flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
			id={`card-${product.id}`}
		>
			<div className="h-[8em] mb-2">
				<img
					src={product.image}
					alt={product.title}
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="flex flex-col justify-between">
				<span className="text-sm text-start text-ellipsis overflow-hidden whitespace-nowrap">
					{product.title}
				</span>
				<div className="flex justify-between items-center">
					<div className="text-md font-bold">{product.price} $</div>
					<div className="flex gap-2">
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faEye}
								className="text-gray-500"
								size="sm"
							/>
							<span className="text-sm">{product.rating.count}</span>
						</div>
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faStar}
								className="text-gray-500"
								size="sm"
							/>
							<span className="text-sm">{product.rating.rate}</span>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}

export default ProductCard
