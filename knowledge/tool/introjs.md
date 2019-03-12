
1. Basic Usage
    + npm install intro.js
    + import 'intro.js/minified/introjs.min.css'
    + const introJS = require("intro.js")
    + introJS.introJs().start()
    + data-intro="This is a table"
2. Improved Usage (yidian site)
```
activeName(newVal, oldVal) {
  let intro_index = localStorage.getItem("edit_intro_index")
    ? localStorage.getItem("edit_intro_index")
    : 0;
  if (intro_index < intros.length && newVal === "second") {
    // 组件添加指引
    intros.forEach((intro, index) => {
      const element = document.querySelector(intro.el);
      element.dataset.step = index + 1;
      element.dataset.intro = intro.content;
    });

    localStorage.setItem("edit_intro_index", intros.length);
    introJs()
      .setOptions({
        nextLabel: "前进",
        prevLabel: "后退",
        doneLabel: "结束",
        skipLabel: "跳过",
        showBullets: false
      })
      .goToStepNumber(++intro_index)
      .start();
  }
}
```
