import SelectOption from "./components/SelectOption.vue"

export default {
    install: (app, options) => {
        app.component("SelectOption", SelectOption);
    }
}