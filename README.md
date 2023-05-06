<h1 align='center'>My Type Challenges</h1>

**介绍**

这是我学习Type Script 的记录，希望它对你有所帮助

类型体操来自[type-challenges](https://github.com/type-challenges/type-challenges)它对我学习typescript提供了很大的帮助

**学习目标**

- [x] 完成[type-challenges](https://github.com/type-challenges/type-challenges)easy
- [ ] 完成[type-challenges](https://github.com/type-challenges/type-challenges)medium
- [x] Utility Types 实现

**下面是我对 Type Script 文档中 Utility Types 的理解和内部实现**

#### Utility Types

#### Awaited<Type>

```typescript

    
```

#### Partial<Type>	

```typescript
// zh: 不完全的，部分的
// 描述: 构造一个所有属性都为可选类型的Type。它将返回<给定类型>的所有子集的类型
// err描述: 'fieldsToUpdate' 参数只能传入interface Todo 的子集

interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
  externalities: "throw error" ==> ts err
});

// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyPartial<T> = {
    [ K in keyof T]? : T[K]
}
```

#### Required<Type>

```typescript
// zh: 必需的
// 描述:  构造一个所有属性都为必选类型的Type, 它和 Partial<Type> 相反
// err描述: 新的类型 Required<给定类型> 给定类型都转为必有的
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 }; ==> ts err

// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyRequired<T> = {
    [ K in keyof T]-? : T[K]
}
```

#### Readonly<Type>

```typescript
// zh: 只读的
// 描述: 构造一个所有属性都为只读的Type, 你可以将它理解为Object.freeze()
// err描述: title 属性为只读
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello"; ==> ts err

// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyReadonly<T> = {
    readonly [ K in keyof T] : T[K]
}
```

#### Record<Keys, Type>

```typescript
// zh: 记录，记载
// 描述: 构造一个对象类型，其属性键为Keys，值为Type。
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

console.log(cats.boris) // { age: 5, breed: "Maine Coon" }

// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyRecord<Keys extends PropertyKey, Type> = {
    [ K in Keys] : Type
}

```

#### Pick<Type, Keys>

```typescript
// zh: 采，摘
// 描述: 通过从 Keys(Union) 选取 Type的 属性集（这些属性集必须在 Type<PropertyKey> 中）来构造新的类型
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed" | "ccc">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyPick<Type, Keys extends keyof Type> = {
    [ K in Keys] : Type[K]
}
```

#### Omit<Type, Keys>

```typescript
// zh: 省去，遗漏；不做
// 描述: 通过从 Keys(Union) 删除 Type 内部属性来构造新的类型
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
 
todo;
 
const todo: TodoPreview
 
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyOmit<Type, Keys> = {
    [K in keyof Type as K extends Keys ? never : K] : Type[K]
}
```

#### Exclude<UnionType, ExcludedMembers>

```typescript
// zh: 不包括，把……排除在外
// 描述:  通过 ExcludedMembers(Union) 删除 UnionType 中的类型来构造一个新的类型
type T0 = Exclude<"a" | "b" | "c", "a">;	as  type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;	as  type T1 = "c"
  
type T2 = Exclude<string | number | (() => void), Function>;	as  type T2 = string | number
// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyExclude<UnionType, ExcludedMembers extends UnionType > = UnionType extends ExcludedMembers ? never : UnionType 
```

#### Extract<Type, Union>

```typescript
// zh: 提取，取出,
// 描述:  通过 Union 在 Type 的所有联合成员中提取来构造类型
type T0 = Extract<"a" | "b" | "c", "a" | "f">;	 as type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>;	as  type T1 = () => void

// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyExtract<Type, Union> = Type extends Union ? Type : never 
```

#### NonNullable<Type>

```typescript
// zh: 非空
// 描述:
type T0 = NonNullable<string | number | undefined>;		as type T0 = string | number
     
type T1 = NonNullable<string[] | null | undefined>;		as type T1 = string[]

// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyNonNullable<Type> = Type & {}
```

#### Parameters<Type>

```typescript
// zh: 参数, 界限，规范；
// 描述: 从函数类型的参数中使用的类型来构造一个元组类型
declare function f1(arg: { a: number; b: string }): void;
 
type T0 = Parameters<() => string>;
     
type T0 = []
type T1 = Parameters<(s: string) => void>;
     
type T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>;
     
type T2 = [arg: unknown]
type T3 = Parameters<typeof f1>;  as type T3 = [arg: { a: number; b: string;}]

type T4 = Parameters<any>;
     
type T4 = unknown[]
type T5 = Parameters<never>;
     
type T5 = never
type T6 = Parameters<string>;  // tserr: Type 'string' does not satisfy the constraint '(...args: any) => any'.
	as type T6 = neve     

type T6 = never
type T7 = Parameters<Function>  // tserr: Type 'Function' does not satisfy the constraint '(...args: any) => any'.
	type T7 = neve 			  // tserr: Type 'Function' provides no match for the signature '(...args: any): any'.

// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyParameters<Type extends (...arg) => any> = Type extends (...arg: infer P) => any ? P : never 
```

#### ReturnType<Type>

```typescript
// 描述: 通过函数返回值的类型来构造一个类型
declare function f1(): { a: number; b: string };
 
type T0 = ReturnType<() => string>;  	as type T0 = string
     
type T1 = ReturnType<(s: string) => void>; 	as type T1 = void

type T2 = ReturnType<<T>() => T>;	type T2 = unknown

type T3 = ReturnType<<T extends U, U extends number[]>() => T>;		type T3 = number[]

type T4 = ReturnType<typeof f1>;	as type T4 = { a: number; b: string; }

type T5 = ReturnType<any>;		as type T5 = any

type T6 = ReturnType<never>;	as type T6 = never

type T7 = ReturnType<string>;	//tserr: Type 'string' does not satisfy the constraint '(...args: any) => any'.
	type T7 = any

type T8 = ReturnType<Function>; // tserr: Type 'Function' does not satisfy the constraint '(...args: any) => any'.
  							 // tserr: Type 'Function' provides no match for the signature '(...args: any): any'.
     type T8 = any
// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyReturnType<Type extends (...arg: any) => unknown> = Type extends (...arg: any) => infer P ? P : never 
```
