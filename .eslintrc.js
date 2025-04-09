// https://docs.expo.dev/guides/using-eslint/

module.exports = {
	root: true, // 최상위 파일임을 명시
	parser: '@typescript-eslint/parser', // ESLint가 TypeScript 문법을 이해하도록 함
	parserOptions: {
		ecmaVersion: 2021, // 최신 JS 문법 사용
		sourceType: 'module',
	},
	plugins: [
		'react-hooks', // React Hooks 관련 규칙
		'@typescript-eslint', // TypeScript 전용 규칙
		'prettier', // Prettier 연동
		'import', // import 관련 규칙 제공
	],
	extends: [
		'expo', // 내부적으로 eslint, react, react-native 설정 포함
		'plugin:react-hooks/recommended', // Hooks 사용 관련 규칙 추가
		'plugin:@typescript-eslint/recommended', // TS 린트 규칙 추가
		'prettier', // Prettier와 충돌하는 ESLint 규칙 비활성화
	],
	ignorePatterns: ['dist', 'node_modules', '.expo'], // ESLint가 검사하지 않을 디렉토리 명시
	rules: {
		'prettier/prettier': 'error', // Prettier 규칙 위반 시 error
		'react/react-in-jsx-scope': 'off', // React 17 이상에서는 자동 JSX 변환 가능 -> off 처리

		// warning rules
		'react-hooks/exhaustive-deps': 'warn', // 의존성 누락
		'@typescript-eslint/no-unused-vars': 'warn', // 사용되지 않는 변수
		'@typescript-eslint/no-explicit-any': 'warn', // any 사용
		'@typescript-eslint/no-empty-function': 'warn', // 빈 함수 허용
		'import/no-duplicates': 'warn', // 동일한 모듈을 여러 번 import
		'import/order': [
			'warn',
			{
				groups: [
					['builtin', 'external'], // 첫 번째 그룹: Node.js 내장 모듈 + 외부 라이브러리 (e.g. react, axios 등)
					'internal', // 두 번째 그룹: 절대 경로 import (예: @src/components/Header)
					['parent', 'sibling', 'index'], // 세 번째 그룹: 상대 경로 import들
				],
				'newlines-between': 'always', // import 시 항상 각 그룹 사이에 한 줄 띄어쓰기 (가독성 향상)
			},
		], // import 정렬 규칙: 빌드 실패 없이 경고만 표시
	},
	settings: {
		react: {
			version: 'detect', // 프로젝트 내 React 버전 자동 감지
		},
	},
};
