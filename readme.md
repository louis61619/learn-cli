# 說明文檔

如何安装？

```shell
npm install rennycreatevue -g
```

## 創建項目


创建项目

```shell
renny create your_project_name
```



## 項目開發




### 創建VUE組件：

````shell
renny addcpn YourComponentName 
renny addcpn YourComponentName -d src/pages/home 
````



### 創建VUE頁面，配置路由

```shell
renny addpage YourPageName
renny addpage YourPageName -d src/views
```


```js
// 動態加載路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```



### 創建VUEX子模塊

```shell
coderwhy addstore YourVuexChildModuleName 
coderwhy addstore YourVuexChildModuleName -d src/vuex/modules 
```


```js
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
```