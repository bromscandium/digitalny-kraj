import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import sk from "./locales/sk/translation.json"
import cz from "./locales/cz/translation.json"
import pl from "./locales/pl/translation.json"

i18n.use(initReactI18next).init({
    resources: {
        sk: {translation: sk},
        cz: {translation: cz},
        pl: {translation: pl},
    },
    lng: "sk",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
})

export default i18n