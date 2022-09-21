type TupleToObject<T extends readonly (string | number)[]> = {
  [k in T[number]]: k;
};
// PropertyKey

const tupleTest = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type bject<T> = {
  [k in keyof T]: k;
};

// keyof array => 索引 ["0", "1", "2", "3"]
type r = bject<typeof tupleTest>;

type num = [1, 2, 3];
type t1 = num[number]; //type t1 = 3 | 1 | 2
