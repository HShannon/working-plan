#### el, target, source, sibling
the following signature: (el, target, source, sibling) It'll be called to make sure that an element **el**, that came from container **source**, can be dropped on container **target** before a **sibling** element. The sibling can be null, which would mean that the element would be placed as the last element in the container. 
***

#### 引入css样式
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

### Question: Failed to execute 'insertBefore' on 'Node': The new child element contains the parent.

解决方案
```
To prevent the "Uncaught HierarchyRequestError: Failed to execute 'insertBefore' on 'Node': The new child element contains the parent." error, just make the selected element's shadow reject all mouse events:

.gu-transit {
pointer-events: none;
}
```