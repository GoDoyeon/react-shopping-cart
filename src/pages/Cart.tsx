import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTrash,
	faMinus,
	faPlus,
	faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import useCartStore from '../stores/useCartStore'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
	const navigate = useNavigate()

	const {
		cartList: cartItems,
		updateQuantity,
		removeFromCart,
		clearCart,
	} = useCartStore()

	const getTotalPrice = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		)
	}

	const getTotalItems = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0)
	}

	return (
		<div className="min-h-screen py-8 ">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex items-center gap-3 mb-8">
					<FontAwesomeIcon
						icon={faShoppingCart}
						className="text-2xl"
						style={{ color: 'var(--color-primary-700)' }}
					/>
					<h1 className="text-3xl font-bold text-gray-800">장바구니</h1>
					<span className="text-gray-500">({getTotalItems()}개)</span>
				</div>

				{cartItems.length === 0 ? (
					<div className="text-center py-16">
						<FontAwesomeIcon
							icon={faShoppingCart}
							className="text-6xl text-gray-300 mb-4"
						/>
						<h2 className="text-2xl font-semibold text-gray-600 mb-2">
							장바구니가 비어있습니다
						</h2>
						<p className="text-gray-500 mb-6">상품을 추가해보세요!</p>
						<button
							className="bg-primary-700 text-white px-6 py-3 rounded-lg"
							onClick={() => navigate('/products')}
						>
							쇼핑 계속하기
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-4">
							{cartItems.map((item) => (
								<div
									key={item.id}
									className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
								>
									<div className="flex gap-4">
										<div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
											<img
												src={item.image}
												alt={item.title}
												className="w-full h-full object-contain p-2"
											/>
										</div>

										<div className="flex-1 min-w-0 flex flex-col justify-between">
											<h3 className="font-medium text-start text-gray-800 line-clamp-2">
												{item.title}
											</h3>

											<div className="flex items-center gap-3">
												<div className="flex items-center border border-gray-300 rounded-md">
													<button
														onClick={() =>
															updateQuantity(item.id, item.quantity - 1)
														}
														className="p-1 hover:bg-gray-100 transition-colors rounded-l-md"
													>
														<FontAwesomeIcon
															icon={faMinus}
															className="text-gray-600"
															size="sm"
														/>
													</button>
													<span className="px-3 py-1 text-gray-800 font-medium min-w-[3rem] text-center">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															updateQuantity(item.id, item.quantity + 1)
														}
														className="p-1 hover:bg-gray-100 transition-colors rounded-r-md"
													>
														<FontAwesomeIcon
															icon={faPlus}
															className="text-gray-600"
															size="sm"
														/>
													</button>
												</div>

												<button
													onClick={() => removeFromCart(item.id)}
													className="p-1 bg-gray-100 border-gray-300 border rounded-md"
												>
													<FontAwesomeIcon
														icon={faTrash}
														className="text-gray-500"
														size="sm"
													/>
												</button>
											</div>
										</div>

										{/* 가격 */}
										<div className="text-right">
											<div className="text-lg font-bold text-blue-600 mb-1">
												${(item.price * item.quantity).toFixed(2)}
											</div>
											<div className="text-sm text-gray-500">
												${item.price} × {item.quantity}
											</div>
										</div>
									</div>
								</div>
							))}

							<div className="flex justify-end">
								<button
									onClick={clearCart}
									className="p-1 text-gray-500 border-gray-300 border rounded-md flex items-center gap-1"
								>
									<FontAwesomeIcon
										icon={faTrash}
										className="text-gray-500"
										size="sm"
									/>
									장바구니 비우기
								</button>
							</div>
						</div>

						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-8">
								<h2 className="text-xl font-semibold text-gray-800 mb-4">
									주문 요약
								</h2>

								<div className="space-y-3 mb-6">
									<div className="flex justify-between text-gray-600">
										<span>상품 수량</span>
										<span>{getTotalItems()}개</span>
									</div>
									<div className="flex justify-between text-gray-600">
										<span>상품 금액</span>
										<span>${getTotalPrice().toFixed(2)}</span>
									</div>
									<hr className="border-gray-200" />
									<div className="flex justify-between text-lg font-bold text-gray-800">
										<span>총 결제금액</span>
										<span>${getTotalPrice().toFixed(2)}</span>
									</div>
								</div>

								<button className="w-full bg-primary-700 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
									주문하기
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
