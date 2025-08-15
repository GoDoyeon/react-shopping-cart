import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate()

	return (
		<header className="fixed top-0 inset-x-0 z-50 w-full bg-gray-100 flex justify-between p-4">
			<h2
				className="text-xl font-bold text-primary-700 cursor-pointer"
				onClick={() => navigate('/products')}
			>
				Shopping Mall
			</h2>

			<div className="flex items-center gap-4">
				<button
					className="rounded-md p-1 bg-white"
					onClick={() => navigate('/cart')}
				>
					<FontAwesomeIcon
						icon={faCartShopping}
						style={{ color: 'var(--color-primary-700)' }}
					/>
				</button>
			</div>
		</header>
	)
}

export default Header
