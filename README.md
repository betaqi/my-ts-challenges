<h1 align='center'>My Type Challenges</h1>

**介绍**

这是我学习Type Script 的记录，希望它对你有所帮助

类型体操来自[type-challenges](https://github.com/type-challenges/type-challenges)它对我学习typescript提高了很大的帮助

**学习目标**

- [x] 完成[type-challenges](https://github.com/type-challenges/type-challenges)easy
- [ ] 完成[type-challenges](https://github.com/type-challenges/type-challenges)medium
- [ ] Utility Types 实现

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
// 描述: 构造一个由所有属性组成的类型, 它和 Partial<Type> 相反
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
// 描述: 构造一个对象类型，其属性键为Keys ，其属性值为Type。此实用工具可用于将一个类型的属性映射到另一个类型
// err描述: 无
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
// 描述: 通过从泛型 Keys 中选取属性集（字符串文本或字符串文本的联合）来构造新的类型
// err描述: 
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
// ===内部实现===  ps: 内部实现未经过真实的test-case如过有错误请提交pr修正谢谢！
type MyPick<Type, Keys extends keyof Types> = {
    [ K in Keys] : Type[K]
}
```

