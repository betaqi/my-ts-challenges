type Pop<T extends any[]> = T['length'] extends 0  ? [] : T extends [...infer Arg, infer L] ? Arg : never