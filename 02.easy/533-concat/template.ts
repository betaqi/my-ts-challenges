type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type Word<T> = T extends [infer First, ...infer Rest] ? First : never;

type first = Word<[1, 2, 3]>;

type Word2<T extends unknown[]> = T['length'];

type last = Word2<[1, 2, 3]>;
