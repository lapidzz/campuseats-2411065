# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
= Imperative refers to me creating and updating each DOM element myself. Declarative refers to me describing how the UI is supposed to look, and React taking care of updating it for me.

2. Why must a component name start with a capital letter?
= This means that React will be able to differentiate between my component and an ordinary HTML elements .

3. What does a fragment <>...</> do, and why not just use a <div>?
= It combines several elements without introducing another element into the DOM. Using `<div>` introduces an unnecessary wrapper which may mess up the layout of my CSS code.

4. Name one benefit of splitting the UI into small components.
= The code becomes reusable and more readable as each part only does one thing.
