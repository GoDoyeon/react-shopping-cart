import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast'

function App() {
	return (
		<>
			<Router>
				<Header />
				<div className="min-w-[50rem] mx-auto pt-16">
					<Routes>
						<Route path="/products" element={<Products />} />
						<Route path="/cart" element={<Cart />} />
					</Routes>
				</div>
			</Router>
			<Toaster
				position="bottom-center"
				toastOptions={{
					duration: 3000,
					style: {
						background: '#363636',
						color: '#fff',
					},
				}}
			/>
		</>
	)
}

export default App
