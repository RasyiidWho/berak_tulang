

let delayTimer
export function debounce(functionName, seconds) {
    clearTimeout(delayTimer); // Reset the timer
    delayTimer = setTimeout(functionName, seconds); // Set a new timer
  }