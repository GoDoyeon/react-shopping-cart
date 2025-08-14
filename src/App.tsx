import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'

function App() {
	return (
		<>
			<Router>
				<Header />
				{/* 고정 헤더 높이만큼 상단 패딩을 주어 콘텐츠가 가려지지 않도록 처리
				   기본 패딩은 p-4 기준 대략 64px 내외가 되도록 pt-16 적용 */}
				<div className="pt-16">
					<Routes>
						<Route path="/" element={<Home />} />
						{/* <Route path="/cart" element={<Cart />} /> */}
					</Routes>
				</div>
			</Router>
		</>
	)
}

export default App
