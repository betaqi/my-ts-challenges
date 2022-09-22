type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};

type Test<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? 'a' : 'b';
};
type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
  };
};
type a = Test<X>;

type fn = [];
type aa = keyof fn extends never ? 'a' : 'b';
