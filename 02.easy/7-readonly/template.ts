type MyReadonly<T> = {
  readonly [t in keyof T]: T[t];
};
