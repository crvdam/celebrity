import { celebrities, timer } from "./stores";

// The Movie Database (TMDB) API themoviedb.org
export async function fetchCelebrities(page:number) {
  celebrities.subscribe(value => {
    const array = value;
  })

  const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ''
    }
  };
    
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      celebrities.set(json.results);
    })
    .catch(err => console.error('error:' + err));
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
