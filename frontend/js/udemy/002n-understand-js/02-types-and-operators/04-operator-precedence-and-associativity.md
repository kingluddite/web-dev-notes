# Operator Precedence and Associativity

## Operator Precedence
* Which operator function gets called first
* Functions are called in order of precedence
* HIGHER precedence wins!

## Associativity
* What order operator functions get called in:
    - Left-to-right (left associativity) or right-to-left (right associativity)
* When functions have the same precedence
* If my operators all have the same precedence how do I know what to do first?
    - The associativity of that operator will tell me to call the functions left to right or right to left

```
var a = 3 + 4 * 5;
console.log(a); // 23
```

* **Remember** that this is two function calls
* JavaScript is synchronous so it won't do the functions simultaneously
    - It needs to call each function one at a time
    - Which one gets called first?

## [JavaScript Operator Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

<table class="fullwidth-table">
 <tbody>
  <tr>
   <th>Precedence</th>
   <th>Operator type</th>
   <th>Associativity</th>
   <th>Individual operators</th>
  </tr>
  <tr>
   <td>20</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Grouping" title="The grouping operator ( ) controls the precedence of evaluation in expressions."><code>Grouping</code></a></td>
   <td>n/a</td>
   <td><code>( … )</code></td>
  </tr>
  <tr>
   <td rowspan="3">19</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors#Dot_notation" title="Property accessors provide access to an object's properties by using the dot notation or the bracket notation."><code>Member Access</code></a></td>
   <td>left-to-right</td>
   <td><code>… . …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors#Bracket_notation" title="Property accessors provide access to an object's properties by using the dot notation or the bracket notation."><code>Computed Member Access</code></a></td>
   <td>left-to-right</td>
   <td><code>… [ … ]</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/new" title="The new operator creates an instance of a user-defined object type or of one of the built-in object types that has a constructor function."><code>new</code></a> (with argument list)</td>
   <td>n/a</td>
   <td><code>new … ( … )</code></td>
  </tr>
  <tr>
   <td rowspan="2">18</td>
   <td><a href="/en-US/docs/Web/JavaScript/Guide/Functions">Function Call</a></td>
   <td>left-to-right</td>
   <td><code>… (&nbsp;<var>…&nbsp;</var>)</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/new" title="The new operator creates an instance of a user-defined object type or of one of the built-in object types that has a constructor function."><code>new</code></a>&nbsp;(without argument list)</td>
   <td>right-to-left</td>
   <td><code>new …</code></td>
  </tr>
  <tr>
   <td rowspan="2">17</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment" title="Arithmetic operators take numerical values (either literals or variables) as their operands and return a single numerical value. The standard arithmetic operators are addition (+), subtraction (-), multiplication (*), and division (/)."><code>Postfix Increment</code></a></td>
   <td>n/a</td>
   <td><code>… ++</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement" title="Arithmetic operators take numerical values (either literals or variables) as their operands and return a single numerical value. The standard arithmetic operators are addition (+), subtraction (-), multiplication (*), and division (/)."><code>Postfix Decrement</code></a></td>
   <td>n/a</td>
   <td><code>… --</code></td>
  </tr>
  <tr>
   <td rowspan="9">16</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_NOT">Logical NOT</a></td>
   <td>right-to-left</td>
   <td><code>! …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT">Bitwise NOT</a></td>
   <td>right-to-left</td>
   <td><code>~ …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus">Unary Plus</a></td>
   <td>right-to-left</td>
   <td><code>+ …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_negation">Unary Negation</a></td>
   <td>right-to-left</td>
   <td><code>- …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment">Prefix Increment</a></td>
   <td>right-to-left</td>
   <td><code>++ …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement">Prefix Decrement</a></td>
   <td>right-to-left</td>
   <td><code>-- …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a></td>
   <td>right-to-left</td>
   <td><code>typeof …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/void">void</a></td>
   <td>right-to-left</td>
   <td><code>void …</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/delete">delete</a></td>
   <td>right-to-left</td>
   <td><code>delete …</code></td>
  </tr>
  <tr>
   <td>15</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation">Exponentiation</a></td>
   <td>right-to-left</td>
   <td><code>… ** …</code></td>
  </tr>
  <tr>
   <td rowspan="3">14</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Multiplication">Multiplication</a></td>
   <td>left-to-right</td>
   <td><code>… *&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Division">Division</a></td>
   <td>left-to-right</td>
   <td><code>… /&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder">Remainder</a></td>
   <td>left-to-right</td>
   <td><code>… %&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="2">13</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Addition">Addition</a></td>
   <td>left-to-right</td>
   <td><code>… +&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Subtraction">Subtraction</a></td>
   <td>left-to-right</td>
   <td><code>… -&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="3">12</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">Bitwise Left Shift</a></td>
   <td>left-to-right</td>
   <td><code>… &lt;&lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">Bitwise Right Shift</a></td>
   <td>left-to-right</td>
   <td><code>… &gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">Bitwise Unsigned Right Shift</a></td>
   <td>left-to-right</td>
   <td><code>… &gt;&gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="6">11</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Less_than_operator">Less Than</a></td>
   <td>left-to-right</td>
   <td><code>… &lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Less_than__or_equal_operator">Less Than Or Equal</a></td>
   <td>left-to-right</td>
   <td><code>… &lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Greater_than_operator">Greater Than</a></td>
   <td>left-to-right</td>
   <td><code>… &gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Greater_than_or_equal_operator">Greater Than Or Equal</a></td>
   <td>left-to-right</td>
   <td><code>… &gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/in">in</a></td>
   <td>left-to-right</td>
   <td><code>… in&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/instanceof">instanceof</a></td>
   <td>left-to-right</td>
   <td><code>… instanceof&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="4">10</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality">Equality</a></td>
   <td>left-to-right</td>
   <td><code>… ==&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Inequality">Inequality</a></td>
   <td>left-to-right</td>
   <td><code>… !=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity">Strict Equality</a></td>
   <td>left-to-right</td>
   <td><code>… ===&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Nonidentity">Strict Inequality</a></td>
   <td>left-to-right</td>
   <td><code>… !==&nbsp;…</code></td>
  </tr>
  <tr>
   <td>9</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND">Bitwise AND</a></td>
   <td>left-to-right</td>
   <td><code>… &amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>8</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR">Bitwise XOR</a></td>
   <td>left-to-right</td>
   <td><code>… ^&nbsp;…</code></td>
  </tr>
  <tr>
   <td>7</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR">Bitwise OR</a></td>
   <td>left-to-right</td>
   <td><code>… |&nbsp;…</code></td>
  </tr>
  <tr>
   <td>6</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_AND">Logical AND</a></td>
   <td>left-to-right</td>
   <td><code>… &amp;&amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>5</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_OR">Logical OR</a></td>
   <td>left-to-right</td>
   <td><code>… ||&nbsp;…</code></td>
  </tr>
  <tr>
   <td>4</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator">Conditional</a></td>
   <td>right-to-left</td>
   <td><code>… ? … : …</code></td>
  </tr>
  <tr>
   <td rowspan="13">3</td>
   <td rowspan="13"><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators">Assignment</a></td>
   <td rowspan="13">right-to-left</td>
   <td><code>… =&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… +=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… -=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… **=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… *=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… /=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… %=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &lt;&lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &amp;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… ^=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… |=&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="2">2</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/yield">yield</a></td>
   <td>right-to-left</td>
   <td><code>yield&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/yield*">yield*</a></td>
   <td>right-to-left</td>
   <td><code>yield*&nbsp;…</code></td>
  </tr>
  <tr>
   <td>1</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator">Spread</a></td>
   <td>n/a</td>
   <td><code>...</code>&nbsp;…</td>
  </tr>
  <tr>
   <td>0</td>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator">Comma / Sequence</a></td>
   <td>left-to-right</td>
   <td><code>… ,&nbsp;…</code></td>
  </tr>
 </tbody>
</table>

## Back to our example
* The function with the higher precedence gets called first
* You see the large number of **operators** in JavaScript
* ... `*` ... (_three dots `...`just mean other code around it_)


```
var a = 3 + 4 * 5;
console.log(a); // 23
```

* Looking at the chart we see `*` has a precedence of **14** and `+` has a precedence of **13**, so the multiply function gets executed first
* So `4 * 5` is invoked first and returns **20**
* Then the `3 + 20` function is invoked and returns **23**

```
var a = 2, b = 3, c = 4;

a = b = c;

console.log(a); // 4
console.log(b); // 4
console.log(c); // 4
```

Why are they all equal to 4?
Because of Associativity

* Check out the Associativity column in the above chart
* Associativity means the operator farthest to the right or farthest to the left will be called first
* The `=` operator is right associative

![right to left =](https://i.imgur.com/cQx3oHA.png)

* So in `a = b = c;` we call `b = c;` first
    - So we set `b` = `c` and since c = 4 then be = 4
    - Then we do a = b and that makes a = 4 too
* We said operators take 2 parameters and return 1 value, what does the equal operator return?
* `b = c` returns a `4` and so `a = 4` and we just set a = 4 because that is what `b = c` returned

### Grouping is the top of the Precedence table
* Whatever is inside parentheses gets run first

```
var a = (3 + 4) * 5; 
console.log(a); // 35
```
