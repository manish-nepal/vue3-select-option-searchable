<template>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div :style="selectDropdownStyles">
        <div style="position: relative;">
            <div class="input-container" :style="inputBorderColor">
                <input type="text" ref="inputRef" :placeholder="placeHolder ? placeHolder : 'Select Item'"
                    v-model="selectedItem[selectOptionProps.displayName]" @input="handleSearch" @click="handleInput" @keydown.enter="handleEnter"
                    @keydown.escape="handleEscape" @keydown.arrow-up.prevent="moveHighlight('up')"
                    @keydown.arrow-down.prevent="moveHighlight('down')" @blur="handleBlur" style="
                        padding: 8px;
                        padding-right: 16px;
                        outline-color: #86efac;
                        border: none;
                        width: inherit;
                        " :style="inputOutlineColor">
                <div class="clear-icon" v-if="selectedItem[selectOptionProps.displayName]" @click="clearSearch">
                    <span class="material-symbols-outlined">close</span>
                </div>
                <div @click="handleInput" class="chevron-icon">
                    <span class="material-symbols-outlined">expand_more</span>
                </div>
            </div>
        </div>
        <ul v-show="isOpen" class="shadow-2xl list-container" :style="selectDropdownStyles">
            <li v-for="(item, index) in filteredData" :key="index" @mousedown.prevent.stop @click="handleSelect(item)"
                @mouseover="highlightedIndex = index" class="list-item"
                :class="{ 'highlighted-list-item': highlightedIndex === index }">
                {{ item[selectOptionProps.displayName] }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';


const selectOptionProps = defineProps({
    placeHolder: {
        type: String,
    },
    width: {
        type: Number,
    },
    maxHeight: {
        type: Number,
    },
    inputOutlineColor: {
        type: String,
    },
    inputBorderColor: {
        type: String,
    },
    selected: {
        type: Object
    },
    modelValue: {
        type: Object,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    displayName: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['update:modelValue']);

const selectDropdownStyles = computed(() => {
    return {
        width: selectOptionProps.width ? `${selectOptionProps.width}px` : '',
        backgroundColor: 'white',
        'max-height': !!selectOptionProps.maxHeight ? `${selectOptionProps.maxHeight}px` : '250px'
    }
});

const inputOutlineColor = computed(() => {
    return {
        'outline-color': !!selectOptionProps.inputOutlineColor ? selectOptionProps.inputOutlineColor : '#86efac'
    }
})

const inputBorderColor = computed(() => {
    return {
        border: !!selectOptionProps.inputBorderColor ? `1px solid ${selectOptionProps.inputBorderColor}` : '1px solid  rgb(209 213 219)'
    }
})

let selectedItem = ref(selectOptionProps.selected);
let filteredData = ref([])
const inputRef = ref(null);
let searchInput = ref('');
const isOpen = ref(false);
const highlightedIndex = ref(-1);

const handleInput = () => {
    inputRef.value.focus();
    isOpen.value = true;
    highlightedIndex.value = -1;
}

const handleEnter = () => {
    if (highlightedIndex.value >= 0 && highlightedIndex.value < selectOptionProps.data.length) {
        handleSelect(selectOptionProps.data[highlightedIndex.value]);
    }
}

const handleEscape = () => {
    isOpen.value = false;
    inputRef.value.blur();
    highlightedIndex.value = -1;
}

const handleSearch = (event) => {
    searchInput.value = event.target.value;
}

const handleSelect = (item) => {
    if (!!item) {
        isOpen.value = false;
        selectedItem.value = item;
        highlightedIndex.value = -1;
        inputRef.value.blur();
        emits('update:modelValue', item);
        filteredData.value = selectOptionProps.data;
        searchInput.value = '';
    } else {
        isOpen.value = false;
    }
}

const handleBlur = () => {
    isOpen.value = false;
}

const clearSearch = () => {
    searchInput.value = "";
    selectedItem.value = {};
    filteredData.value = selectOptionProps.data;
    inputRef.value.focus();
    isOpen.value = true;
    emits('update:modelValue', {})
}

function moveHighlight(direction) {
    if (!isOpen.value) {
        isOpen.value = true;
    } else {
        direction === 'up' ? highlightedIndex.value-- : highlightedIndex.value++;
        if (highlightedIndex.value < 0) {
            highlightedIndex.value = selectOptionProps.data.length - 1;
        } else if (highlightedIndex.value >= selectOptionProps.data.length) {
            highlightedIndex.value = 0;
        }
    }
}

watch(searchInput, (newSearchInput) => {
    if (newSearchInput) {
        let searchData = filteredData.value.filter(item => {
            return item[selectOptionProps.displayName].toLowerCase().includes(searchInput.value.toLowerCase()) ? item : undefined;
        })
        filteredData.value = searchData
    } else {
        filteredData.value = selectOptionProps.data
    }
}, { immediate: true })

onMounted(() => {
    filteredData.value = selectOptionProps.data;
})
</script>

<style lang="css" scoped>
.input-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(209 213 219);
    border-radius: 2px;
    width: 100%;
    position: relative;
    background-color: white;

}

.input-container:focus {
    outline-color: #86efac;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.focus {
    outline-color: #86efac;
}

.chevron-icon {
    padding: 4px;
    position: absolute;
    background-color: rgb(229 231 235);
    margin-left: 8px;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
}

.chevron-icon:hover {
    background-color: rgb(209 213 219);
}

.list-container {
    position: absolute;
    z-index: 10;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: auto;
    margin-top: 4px;
    background-color: white;
    border-radius: 6px;
}

.list-item {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 36px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    user-select: none;
}

.list-item:hover {
    background-color: rgb(243 244 246);
    color: rgb(34 197 94);
}

.highlighted-list-item {
    background-color: rgb(243 244 246);
    color: rgb(34 197 94);
}

.shadow-2xl {
    --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.clear-icon {
    position: absolute;
    right: 7%;
    top: 10%;
    bottom: 0;
    cursor: pointer;
    color: #606973;
}

.clear-icon:hover {
    color: rgb(184, 182, 182);
}
</style>