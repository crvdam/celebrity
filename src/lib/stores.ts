import { writable } from "svelte/store";

export const celebrities = writable<any>([]);
export const showFilter = writable(true);
export const score = writable(0);
export const timer = writable(0);




