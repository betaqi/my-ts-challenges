type Includes<T extends readonly any[], U> = T extends [infer Fir, ...infer Rest]
  ? (<M>() => M extends Fir ? 1 : 2) extends <M>() => M extends U ? 1 : 2
    ? true
    : Includes<Rest, U>
  : false;
