import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import type { ProductResponseData } from '../types/product'
import ProductCard from '../components/product/ProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import useBookmarkStore from '../stores/useBookmarkStore'
import CommonLayout from '../components/layout/CommonLayout'

const Products = () => {
	const [products, setProducts] = useState<ProductResponseData[]>([])
	const [loading, setLoading] = useState(true)

	const [searchValue, setSearchValue] = useState('')
	const [category, setCategory] = useState('')
	const [originalProducts, setOriginalProducts] = useState<
		ProductResponseData[]
	>([])
	const { bookmarkList } = useBookmarkStore()

	const fetchProducts = async () => {
		try {
			const res = await getProducts()
			setProducts(res)
			setOriginalProducts(res)
		} catch (error) {
			console.error('상품 목록 불러오기 실패:', error)
		}
	}

	const sortByBookmark = (productList: ProductResponseData[]) => {
		return [...productList].sort((a, b) => {
			const aIsBookmarked = bookmarkList.includes(a.id)
			const bIsBookmarked = bookmarkList.includes(b.id)

			if (aIsBookmarked && !bIsBookmarked) return -1
			if (!aIsBookmarked && bIsBookmarked) return 1
			return 0
		})
	}

	const sortByCategory = (productList: ProductResponseData[]) => {
		const sorted = [...productList]

		if (category === 'recommend') {
			sorted.sort((a, b) => a.id - b.id)
		} else if (category === 'rating') {
			sorted.sort((a, b) => b.rating.rate - a.rating.rate)
		} else if (category === 'views') {
			sorted.sort((a, b) => b.rating.count - a.rating.count)
		}

		return sorted
	}

	const handleSearch = () => {
		const filteredProducts = originalProducts.filter((product) =>
			product.title.includes(searchValue)
		)
		const categorySorted = sortByCategory(filteredProducts)
		setProducts(sortByBookmark(categorySorted))
	}

	const handleReset = () => {
		fetchProducts()
		setSearchValue('')
	}

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setCategory(value)

		const categorySorted = sortByCategory(originalProducts)
		setProducts(sortByBookmark(categorySorted))
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	useEffect(() => {
		if (products.length > 0) {
			const categorySorted = sortByCategory(originalProducts)
			setProducts(sortByBookmark(categorySorted))
		}
	}, [bookmarkList, category, originalProducts])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true) // 로딩 시작
				const data = await getProducts()
				setProducts(data)
			} catch (error) {
				console.error('상품을 불러오는데 실패했습니다:', error)
			} finally {
				setLoading(false) // 로딩 완료
			}
		}

		fetchProducts()
	}, [])

	return (
		<CommonLayout title="상품 목록" description="다양한 상품들을 둘러보세요">
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
			<div className="">
				{loading ? (
					<div className="flex items-center justify-center h-full ">
						<div className="flex flex-col items-center gap-4 w-full">
							<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
							<p className="text-gray-600 text-lg">상품을 불러오는 중...</p>
						</div>
					</div>
				) : (
					<div className="flex justify-center">
						{products.length === 0 ? (
							<div className="text-center text-gray-500 w-full py-16">
								<p>상품이 없습니다.</p>
							</div>
						) : (
							<ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
								{products.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</ol>
						)}
					</div>
				)}
			</div>
		</CommonLayout>
	)
}

export default Products
