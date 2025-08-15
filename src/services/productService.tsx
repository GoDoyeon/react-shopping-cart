import axios from 'axios'
import type { ProductResponseData } from '../types/product'

const API_URL = 'https://fakestoreapi.com/products'

export const getProducts = async (): Promise<ProductResponseData[]> => {
	try {
		const res = await axios.get<ProductResponseData[]>(API_URL)
		return res.data
	} catch (error) {
		console.error('상품 목록 불러오기 실패:', error)
		throw error
	}
}
