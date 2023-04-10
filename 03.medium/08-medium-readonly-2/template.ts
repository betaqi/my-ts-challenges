type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
};

// ================ 等价 ================

// type MyReadonly<T, K extends keyof T = keyof T> = {
//   [C in keyof T as C extends K ? never : C]: T[C]
// }

// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   readonly [P in K]: T[P]
// } & MyReadonly<T, K>