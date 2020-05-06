# choice 选品后台
## 未见过的 css 样式
1. object-fit: fill || contain || cover || none || scale-down
```
.el-image img{
  max-height: 100px;
  object-fit: contain
}
```

2. width: auto

3. !important 使用

4. 选择器
```
- element1,element2 选择所有 element1 和 element2
- element1 element2 选择 element1 内部所有的 element2 元素
- element1 > element2 选择所有父级是 element1 元素的 element2 元素
- element1 + element2 选择所有紧接着 element1 元素之后的 element2 元素
```

5. inline 和 inline-block 是内联布局，既然是内联那么就会受空白区域的影响
设置 font-size: 0 可以让空白区域消失
```
font-size: 0
```

6. SVG  标签
```
<span><svg t="1588101073310" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1142" width="200" height="200"><path d="M198 363.5h-62c-39.7 0-72 32.3-72 72v352c0 39.7 32.3 72 72 72h62c39.7 0 72-32.3 72-72v-352c0-39.7-32.3-72-72-72zM931.7 390c-13.7-16.8-34.1-26.5-55.8-26.5H743.7c4.9-25.1 9-55.5 6-78.6-6-46.6-45.5-100.1-49.9-106-6.8-9-17.5-14.4-28.8-14.4h-94c-9.6 0-18.8 3.8-25.6 10.7-6.8 6.8-10.5 16.1-10.4 25.7 0 0.8-1.7 80.6-86.2 162.6H402c-39.7 0-72 32.3-72 72v352c0 39.7 32.3 72 72 72h401.6c34 0 63.7-24.2 70.5-57.5l72.2-352c4.5-21.3-0.9-43.2-14.6-60z" p-id="1143" fill="#000"></path></svg>{{ parent.name }}</span>
```

7. collapse
```
//  收起
height: height%;
overflow: hidden;

// 展开
height: auto
```
