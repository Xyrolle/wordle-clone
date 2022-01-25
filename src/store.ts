import { writable } from "svelte/store";

import { State } from './constants.js';
import { createKeyboardState } from "./utils.js";

import type { Cell } from "./types.js";

export const cells = writable<Cell[][]>([]);

export const state = writable(createKeyboardState());

export const rowClasses = writable(Array.from({ length: 6 }, () => ''));