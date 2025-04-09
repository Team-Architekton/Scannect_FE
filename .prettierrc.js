module.exports = {
  singleQuote: true, // 문자열에 작은 따옴표(')를 사용할지 여부
  semi: true, // 세미콜론(;)을 줄 끝에 붙일지 여부
  printWidth: 100, // 한 줄의 최대 길이 설정  (가독성 향상)
  useTabs: true, // 들여쓰기에 탭(\t) 문자 사용
  tabWidth: 2, // 들여쓰기 간격 설정
  trailingComma: "es5", // 마지막 항목 뒤에 콤마를 붙일지 여부 -> all: 전체 | es5: 객체, 배열에만
  arrowParens: "avoid", // 화살표 함수의 매개변수가 1개일 때 괄호 생략 여부 (가독성 향상)
  bracketSpacing: true, // 객체 중괄호 {} 안의 공백 (가독성 향상)
  endOfLine: "auto", // 줄바꿈 스타일 자동 감지 (Windows + Mac 혼용)
};
