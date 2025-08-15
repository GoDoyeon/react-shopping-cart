import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import type { ProductResponseData } from '../types/product'
import ProductCard from '../components/product/ProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

const Products = () => {
	const [products, setProducts] = useState<ProductResponseData[]>([])
	const [searchValue, setSearchValue] = useState('')
	const [category, setCategory] = useState('')
	const fetchProducts = async () => {
		try {
			const res = await getProducts()
			setProducts(res)
		} catch (error) {
			console.error('상품 목록 불러오기 실패:', error)
		}
	}

	const handleSearch = () => {
		setProducts(
			products.filter((product) => product.title.includes(searchValue))
		)
	}

	const handleReset = () => {
		fetchProducts()
		setSearchValue('')
	}

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setCategory(value)
		if (value === 'recommend') {
			setProducts(products.sort((a, b) => a.id - b.id))
		} else if (value === 'rating') {
			setProducts(products.sort((a, b) => b.rating.rate - a.rating.rate))
		} else if (value === 'views') {
			setProducts(products.sort((a, b) => b.rating.count - a.rating.count))
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<div className="p-4">
			<div className="flex gap-4 mb-4 justify-between">
				<div className="flex gap-2">
					<input
						type="text"
						placeholder="Search"
						className="border border-gray-300 rounded-md p-2"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<button onClick={handleSearch}>
						<FontAwesomeIcon icon={faSearch} style={{ color: 'black' }} />
					</button>
					<button onClick={handleReset}>
						<FontAwesomeIcon icon={faRotateLeft} style={{ color: 'black' }} />
					</button>
				</div>
				<select
					name="category"
					id="category"
					className="border border-gray-300 rounded-md p-2"
					onChange={handleCategoryChange}
					value={category}
				>
					<option value="recommend">추천순</option>
					<option value="rating">평점순</option>
					<option value="views">조회순</option>
				</select>
			</div>
			<div className="flex justify-center">
				{products.length === 0 ? (
					<div className="text-center text-gray-500 w-[40em] h-[30em] flex items-center justify-center">
						<p>상품이 없습니다.</p>
					</div>
				) : (
					<ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</ol>
				)}
			</div>
		</div>
	)
}

export default Products
