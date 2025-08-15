import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Products from './pages/Products'
import Cart from './pages/Cart'

function App() {
	return (
		<>
			<Router>
				<Header />
				<div className="pt-16">
					<Routes>
						<Route path="/products" element={<Products />} />
						<Route path="/cart" element={<Cart />} />
					</Routes>
				</div>
			</Router>
		</>
	)
}

export default App
