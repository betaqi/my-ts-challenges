// type Chainable = {
//   option(key: string, value: any): any
//   get(): any
// }

// type Chainable<T = {}> = {
//   option<Key extends string, Value>
//      (key: Key extends keyof T ? never : Key, value: Value) : Chainable<T & Record<Key, Value>>
//   get(): T
// }

// type Chainable<Opts extends Record<string, any> = {}> = {
//   option<K extends string, V>(
//     key: K extends keyof Opts ? (V extends Opts[K] ? never : K) : K,
//     value: V
//   ): Chainable<Omit<Opts, K> & { [Key in K]: V }>
//   get(): Opts
// }


// 你的答案
type Chainable<T = {}> = {
  option<Key extends string, Value>(
    key: Key extends keyof T ? never : Key,
    value: Value,
  ): Chainable<T & Record<Key, Value>>
  get(): T
}

//* 如何约束方法传参？在方法名后添加尖括号。option(key, value) => option<Key, Value>(key, value)
//* 如何约束方法传参为string？option<Key, Value>(key, value) => option<Key extends string, Value>(key, value)
//* 如何返回上一次option的结果？泛型T与Record<Key, Value>的组合类型，并且返回Chainable<组合类型>的计算结果。类似于return this
//* 如何获取最新的类型？T即可。因为当调用get()时，实际上是最后一次的Chainable，这里的T，已经是多次option组合计算后的结果了