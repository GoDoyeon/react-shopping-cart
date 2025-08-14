import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route path="/cart" element={<Cart />} /> */}
				</Routes>
			</Router>
		</>
	)
}

export default App
