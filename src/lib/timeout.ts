export function timeout(ms: number, callback: () => void): void {
	setTimeout(callback, ms);
  }