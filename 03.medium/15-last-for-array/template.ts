type Last<T extends any[]> = T extends [...infer arg, infer Last] ? Last : never