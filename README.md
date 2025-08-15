# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...

			// Remove tseslint.configs.recommended and replace with this
			...tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			...tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			...tseslint.configs.stylisticTypeChecked,

			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs['recommended-typescript'],
			// Enable lint rules for React DOM
			reactDom.configs.recommended,
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
])
```

## **프론트엔드 과제 테스트 문제**

### 📌 주제

**쇼핑몰 제품 목록 + 장바구니 + 주문 페이지 + 북마크 기능 구현**

---

### 1. 과제 설명

다음 요구사항에 맞춰 **React, Vue, 또는 순수 JS**로 쇼핑몰 UI를 구현하세요.

사용자는 제품 목록에서 상품을 장바구니에 담을 수 있고, 북마크 버튼을 이용해 관심 있는 상품을 저장할 수 있습니다.

북마크된 상품은 목록에서 **최상단**에 표시됩니다.

---

### 2. 구현 요구사항

### (1) 제품 목록 페이지 (`/products`)

- 주어진 API로부터 제품 데이터를 불러와 목록을 표시
- 각 제품 카드에 다음 정보 포함:
  - **이미지, 이름, 가격, 조회수, 평점, “장바구니 담기” 버튼, 북마크 버튼**
- **북마크 버튼**: 카드 우측 상단에 배치
  - 클릭 시 해당 상품 북마크 상태 토글
  - 북마크된 상품은 **빨간색 아이콘** 표시
  - 북마크 상태는 새로고침해도 유지(localStorage 활용)
- **정렬 규칙**: 북마크된 상품이 목록의 최상단에 오도록 정렬
- 반응형 그리드 (768px 이하에서는 1~2열)

### (2) 장바구니 페이지 (`/cart`)

- 장바구니에 담긴 제품 목록 표시 (이미지, 이름, 단가, 수량, 합계)
- 수량 변경 가능 (증가/감소 버튼 또는 직접 입력)
- 제품 삭제 가능
- 총 금액 표시
- “주문하기” 버튼 클릭 시 주문 페이지로 이동

### (3) 주문 페이지 (`/checkout`)

- 장바구니 상품 목록 + 최종 금액 표시
- 배송 정보 입력 폼 (이름, 주소, 연락처)
- “결제하기” 버튼 클릭 시 주문 완료 처리
- 주문 완료 시 alert 또는 주문 완료 페이지 이동

---

### 3. API 명세

### 📍 제품 목록 API

```
arduino
복사편집
GET https://fakestoreapi.com/products
Response:
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack",
    "price": 109.95,
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  },
  ...
]

```

### 📍 주문 API (mock 처리 가능)

```
css
복사편집
POST /orders
Request body:
{
  "items": [
    { "productId": 1, "quantity": 2 }
  ],
  "shipping": {
    "name": "홍길동",
    "address": "서울시 ...",
    "phone": "010-1234-5678"
  }
}
Response:
{
  "orderId": "abc123",
  "status": "success"
}

```

---
