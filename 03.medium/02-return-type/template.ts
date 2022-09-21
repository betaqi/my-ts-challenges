type MyReturnType<T> = T extends (...args: any[]) => infer X ? X : never
