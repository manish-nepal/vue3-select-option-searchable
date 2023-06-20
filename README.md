# Vue 3 select option with search filter


![1](https://github.com/manish-nepal/vue3-select-option-searchable/assets/106729542/8793a9b1-ab8a-4ecb-bd44-ef049bfbf8f9)

![2](https://github.com/manish-nepal/vue3-select-option-searchable/assets/106729542/d23bb9bd-7688-41b6-a315-f8e906dfce9e)

![3](https://github.com/manish-nepal/vue3-select-option-searchable/assets/106729542/d750b7be-4bf5-4fd5-884f-61cf3439d0db)

![4](https://github.com/manish-nepal/vue3-select-option-searchable/assets/106729542/6bff0d13-561e-4980-bf09-999c861d91b8)


**Feature**

Using this package, you can display an array of object on select option list, select a specific object and render its display name.


**Props**  ----- _v-model_, _data_ and _displayName_ are ***REQUIRED***

***placeHolder*** - Default title is **Select Item**, Pass a string you prefer to display initially, such as   'Select company', 'Select user', etc, than after you select an item, selected item's display name will be displayed.

***width*** - By default width is inherited but if you wat to give a specific, just pass a number you like. ***Note*** - measurement will be in **PX** - pixels.

***maxHeight*** - By default maximum height will be **250px**, but if you wat to give a specific, just pass a number you like. ***Note*** - measurement will be in **PX** - pixels.

***inputOutlineColor*** - By default the input outline colour when focused will be the shades of green, but if you want it to look different just pass _color name_, _hex code_ or _rgba value_ of your choice on string like ***inputOutlineColor="'_red_'"***.

***inputBorderColor*** - By default the input border colour will be gray, but if you want it to look different just pass _color name_, _hex code_ or _rgba value_ of your choice on string like ***inputBorderColor="'_yellow_'"***.

***selected*** - If you want to pass a default value to render initially, you can pass an object to _selected_ prop like **<select-option selected="{id: 1, name: Sita}"/>**

***data*** - To render your items on a list, just pass array of objects,  ***Note***: only pass array of objects.

***v-model*** - Pass a variable to store a selected object. For example, if you may want to store 
selected object or item on a variable like this **const selectedItem = ref({})** or **const selectedItem = reactive({})**, just pass **selectedItem** to **v-model** like **v-model="selectedItem"**

***displayName*** - Pass a prop as string to displayName for example  **displayName="'name'"**, in this case name should be a field inside a object you passed on data array, like as 
**data = [{id: 1, name: abc, age: 50}, {id: 2, name: def, age: 25}]**, So now on this object, except for _id_, _name_ and _age_, if you mis-spell or pass a string which is not a field of a object on array, the package will not render anyhing on a modal list.


### Usage

- ## You should globally import this package and it's style on main.js, also you should use it on App, like

```vue

import SelectOption from 'vue3-select-option-searchablee'
import "vue3-select-option-searchablee/dist/style.css"

createApp(App).use(SelectOption).mount('#app')

```

- ## Alternatively 

```vue

import SelectOption from 'vue3-select-option-searchablee'
import "vue3-select-option-searchablee/dist/style.css"

const app = createApp(App);

app.use(SelectOption);

app.mount('#app')

```



```vue

<script setup>
import { ref } from 'vue';

const data = [
  {id: 1, name: 'Ram'},
  {id: 2, name: 'Shyam'},
  {id: 3, name: 'Hari'},
  {id: 4, name: 'Krishna'},
  {id: 5, name: 'Balram'},
  {id: 6, name: 'Arjun'},
]

const selectedItem = ref({})

</script>

<template>
  
  <main>

    <select-option
      :placeHolder="'select item'"
      :width="500"
      v-model="selectedItem"
      :maxHeight="400"
      :inputOutlineColor="'#86efac'"
      :data="data"
      :inputBorderColor="'gray'"
      :displayName="'name'"
      :selected="data[0]"
    />

    <p v-if="!!selectedItem.name">{{ selectedItem.name }}</p>
  </main>
</template>

<style scoped>

</style>


```