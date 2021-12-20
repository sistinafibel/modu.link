import chalk from 'chalk';

const LogColorArray = ['black', 'red', 'green', 'yallow', 'white'] as const;
type LogColor = typeof LogColorArray[number];

/**
 * 로깅을 담당합니다.
 *
 * @param message 로그 메세지
 * @param display 항상 디스플레이에 표시 유무. false일 경우 production에서는 표시하지않음
 * @param type 색상컬러 타입
 */
export function log(message: string, display = false, colorType: LogColor = 'white'): void {
  if (process.env.NODE_ENV !== 'production' || display) {
    // eslint-disable-next-line no-console
    console.log(chalk[colorType](message));
  }
}
