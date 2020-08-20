/* 
 * Create Vuetify Plugin with default and other config
*/
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        disable: false ,
        base: "#FDD148",
        themes: {
            default: {
            primary: "#FDD148",
            secondary: "#ffecb5",
            accent: "#3F51B5"
            },
            light: {
            primary: "#FDD148",
            secondary: "#ffecb5",
            accent: "#3F51B5"
            },
            dark: {
            primary: "#FDD148",
            secondary: "#ffecb5",
            accent: "#3F51B5"
            },
        },
    },
});
