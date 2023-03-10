
import express from 'express'
import i18next from "i18next";
import Backend from "i18next-fs-backend"
import middleware  from  "i18next-http-middleware"


//  set up multi langauge support 
const multiLnaguage= i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
   fallbackLng: 'en',
   backend: {
     loadPath: './locales/{{lng}}/transilation.json'
   }
  })

const app = express();
app.use(middleware.handle(i18next));
app.use(express.json());



export default app;
