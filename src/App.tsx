import { useEffect } from 'react';
import i18next from 'i18next';
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
]

function App() {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage: any = languages.find((l) => l.code === currentLanguageCode)

  const { t } = useTranslation();

  useEffect(() => {
    console.log('Setting page stuff')
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  const languageChangeHandler = (event: any) => {
    console.log("final value is::", event)
    i18next.changeLanguage(event.target.value)
  }

  return (
    <div>
      <h1>{t('welcome_to_react')}</h1>
      <hr />
      <label>{t('change_language')}</label>
      <select onChange={languageChangeHandler}>
        {languages.map(item => (
          <option key={item.country_code} value={item.code} disabled={currentLanguageCode === item.code}>{item.name}</option>
        ))}
      </select>

      <hr />
      <p>{t('welcome_description')}</p>
      <p>{t('today_is', `${new Date('22/10/2020')}`)}</p>
    </div>
  );
}

export default App;
