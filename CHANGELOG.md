#### 2.0.1 (2019-05-29)

##### Bug Fixes

* **build:**
  *  load customized polyfills.js file [closes#14] (208dec2c)

## 2.0.0 (2019-05-29)

##### Breaking Changes

* **ngx8:**  update to version angular 8 [closes#13] (08faea8b)

#### 1.2.1 (2019-05-26)

##### Bug Fixes

* **build:**  id was used from package.json (c38c39d8)

### 1.2.0 (2019-05-26)

##### New Features

* **build:**  read out project name from process.args to for dynamic extension names [closes#10] (77463f37)
* **extension:**  add simple kpi extension [closes#9] (65457a57)

#### 1.1.1 (2019-05-24)

##### Bug Fixes

* **deploy:**  hotfix host not localhost by default (0655b6bf)

### 1.1.0 (2019-05-24)

##### New Features

* **build:**  entry points read dynamically, move logic into plugin [closes#4] (a76454d5)
* **deploy:**  copy extension to desktop, rename ci plugin to deploy extension plugin [closes#5] (1f3c0d5d)

##### Bug Fixes

* **build:**  fixed jsonpFunction namespace to load multiple webpack files [closes#6] (289f28bd)

#### 1.0.1 (2019-05-23)

##### New Features

* **ci:**  automatic qrs import / update [closes#1] (1b9d12b9)
* **build:**  zip extension files [closes#2] (c96fb57a)
