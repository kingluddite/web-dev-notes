# Enums
## What is an Enum?
* It is its own type
* An Enum allows us to define a named constants (as in a list of things that are the only values)
    - Often used in a select list or named categories

```
enum Type {
  Video,
  BlogPost,
  Quiz
};

console.log(Type.Quiz); // 2
```

* Above output 2 (0, 1, 2 and that is why it is 2)

## Here we get an error
```
enum Type {
  Video,
  BlogPost,
  Quiz
};

const createContent = (contentType: Type) => {};
createContent('Video'); // This causes an error
```

## Fix
```
enum Type {
  Video,
  BlogPost,
  Quiz
};

const createContent = (contentType: Type) => { };
createContent(Type.Video);
```

* This makes sure the value entered is exactly what we expect (so no `video` is accepted only `Video`)

## Numeric Enum
```
enum Type {
  Video, // 0
  BlogPost, // 1
  Quiz // 2
};
```

## Let's create a String Enum
* Code standard for Enum strings is UPPERCASE

```
enum TypeTwo {
  Video = 'VIDEO',
  BlogPost = 'BLOG_POST',
  Quiz = 'QUIZ'
};

const createContent = (contentType: TypeTwo) => { };
createContent(TypeTwo.Video);
console.log(TypeTwo.Quiz);
```

* Enums prevent you values that you aren't expecting being used in the code
