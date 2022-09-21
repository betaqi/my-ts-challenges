type MyParameters<T extends (...args: any[]) => any> = T extends (...args:  infer X) => any ? X : never 


const foo2 = (arg1: string, arg2: number): void => {}
const bar2 = (arg1: boolean, arg2: { a: 'A' }): void => {}
type a = MyParameters<typeof bar2>