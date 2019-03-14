#### el, target, source, sibling
the following signature: (el, target, source, sibling) It'll be called to make sure that an element **el**, that came from container **source**, can be dropped on container **target** before a **sibling** element. The sibling can be null, which would mean that the element would be placed as the last element in the container. 
***

#### 1. 引入css样式
```
<style>
@import '../node_modules/dragula/dist/dragula.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
***

### 2. Question: Failed to execute 'insertBefore' on 'Node': The new child element contains the parent.

解决方案
```
To prevent the "Uncaught HierarchyRequestError: Failed to execute 'insertBefore' on 'Node': The new child element contains the parent." error, just make the selected element's shadow reject all mouse events:

.gu-transit {
  pointer-events: none;
}
```

#### 3. dragula(containers?, option?)
```
dragula(containers, {
  isContainer: function (el) {
    return false; // only elements in drake.containers will be taken into account
  },
  moves: function (el, source, handle, sibling) {
    return true; // elements are always draggable by default
  },
  accepts: function (el, target, source, sibling) {
    return true; // elements can be dropped in any of the `containers` by default
  },
  invalid: function (el, handle) {
    return false; // don't prevent any drags from initiating by default
  },
  direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
  copy: false,                       // elements are moved by default, not copied
  copySortSource: false,             // elements in copy-source containers can be reordered
  revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
  removeOnSpill: false,              // spilling will `.remove` the element, if this is true
  mirrorContainer: document.body,    // set the element that gets mirror elements appended
  ignoreInputTextSelection: true     // allows users to select input text, see details below
});
```