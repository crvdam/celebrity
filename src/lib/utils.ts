import { celebrities, timer } from "./stores";

export async function fetchCelebrities(page: number) {
  try {
    const response = await fetch(`/.netlify/functions/fetch-celebrities?page=${page}`);
    const json = await response.json();
    
    celebrities.set(json.results);
  } catch (err) {
    console.error('error:' + err);
  }
}

export function randomInt(max:number) {
    return Math.floor(Math.random() * max);
}

let interval:number;
let running = true;

export function startTimer() {
  const startTime = Date.now();

  interval = setInterval(() => {
    if (running) {
      timer.set(Date.now() - startTime);
    }
  });
}

export function stopTimer() {
  clearInterval(interval);
}
