// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;

type First<T extends any[]> = T extends [infer First, ...infer Rest] ? First : never;

type f = [1, 2, 3];
type f1 = f[number]; //type f1 = 3 | 1 | 2
type f2 = 1 extends f1 ? 'true' : 'false';
