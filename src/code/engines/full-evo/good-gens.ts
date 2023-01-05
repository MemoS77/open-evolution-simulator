import {Genome} from "./types"

export const GoodGens: Genome[] = [
    [[1, 19, 27, 20, 34, 6, 15, 1, 35, 41, 1, 16, 22, 34, 27, 25, 20, 32, 27, 23, 6, 19, 22, 40, 25, 13, 20, 10, 12, 12, 26, 40, 31, 25, 33, 5, 14, 15, 15, 0, 1, 8, 29, 1, 42, 31, 29, 34, 5, 7, 18, 33, 26, 40, 6, 9, 35, 26, 9, 35, 0, 38, 21, 22, 37, 11, 21, 37, 36, 21, 3, 38, 27, 38, 14, 9, 30, 6, 29, 41, 10, 40, 29, 11, 22, 39, 8, 28, 21, 18, 28, 29, 8, 21, 25, 29, 5, 16, 5, 10, 5, 18, 24, 8, 1, 0, 29, 39, 17, 11, 37, 9, 6, 3, 5, 21, 10, 3, 16, 34, 15, 32, 25, 3, 8, 16, 31, 2, 41, 37, 13, 4, 11, 2, 41, 5, 3, 22, 36, 38, 29, 0, 33, 22, 9, 38, 15, 22, 30, 10, 24, 15, 34, 34, 8, 12, 28, 22, 37, 41, 5], [24, 13, 37, 31, 4, 26, 42, 4, 38, 33, 33, 17, 8, 2, 31, 8, 2, 27, 7, 30, 1, 37, 21, 34, 1, 4, 12, 31, 33, 38, 39, 24, 28, 6, 36, 21, 25, 28, 14, 21, 22, 38, 24, 32, 13, 7, 4, 1, 14, 42, 40, 28, 21, 10, 16, 16, 6, 22, 41, 3, 33, 1, 7, 24, 14, 40, 26, 12, 3, 17, 16, 10, 29, 13, 9, 3, 20, 17, 9, 35, 15, 12, 13, 22, 18, 28, 40, 28, 27, 21, 41, 10, 10, 9, 0, 15, 1, 41, 11, 8, 34, 38, 25, 6, 40, 13, 41, 34, 29, 35, 12, 16, 0, 31, 42, 34, 18, 41, 29, 38, 8, 2, 41, 42, 2, 0, 16, 33, 18, 20, 18, 33, 27, 33, 34, 4, 30, 34, 42, 27, 6, 39, 19, 35, 7, 26, 35, 15, 24, 34, 32, 3, 29, 23, 18, 11, 29, 13, 26, 24, 15, 16, 30, 0, 16, 16, 20, 32, 33, 39, 36, 23, 38, 6, 39, 13, 31, 13, 25, 40, 0, 6, 11, 27, 29, 32, 42, 28, 35, 9, 14, 14, 21, 19, 16, 17, 40, 26, 41, 38, 23, 14, 28, 9, 26, 0, 3, 9, 32, 35, 36, 21, 26, 35, 36, 5, 14, 6, 10, 17, 33, 20, 7, 24, 42, 26, 34, 31, 7, 24, 42, 29, 34, 10, 21, 25, 40, 31, 22, 13, 2, 37]],
    [[17, 20, 34, 6, 1, 41, 4, 1, 20, 16, 33, 22, 34, 27, 25, 20, 39, 27, 23, 6, 36, 19, 2, 10, 22, 28, 18, 25, 24, 33, 6, 12, 7, 31, 33, 42, 5, 38, 15, 15, 0, 10, 8, 11, 11, 14, 1, 14, 10, 4, 4, 34, 12, 5, 33, 10, 16, 9, 9, 0, 15, 21, 22, 37, 11, 22, 9, 0, 42, 3, 38, 36, 16, 13, 20, 38, 17, 0, 14, 28, 21, 42, 11, 41, 34, 5, 8, 28, 26, 2, 1, 14, 4, 15, 11, 8, 31, 15, 0, 5, 29, 16, 31, 1, 21, 1, 20, 29, 35, 35, 37, 25, 5, 34, 14, 5, 10, 16, 32, 9, 7, 14, 32, 39, 3, 40, 24, 25, 4, 31, 37, 11, 33, 6, 13, 2, 36, 22, 4, 6, 29, 17, 15, 7, 22, 11, 30, 17, 14, 10, 24, 23, 28, 3, 12, 39, 10, 28, 0, 17, 34, 5, 4, 12, 24], [5, 24, 13, 37, 16, 31, 30, 26, 30, 4, 38, 13, 17, 2, 31, 27, 2, 25, 30, 34, 13, 4, 26, 12, 31, 33, 38, 24, 11, 5, 2, 6, 36, 11, 21, 25, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 33, 1, 30, 16, 23, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 38, 17, 41, 18, 40, 28, 27, 10, 19, 16, 15, 18, 1, 11, 34, 4, 38, 25, 13, 11, 8, 1, 25, 7, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 21, 23, 34, 21, 2, 28, 13, 25, 9, 29, 8, 30, 34, 31, 24, 1, 19, 7, 41, 13, 5, 3, 2, 3, 3, 7, 23, 38, 29, 30, 22, 13, 26, 31, 5, 26, 28, 39, 18, 34, 30, 34, 0, 16, 39, 5, 29, 32, 42, 38, 8, 30, 8, 18, 20, 37, 16, 31, 35, 42, 20, 21, 27, 6, 3, 29, 2, 14, 33, 19, 32, 40, 8, 13, 24, 18, 10, 17, 42, 26, 1, 15, 17, 27, 42, 16, 15, 17, 33, 31, 11, 8, 35, 37, 15, 16, 29, 21, 36, 42, 14, 6, 17, 20, 20, 4, 41, 7, 27, 1, 20, 11, 32, 20, 42, 14, 15, 28, 40, 22, 13, 17, 29, 14, 22, 13, 18]],
    [[17, 20, 34, 6, 1, 41, 4, 1, 20, 16, 33, 22, 34, 27, 25, 20, 39, 27, 23, 13, 1, 36, 19, 2, 10, 22, 28, 18, 25, 13, 33, 6, 12, 26, 31, 33, 42, 26, 5, 38, 15, 15, 10, 8, 11, 12, 4, 1, 14, 10, 42, 4, 4, 34, 12, 5, 33, 10, 16, 34, 9, 0, 15, 21, 22, 37, 11, 22, 9, 0, 42, 3, 38, 36, 16, 20, 9, 38, 17, 0, 14, 6, 28, 21, 42, 11, 41, 34, 5, 8, 28, 26, 2, 1, 14, 4, 15, 11, 8, 31, 15, 0, 5, 41, 29, 16, 31, 26, 37, 21, 0, 29, 35, 35, 37, 25, 13, 5, 34, 14, 5, 10, 16, 9, 7, 14, 32, 39, 3, 24, 25, 4, 31, 37, 4, 11, 33, 6, 13, 24, 2, 36, 22, 4, 36, 29, 17, 15, 7, 22, 11, 17, 30, 10, 24, 23, 22, 3, 12, 39, 10, 28, 0, 17, 34, 5, 4, 12, 24], [5, 24, 13, 37, 16, 31, 30, 26, 30, 4, 38, 13, 17, 17, 2, 31, 23, 2, 25, 30, 34, 13, 4, 26, 12, 31, 33, 3, 39, 24, 11, 5, 2, 6, 36, 27, 21, 25, 28, 14, 21, 20, 22, 32, 8, 4, 1, 37, 21, 11, 11, 3, 16, 10, 6, 15, 33, 1, 14, 30, 16, 23, 17, 24, 30, 3, 5, 14, 21, 29, 13, 4, 9, 3, 38, 17, 41, 18, 40, 28, 27, 10, 19, 16, 15, 18, 11, 34, 4, 38, 25, 13, 11, 8, 1, 25, 7, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 11, 41, 23, 34, 21, 2, 28, 13, 25, 30, 29, 8, 30, 34, 42, 24, 7, 1, 19, 7, 41, 13, 38, 3, 2, 3, 3, 7, 23, 38, 29, 30, 13, 26, 31, 5, 26, 39, 18, 34, 30, 34, 0, 16, 39, 29, 32, 42, 38, 8, 30, 8, 18, 20, 37, 38, 31, 31, 35, 42, 20, 21, 8, 6, 3, 29, 2, 14, 33, 19, 15, 32, 40, 8, 13, 24, 18, 10, 17, 42, 26, 1, 15, 17, 27, 42, 16, 15, 17, 33, 31, 11, 8, 22, 37, 15, 16, 29, 21, 35, 36, 42, 14, 6, 17, 20, 20, 41, 7, 27, 1, 20, 11, 0, 7, 20, 42, 17, 28, 40, 22, 13, 17, 29, 14, 13, 18]],
    [[1, 19, 27, 20, 34, 6, 15, 42, 35, 41, 1, 16, 22, 34, 27, 20, 32, 27, 23, 6, 19, 22, 40, 25, 13, 20, 10, 12, 12, 26, 40, 18, 31, 25, 33, 5, 14, 15, 15, 0, 1, 8, 4, 1, 42, 31, 29, 34, 5, 7, 18, 33, 26, 40, 6, 9, 35, 26, 9, 35, 0, 38, 21, 22, 10, 37, 11, 37, 36, 21, 23, 38, 27, 38, 14, 36, 9, 30, 6, 29, 41, 10, 40, 29, 11, 22, 39, 8, 5, 28, 21, 28, 29, 19, 4, 8, 25, 29, 5, 16, 5, 10, 5, 18, 24, 8, 1, 0, 29, 39, 17, 11, 37, 12, 9, 6, 3, 5, 21, 3, 16, 34, 15, 28, 25, 3, 8, 16, 36, 31, 41, 37, 13, 4, 11, 2, 41, 3, 22, 36, 38, 29, 33, 9, 38, 15, 22, 30, 10, 24, 15, 34, 34, 8, 12, 28, 22, 37, 37, 41, 5], [5, 24, 13, 37, 16, 31, 30, 26, 30, 4, 14, 13, 17, 2, 31, 27, 2, 25, 30, 34, 13, 5, 26, 12, 31, 33, 38, 24, 11, 5, 2, 6, 36, 11, 21, 25, 28, 14, 21, 20, 22, 7, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 33, 1, 30, 16, 23, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 20, 17, 42, 18, 40, 28, 27, 10, 19, 16, 15, 13, 18, 1, 11, 34, 4, 25, 13, 11, 8, 1, 25, 40, 35, 12, 30, 32, 0, 18, 31, 34, 8, 21, 28, 21, 2, 28, 13, 25, 9, 29, 8, 34, 31, 24, 14, 1, 19, 7, 41, 13, 5, 3, 2, 3, 3, 7, 23, 38, 29, 30, 22, 13, 15, 26, 0, 5, 26, 28, 39, 18, 34, 30, 34, 0, 16, 39, 5, 29, 32, 42, 38, 8, 30, 8, 18, 20, 37, 16, 31, 35, 42, 20, 21, 27, 6, 3, 29, 14, 33, 19, 32, 40, 8, 13, 24, 18, 10, 17, 42, 26, 1, 15, 17, 27, 42, 16, 15, 17, 33, 31, 11, 8, 35, 37, 15, 16, 29, 21, 36, 42, 14, 6, 17, 20, 20, 4, 41, 7, 33, 27, 1, 20, 11, 32, 20, 42, 42, 14, 15, 28, 40, 22, 13, 17, 29, 14, 22, 13, 18]],
    [[1, 19, 20, 34, 6, 15, 1, 35, 41, 1, 16, 22, 34, 27, 25, 20, 32, 27, 23, 6, 19, 22, 40, 25, 20, 10, 12, 12, 26, 31, 25, 33, 5, 14, 15, 15, 0, 42, 1, 8, 40, 29, 1, 42, 42, 34, 5, 7, 18, 37, 40, 6, 9, 35, 26, 9, 35, 0, 38, 21, 22, 37, 11, 21, 37, 1, 21, 3, 38, 27, 38, 14, 4, 30, 41, 10, 40, 29, 11, 22, 39, 8, 28, 21, 18, 28, 29, 8, 21, 25, 29, 5, 16, 37, 10, 28, 5, 18, 24, 8, 1, 0, 29, 17, 11, 37, 9, 6, 3, 5, 21, 10, 3, 16, 34, 15, 32, 28, 3, 8, 16, 31, 2, 39, 41, 37, 13, 4, 31, 11, 41, 5, 3, 22, 36, 38, 0, 33, 28, 9, 38, 15, 22, 40, 3, 24, 15, 34, 34, 8, 12, 28, 22, 37, 41, 5], [5, 24, 13, 37, 16, 31, 30, 1, 26, 30, 4, 38, 13, 17, 2, 31, 27, 2, 25, 30, 34, 13, 4, 12, 31, 33, 38, 24, 11, 5, 2, 6, 36, 11, 14, 21, 25, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 33, 1, 30, 16, 23, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 38, 17, 41, 18, 28, 31, 28, 27, 10, 19, 16, 15, 18, 1, 11, 34, 4, 38, 28, 13, 11, 8, 1, 25, 7, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 21, 23, 34, 21, 2, 28, 13, 25, 9, 29, 28, 8, 30, 34, 31, 24, 1, 19, 7, 41, 13, 5, 3, 2, 3, 7, 23, 31, 29, 30, 22, 13, 26, 31, 5, 23, 28, 39, 18, 34, 30, 34, 0, 16, 39, 5, 3, 29, 32, 42, 38, 8, 30, 8, 18, 20, 37, 16, 31, 35, 42, 20, 21, 27, 6, 3, 29, 2, 14, 33, 19, 32, 40, 8, 13, 24, 18, 10, 17, 42, 20, 24, 17, 27, 42, 16, 15, 30, 33, 31, 11, 8, 35, 37, 15, 16, 29, 21, 36, 42, 14, 6, 17, 20, 20, 4, 41, 7, 27, 1, 20, 11, 32, 20, 42, 14, 15, 28, 40, 22, 13, 17, 29, 14, 22, 13, 18]],
    [[1, 19, 27, 20, 34, 6, 15, 1, 35, 41, 1, 16, 26, 22, 34, 25, 3, 32, 27, 23, 6, 22, 40, 25, 13, 20, 10, 12, 23, 26, 40, 31, 19, 25, 33, 5, 14, 15, 15, 0, 1, 8, 29, 1, 42, 31, 29, 34, 5, 7, 18, 33, 26, 40, 6, 9, 35, 26, 9, 35, 0, 38, 21, 22, 37, 11, 21, 37, 13, 36, 21, 38, 27, 14, 9, 30, 6, 29, 41, 10, 40, 29, 11, 22, 39, 8, 28, 21, 18, 28, 29, 31, 8, 25, 29, 5, 16, 5, 10, 5, 18, 24, 8, 1, 0, 29, 39, 17, 11, 19, 37, 9, 6, 3, 5, 21, 10, 3, 2, 16, 34, 15, 32, 25, 3, 31, 2, 41, 37, 13, 4, 11, 2, 36, 18, 3, 22, 36, 38, 29, 28, 33, 30, 9, 38, 15, 22, 30, 24, 15, 34, 34, 8, 12, 8, 22, 37, 41, 5], [24, 13, 37, 31, 4, 26, 42, 4, 38, 33, 33, 17, 8, 2, 31, 8, 2, 0, 7, 30, 1, 37, 21, 34, 1, 4, 12, 31, 33, 38, 39, 24, 28, 36, 21, 38, 28, 14, 21, 22, 38, 24, 32, 13, 7, 4, 1, 14, 42, 40, 28, 21, 10, 16, 16, 6, 22, 3, 33, 1, 7, 24, 14, 40, 26, 12, 3, 17, 30, 16, 29, 13, 9, 3, 20, 17, 9, 35, 35, 12, 15, 13, 22, 18, 28, 40, 28, 27, 21, 41, 10, 9, 0, 15, 28, 1, 41, 11, 8, 34, 38, 25, 6, 40, 13, 41, 34, 29, 35, 12, 16, 32, 0, 31, 42, 34, 18, 41, 29, 38, 8, 2, 41, 42, 2, 0, 16, 33, 18, 20, 18, 33, 27, 33, 34, 4, 30, 34, 42, 27, 6, 19, 35, 7, 26, 35, 15, 24, 34, 32, 3, 29, 23, 18, 11, 29, 13, 26, 24, 15, 16, 30, 0, 16, 16, 20, 32, 33, 24, 40, 38, 6, 39, 13, 31, 13, 25, 40, 0, 6, 11, 27, 29, 32, 42, 28, 9, 14, 14, 21, 19, 16, 17, 40, 26, 38, 23, 14, 19, 9, 26, 0, 3, 9, 32, 35, 36, 21, 26, 35, 36, 5, 14, 6, 10, 17, 33, 20, 7, 24, 42, 26, 34, 31, 7, 24, 42, 29, 34, 10, 25, 40, 31, 22, 13, 2, 37]],
    [[1, 19, 27, 20, 34, 6, 15, 1, 35, 41, 1, 16, 26, 22, 34, 27, 25, 20, 32, 27, 23, 6, 22, 40, 25, 13, 20, 10, 12, 23, 29, 26, 40, 31, 25, 33, 5, 14, 15, 15, 0, 1, 8, 29, 1, 42, 31, 20, 5, 7, 18, 33, 26, 40, 6, 9, 35, 26, 9, 0, 38, 39, 21, 22, 37, 11, 21, 37, 36, 21, 38, 27, 38, 14, 9, 30, 6, 29, 41, 10, 40, 29, 12, 11, 0, 39, 8, 28, 21, 42, 28, 29, 8, 21, 25, 29, 5, 16, 5, 10, 5, 18, 24, 8, 1, 0, 29, 39, 17, 11, 37, 9, 3, 5, 21, 10, 3, 16, 34, 19, 15, 32, 25, 3, 8, 16, 16, 31, 2, 41, 37, 4, 11, 2, 11, 5, 3, 3, 22, 36, 38, 29, 28, 33, 9, 38, 15, 22, 30, 24, 15, 34, 34, 8, 12, 8, 22, 37, 41, 5], [5, 24, 13, 37, 16, 31, 30, 26, 30, 4, 38, 13, 17, 2, 31, 27, 2, 30, 34, 13, 4, 26, 12, 31, 33, 38, 24, 11, 5, 2, 3, 6, 36, 11, 21, 25, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 33, 1, 30, 16, 23, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 33, 38, 17, 41, 18, 32, 27, 10, 38, 19, 16, 15, 18, 1, 11, 34, 4, 38, 25, 13, 11, 8, 1, 6, 25, 7, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 21, 23, 34, 37, 21, 2, 28, 13, 25, 9, 29, 8, 30, 34, 31, 24, 1, 19, 7, 41, 13, 5, 3, 2, 3, 3, 7, 23, 38, 29, 30, 22, 13, 26, 31, 5, 26, 28, 39, 18, 34, 30, 34, 0, 16, 39, 5, 29, 32, 42, 38, 7, 2, 8, 18, 36, 37, 16, 31, 35, 42, 20, 21, 27, 6, 3, 29, 24, 14, 33, 19, 32, 40, 8, 13, 24, 18, 10, 17, 42, 1, 15, 17, 27, 42, 36, 16, 15, 17, 33, 12, 11, 8, 2, 15, 16, 29, 21, 36, 42, 14, 6, 17, 20, 20, 4, 41, 27, 1, 20, 11, 32, 20, 42, 14, 15, 28, 40, 22, 13, 17, 29, 14, 22, 13, 18]],
    [[1, 16, 20, 34, 6, 15, 1, 35, 41, 1, 16, 22, 34, 27, 20, 6, 27, 23, 6, 19, 38, 40, 25, 20, 10, 12, 12, 26, 31, 25, 33, 5, 14, 15, 15, 0, 42, 1, 8, 40, 29, 1, 42, 34, 25, 5, 7, 18, 37, 40, 6, 35, 26, 9, 26, 0, 38, 27, 37, 22, 37, 11, 21, 37, 1, 3, 38, 27, 14, 4, 24, 30, 41, 10, 40, 29, 11, 22, 39, 8, 28, 21, 18, 28, 29, 8, 32, 21, 25, 29, 5, 16, 5, 10, 28, 5, 18, 24, 8, 1, 0, 29, 17, 11, 37, 9, 6, 3, 40, 21, 10, 3, 16, 34, 15, 32, 28, 3, 8, 2, 39, 41, 37, 31, 11, 41, 5, 3, 22, 36, 38, 0, 33, 27, 32, 28, 9, 38, 15, 22, 40, 10, 24, 15, 34, 34, 8, 12, 28, 22, 37, 41, 5], [5, 24, 28, 13, 37, 40, 31, 0, 26, 30, 4, 38, 13, 26, 17, 2, 31, 27, 2, 30, 34, 13, 4, 26, 12, 31, 33, 38, 24, 11, 5, 2, 3, 6, 36, 11, 21, 25, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 33, 1, 30, 16, 23, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 38, 17, 41, 18, 28, 27, 10, 19, 16, 15, 18, 1, 11, 34, 4, 38, 25, 13, 11, 8, 1, 25, 7, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 21, 23, 34, 37, 21, 2, 28, 13, 9, 22, 29, 8, 30, 34, 31, 24, 1, 19, 7, 41, 13, 5, 3, 2, 3, 3, 7, 23, 38, 29, 30, 22, 13, 26, 31, 5, 26, 28, 39, 18, 34, 30, 34, 0, 10, 5, 29, 32, 42, 38, 7, 30, 8, 18, 36, 37, 16, 31, 35, 42, 20, 21, 27, 6, 3, 29, 2, 14, 33, 19, 32, 40, 8, 24, 18, 10, 17, 42, 1, 15, 17, 27, 42, 36, 16, 15, 17, 33, 12, 11, 8, 37, 15, 16, 29, 21, 36, 42, 42, 14, 6, 17, 20, 20, 4, 41, 27, 1, 20, 11, 32, 20, 42, 20, 14, 15, 28, 40, 22, 13, 17, 29, 14, 22, 13, 18]],
    [[22, 1, 19, 27, 20, 0, 6, 22, 1, 35, 41, 1, 22, 27, 20, 32, 27, 3, 23, 19, 32, 30, 22, 40, 13, 20, 10, 12, 12, 26, 40, 3, 25, 33, 5, 14, 15, 15, 0, 41, 1, 8, 29, 1, 31, 34, 8, 5, 7, 33, 26, 30, 40, 6, 7, 9, 35, 26, 9, 35, 0, 38, 21, 3, 22, 37, 14, 11, 30, 37, 36, 21, 17, 29, 38, 27, 38, 14, 9, 30, 6, 29, 41, 10, 40, 29, 4, 29, 22, 39, 8, 28, 21, 39, 28, 29, 41, 25, 29, 5, 16, 5, 5, 18, 24, 8, 1, 0, 29, 39, 36, 17, 11, 9, 6, 33, 3, 5, 21, 10, 3, 16, 34, 15, 32, 15, 25, 3, 8, 16, 31, 2, 35, 41, 37, 13, 4, 11, 2, 41, 36, 3, 22, 36, 38, 29, 0, 39, 22, 6, 17, 38, 15, 30, 10, 24, 15, 34, 34, 8, 12, 22, 37, 41, 8, 5], [5, 40, 13, 37, 16, 31, 30, 26, 30, 30, 4, 38, 13, 17, 2, 31, 27, 2, 25, 30, 34, 13, 4, 26, 12, 31, 33, 38, 24, 11, 5, 2, 2, 36, 11, 21, 25, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 1, 30, 16, 23, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 38, 17, 41, 18, 40, 28, 28, 10, 19, 16, 15, 18, 1, 11, 34, 4, 38, 25, 13, 11, 8, 1, 25, 7, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 10, 23, 34, 21, 2, 28, 13, 25, 9, 29, 8, 34, 31, 24, 1, 19, 7, 41, 13, 5, 3, 2, 3, 3, 7, 23, 38, 29, 30, 22, 13, 26, 31, 5, 26, 28, 39, 18, 34, 30, 34, 0, 16, 39, 5, 27, 29, 32, 32, 42, 38, 8, 30, 8, 18, 20, 37, 16, 31, 35, 42, 21, 27, 6, 3, 29, 14, 33, 19, 32, 29, 13, 24, 18, 10, 17, 42, 26, 1, 15, 17, 27, 31, 16, 15, 33, 31, 11, 8, 35, 37, 15, 16, 29, 21, 36, 42, 14, 6, 17, 20, 20, 41, 32, 32, 1, 1, 20, 32, 18, 42, 14, 15, 28, 40, 22, 13, 17, 9, 17, 14, 22, 13, 18]],
    [[1, 20, 19, 27, 9, 19, 15, 42, 35, 1, 7, 23, 22, 25, 31, 10, 31, 12, 38, 12, 21, 13, 18, 31, 10, 11, 25, 33, 35, 21, 21, 8, 4, 1, 29, 19, 5, 12, 27, 26, 40, 6, 9, 35, 26, 1, 5, 9, 25, 35, 0, 21, 22, 10, 37, 17, 32, 11, 25, 36, 23, 35, 14, 14, 9, 30, 34, 6, 10, 40, 37, 36, 9, 5, 21, 28, 19, 8, 25, 6, 5, 16, 5, 4, 8, 29, 0, 29, 39, 20, 14, 26, 27, 0, 5, 21, 3, 28, 13, 28, 33, 25, 8, 16, 16, 0, 24, 37, 42, 13, 4, 11, 2, 21, 41, 23, 0, 22, 36, 38, 29, 33, 9, 25, 22, 15, 13, 22, 7, 30, 10, 4, 19, 34, 8, 37, 37, 0, 5], [5, 13, 37, 16, 31, 30, 26, 30, 4, 14, 13, 22, 9, 31, 27, 2, 25, 30, 34, 13, 5, 22, 12, 31, 33, 3, 9, 11, 5, 2, 6, 36, 11, 21, 25, 39, 14, 21, 20, 41, 22, 27, 7, 32, 8, 29, 4, 1, 37, 21, 23, 11, 3, 16, 10, 5, 15, 33, 1, 30, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 34, 9, 30, 3, 20, 17, 42, 18, 40, 28, 10, 19, 32, 16, 15, 13, 18, 1, 11, 34, 4, 29, 13, 11, 8, 1, 25, 40, 35, 12, 30, 32, 0, 31, 34, 36, 15, 2, 28, 34, 9, 29, 8, 34, 31, 17, 14, 1, 19, 7, 41, 13, 22, 5, 2, 3, 3, 17, 23, 38, 29, 30, 22, 32, 8, 26, 0, 10, 11, 28, 39, 18, 34, 30, 20, 34, 0, 33, 39, 35, 32, 42, 8, 30, 6, 8, 18, 20, 37, 16, 31, 27, 35, 3, 42, 14, 22, 27, 3, 29, 33, 19, 32, 40, 8, 30, 24, 18, 23, 10, 17, 30, 26, 13, 17, 13, 18, 16, 15, 17, 21, 8, 37, 15, 16, 29, 21, 36, 6, 17, 14, 20, 41, 7, 33, 27, 20, 11, 30, 42, 42, 14, 15, 28, 40, 22, 13, 17, 5, 22, 13, 33]],
    [[1, 27, 34, 6, 15, 1, 38, 24, 20, 26, 22, 25, 3, 32, 15, 23, 23, 6, 32, 22, 13, 25, 7, 20, 12, 23, 40, 8, 31, 19, 25, 33, 5, 14, 15, 40, 15, 0, 8, 29, 30, 15, 5, 35, 21, 41, 26, 40, 12, 9, 35, 31, 28, 9, 35, 0, 21, 22, 37, 19, 11, 27, 21, 18, 31, 36, 21, 38, 27, 14, 9, 42, 6, 29, 41, 40, 29, 19, 11, 22, 33, 39, 8, 24, 28, 18, 22, 35, 29, 36, 8, 25, 29, 16, 5, 10, 40, 26, 18, 16, 0, 8, 1, 29, 35, 29, 39, 17, 41, 11, 19, 13, 9, 3, 7, 5, 38, 21, 3, 2, 9, 34, 37, 25, 14, 30, 2, 3, 16, 37, 13, 4, 4, 41, 32, 36, 3, 22, 41, 38, 29, 28, 30, 9, 18, 15, 42, 15, 34, 34, 1, 8, 12, 8, 22, 3, 37, 41, 5], [40, 13, 37, 23, 31, 30, 26, 30, 30, 4, 38, 13, 16, 2, 31, 27, 2, 29, 30, 23, 13, 4, 26, 12, 31, 33, 38, 24, 11, 29, 1, 2, 14, 40, 36, 11, 25, 28, 21, 20, 22, 35, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 1, 31, 29, 15, 22, 16, 13, 23, 19, 17, 15, 24, 30, 3, 17, 5, 40, 29, 13, 4, 30, 3, 38, 37, 18, 40, 26, 28, 10, 16, 15, 1, 1, 34, 4, 38, 14, 13, 11, 14, 1, 25, 7, 40, 2, 35, 12, 33, 30, 32, 34, 18, 20, 31, 6, 8, 8, 10, 23, 34, 21, 2, 28, 13, 25, 9, 29, 8, 34, 31, 24, 1, 19, 41, 13, 5, 36, 3, 2, 3, 26, 7, 34, 29, 11, 33, 31, 30, 13, 40, 30, 31, 34, 26, 28, 18, 34, 30, 34, 16, 39, 5, 27, 40, 7, 32, 42, 11, 38, 10, 10, 15, 8, 18, 20, 10, 37, 31, 35, 22, 6, 33, 37, 29, 7, 19, 29, 13, 24, 18, 10, 12, 42, 27, 17, 1, 15, 27, 29, 16, 6, 33, 18, 11, 37, 39, 11, 9, 29, 21, 35, 36, 37, 14, 6, 17, 20, 41, 32, 32, 1, 1, 32, 31, 9, 35, 28, 40, 22, 0, 17, 17, 14, 22, 18, 37]],
    [[1, 16, 19, 27, 9, 6, 15, 35, 1, 20, 27, 22, 25, 42, 13, 10, 31, 12, 38, 12, 26, 13, 18, 31, 10, 25, 33, 35, 21, 21, 8, 4, 1, 29, 34, 5, 42, 33, 12, 27, 26, 40, 6, 9, 35, 26, 1, 5, 9, 25, 35, 13, 21, 21, 22, 41, 10, 37, 17, 32, 11, 25, 36, 23, 35, 14, 14, 9, 30, 34, 6, 10, 40, 37, 36, 9, 5, 28, 19, 8, 25, 6, 5, 16, 5, 4, 8, 29, 0, 29, 39, 20, 14, 26, 27, 0, 5, 21, 3, 28, 13, 28, 25, 8, 16, 16, 0, 24, 20, 23, 4, 11, 2, 41, 23, 0, 22, 36, 38, 29, 3, 9, 22, 15, 13, 22, 30, 10, 4, 19, 34, 8, 37, 37, 0, 41, 5], [5, 24, 28, 13, 37, 40, 31, 0, 26, 30, 42, 38, 30, 26, 17, 2, 31, 27, 2, 30, 34, 13, 25, 26, 12, 31, 33, 38, 24, 11, 5, 2, 3, 6, 36, 11, 21, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 42, 1, 20, 11, 3, 16, 10, 6, 15, 33, 1, 30, 16, 23, 9, 20, 17, 23, 30, 3, 17, 5, 14, 10, 29, 6, 13, 4, 9, 3, 38, 17, 41, 18, 28, 27, 10, 34, 19, 16, 15, 18, 1, 34, 4, 16, 25, 13, 11, 8, 1, 20, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 21, 23, 34, 37, 21, 2, 13, 9, 29, 8, 30, 31, 24, 1, 19, 7, 41, 13, 6, 5, 27, 2, 3, 3, 7, 23, 38, 8, 22, 13, 26, 31, 5, 37, 28, 39, 18, 34, 34, 34, 0, 10, 13, 5, 41, 32, 42, 38, 7, 30, 8, 34, 18, 36, 37, 16, 6, 31, 35, 42, 9, 21, 26, 6, 3, 11, 29, 14, 33, 19, 32, 27, 40, 8, 24, 0, 10, 17, 42, 1, 15, 17, 31, 27, 42, 19, 36, 16, 15, 1, 12, 11, 8, 37, 15, 16, 0, 31, 42, 42, 14, 6, 17, 20, 41, 27, 1, 40, 20, 11, 32, 20, 42, 20, 14, 15, 28, 40, 22, 13, 17, 29, 13, 22, 13, 18]],
    [[1, 19, 20, 34, 6, 15, 1, 35, 41, 1, 16, 22, 34, 27, 25, 20, 7, 27, 23, 6, 19, 22, 26, 40, 25, 20, 10, 12, 12, 26, 31, 25, 34, 8, 5, 14, 15, 15, 0, 42, 1, 8, 40, 29, 1, 35, 42, 42, 34, 5, 7, 18, 37, 40, 6, 9, 35, 26, 9, 35, 0, 38, 21, 22, 37, 11, 21, 37, 1, 21, 3, 38, 27, 38, 14, 4, 30, 41, 10, 40, 29, 11, 22, 39, 8, 28, 21, 18, 28, 29, 8, 21, 25, 29, 5, 16, 37, 10, 28, 5, 18, 24, 8, 1, 0, 29, 17, 6, 37, 6, 3, 21, 10, 3, 16, 34, 15, 32, 28, 3, 8, 16, 31, 2, 39, 41, 37, 13, 20, 4, 31, 11, 41, 5, 3, 22, 36, 38, 0, 33, 28, 9, 38, 15, 22, 40, 3, 24, 15, 34, 34, 8, 12, 28, 22, 37, 41, 5], [5, 24, 13, 37, 16, 31, 30, 1, 26, 30, 4, 38, 13, 17, 2, 31, 27, 2, 25, 30, 34, 13, 4, 12, 31, 33, 38, 24, 11, 5, 2, 6, 36, 11, 14, 21, 25, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 1, 33, 1, 30, 16, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 38, 17, 41, 18, 28, 31, 28, 27, 10, 19, 16, 15, 18, 1, 11, 34, 4, 38, 28, 13, 11, 8, 1, 25, 7, 40, 35, 12, 32, 0, 18, 31, 8, 8, 21, 23, 34, 21, 2, 28, 13, 25, 9, 29, 28, 8, 30, 34, 31, 24, 1, 19, 7, 41, 13, 5, 3, 2, 3, 7, 23, 31, 29, 30, 22, 13, 26, 31, 5, 23, 28, 39, 18, 34, 30, 34, 0, 16, 39, 5, 3, 29, 32, 42, 38, 8, 30, 8, 18, 20, 37, 16, 31, 35, 42, 20, 21, 27, 6, 3, 29, 2, 14, 33, 19, 32, 40, 8, 13, 24, 18, 10, 17, 42, 20, 24, 17, 27, 42, 16, 15, 30, 33, 31, 11, 6, 8, 35, 37, 15, 16, 29, 21, 36, 42, 14, 6, 17, 20, 20, 4, 35, 41, 7, 27, 1, 20, 11, 32, 20, 19, 14, 15, 28, 40, 22, 13, 17, 29, 14, 22, 13, 18]],
    [[22, 1, 19, 27, 20, 0, 6, 22, 1, 35, 41, 1, 22, 27, 20, 32, 27, 3, 40, 23, 2, 19, 32, 30, 22, 40, 13, 20, 10, 12, 12, 26, 3, 25, 33, 5, 14, 15, 15, 0, 41, 1, 8, 29, 1, 31, 34, 8, 5, 7, 33, 26, 30, 40, 6, 7, 20, 9, 35, 26, 9, 35, 0, 38, 21, 3, 22, 37, 14, 11, 30, 37, 36, 21, 17, 29, 38, 27, 38, 19, 9, 30, 6, 29, 41, 10, 29, 4, 16, 22, 39, 8, 28, 21, 39, 28, 29, 41, 25, 29, 5, 16, 5, 5, 18, 24, 8, 1, 0, 29, 39, 36, 17, 11, 9, 6, 33, 3, 5, 21, 27, 10, 3, 16, 34, 15, 32, 15, 25, 3, 17, 16, 31, 2, 5, 35, 41, 37, 13, 4, 11, 2, 41, 36, 3, 22, 36, 38, 29, 0, 39, 22, 6, 17, 38, 15, 30, 10, 24, 15, 34, 34, 8, 12, 22, 37, 41, 8, 5], [5, 37, 40, 13, 37, 16, 31, 30, 26, 30, 30, 4, 38, 13, 17, 2, 31, 27, 2, 25, 30, 34, 13, 4, 26, 12, 31, 33, 38, 24, 11, 5, 2, 2, 36, 11, 21, 25, 28, 14, 21, 20, 22, 35, 7, 32, 8, 4, 1, 37, 21, 11, 3, 16, 10, 6, 15, 1, 30, 16, 23, 20, 17, 24, 30, 3, 17, 5, 14, 21, 29, 13, 4, 9, 3, 38, 17, 41, 18, 40, 5, 28, 10, 19, 16, 15, 18, 1, 11, 34, 4, 38, 25, 13, 11, 8, 1, 25, 7, 40, 35, 12, 30, 32, 0, 18, 31, 8, 8, 10, 23, 34, 21, 2, 28, 13, 25, 9, 29, 8, 34, 31, 24, 1, 19, 7, 41, 13, 5, 3, 2, 3, 3, 7, 7, 23, 38, 29, 30, 22, 13, 26, 31, 19, 5, 26, 28, 39, 18, 34, 30, 34, 0, 16, 39, 5, 27, 29, 32, 32, 42, 38, 8, 30, 8, 18, 20, 37, 16, 31, 35, 42, 21, 27, 6, 3, 29, 14, 33, 19, 32, 29, 13, 24, 18, 10, 17, 42, 26, 1, 15, 17, 27, 31, 16, 15, 31, 11, 8, 35, 37, 15, 16, 29, 21, 36, 42, 14, 6, 17, 20, 20, 41, 32, 32, 1, 1, 20, 32, 18, 42, 14, 15, 28, 40, 22, 13, 17, 9, 17, 14, 22, 13, 18]]
]
