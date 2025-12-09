/**
 * ## 비동기 문제 2: Debounce 함수 구현
 *
 * `debounce` 함수를 직접 구현해 보세요.
 * `debounce`는 연속적인 함수 호출을 그룹화하여, 지정된 시간 동안 추가 호출이 없을 때만 함수를 실행하는 기술입니다.
 * 주로 검색창 자동완성, 창 크기 조절 이벤트 처리 등에서 서버 부하를 줄이기 위해 사용됩니다.
 *
 * ### 요구사항:
 * - `debounce` 함수는 지정된 `delay` 시간 동안 호출이 없을 때만 `func` 함수를 실행해야 합니다.
 * - 만약 `delay` 시간이 지나기 전에 `debounce` 함수가 다시 호출되면, 이전의 대기 중인 `func` 실행은 취소되어야 합니다.
 * - `debounce` 함수는 감싸고 있는 `func` 함수와 동일한 `this` 컨텍스트 및 인자들을 전달받아 실행해야 합니다.
 *
 * @param func 디바운싱할 함수
 * @param delay 디바운스 시간 (밀리초)
 * @returns 디바운싱된 새로운 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  // 여기에 debounce 로직을 구현하세요.
  // Hint: 클로저를 사용하여 타이머 ID를 관리해야 합니다.
  let id: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    // @ts-ignore
    const context = this;
    if (id !== null) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
