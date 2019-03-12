#### vue 引入 bootstrape

1. webpack.base.conf.js
    + webpack alias
    ```
    module.exports = {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
      　　'vue$': 'vue/dist/vue.esm.js',
      　　'@': resolve('src'),
      　　'bootstrap':resolve('node_modules/bootstrap'),
        }
      },
    }
    ```

    + plugin
    ```
    module.exports = {
        plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "windows.jQuery":"jquery"
        })
      ],
    } 
    ```

3. main.js
```
import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.js'
```

