type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

// type MyOmit<T, K extends keyof T> = {
//   [ k in keyof T as k extends K ? never : k ] : T[k]
// }
