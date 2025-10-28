import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en')

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng)
    }

    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const value = {
    currentLanguage,
    changeLanguage,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'bg', name: 'Български', flag: '🇧🇬' }
    ]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}