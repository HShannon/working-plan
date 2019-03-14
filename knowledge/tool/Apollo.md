#### 一. Node.js - jsonfile
Writing JSON.stringify() and then fs.writeFile() and JSON.parse() with fs.readFile() enclosed in try/catch blocks became annoying.
***

#### 二. 容灾
1.  node-apollo([node-apollo官网](https://github.com/Quinton/node-apollo))
```
class Apollo {
  constructor (time) {
    apollo.remoteConfigServiceFromCache(apollo_config)
      .then(bundle => {
        this.config = bundle
        jsonfile.writeFile(file, bundle, (err) => {
          if (err) console.log(err)
        })
        this.roll(time)
      }).catch((err) => {
        jsonfile.readFile(file)
          .then(bundle => {
            this.config = bundle
            this.roll(time * 5)
          }).catch(err => {
            console.log(err)
          })
        console.log(err)
      })
  },

  roll (time = 60) {
    setTimeout(() => {
      apollo.remoteConfigServiceFromCache(apollo_config).
        .then(bundle => {
          this.config = Object.assign(this.config, bundle)
          this.roll(time)
        }).catch(err => {
          console.log(err)
          this.roll(time)
        })
    }, time * 1000)
  }
}
```
