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
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWRlNjQxMjVmOGMzZmY2ZTZhNWI4MTM0ODY4ODc2MCIsIm5iZiI6MTcyMjk1NTIxOC44NzI4ODgsInN1YiI6IjY1ZjAxOTk5NjZhN2MzMDE0OGRkZTYzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCVDaBJqlzdrI3kRZk90OgUb0FKE-FYgZ4ribGdlWm4'
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
