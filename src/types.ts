import type { State } from "./constants";

export interface Cell {
    state: State,
    letter: string,
    cellClass: string
};