/*
HTML Code:

<body>
    <div class="grandParent">

        <div class="js-parent">

            <!-- <div class="child">USING HTML</div> -->

        </div>
        <div class="react-parent">

        </div>
    </div>
</body>

*/




import React from "react"
import ReactDOM from "react-dom/client"


//Way to show content Using Javascript 
let parent = document.querySelector('.js-parent');
let jsDIV = document.createElement('div');
jsDIV.classList.add('js-child');
jsDIV.innerHTML = 'using Javascript'
parent.appendChild(jsDIV);


//Way to show content using React

//as we do in js in React also we do createElement which have attributes and content. so, here also we have createElement method in React, (React we'll access through CDN or installing from npm package)


let reactElement = React.createElement('div', { className: 'react-child' }, 'using React');

/*
Q. Can we use append method here also? No. bcoz React.createElement function return reactElement in form of js object, whereas append take htmlElement as argument.


if u see in browser u still get ---> <div class= "react-child">using react</div>
*/

let root = ReactDOM.createRoot(document.querySelector('.react-parent'));

//now we take ReactDOM into picture which creates root or enter point for our app, so ReactDOM.createRoot takes HTML element as an argument which we considered as a root, now this function will also return js object.

root.render(reactElement);

//now root have render method which takes reactElement as argument, & converts it into HTML elements that the browser can display.
console.log(reactElement)

//summary -> reactElement ~ jsObject  -> (render) -> HTMLELEMENT


//In todays world we write code in form of jsx
let jsxElement = <div class="react-child">using React</div>  //content visible
console.log(jsxElement)

// Return React element, (babel converting jsx code to react while writing)

const App = () => {
    return <div>Hello React</div>   // why content not visible, bcoz we need to render it
}

console.log(<App />)
console.log(<App></App>)
console.log(App())




/*
Notes:

1. ReactDOM: 

ReactDOM.createRoot: This function creates a new React root, which is the entry point for rendering React elements into the DOM. It takes one argument:

Importance of ReactDOM: React and Browser are independent from each other to make them communicate we need ReactDOM, Browser only understand HTML, CSS & JS 

Eventually, ReactDOM converts reactElement to HTML element so that the browser can display. (using render method)
