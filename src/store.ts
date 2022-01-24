import { writable } from "svelte/store";

import { State } from './constants.js';
import type { Cell } from "./types.js";

export const cells = writable<Cell[][]>([]);

export const state = writable(
    Object.fromEntries(
        Array.from(Array(26)).map((e, i) => i + 97)
            .map((x) => [ String.fromCharCode(x), State.HIDDEN ]
        )
    )
);

export const rowClasses = writable(Array.from({ length: 6 }, () => ''));