import { useSelector } from 'react-redux';
import { T } from '../data/i18n';

/* const { t, lang } = useT();  t('login') -> text in the current language */
export default function useT() {
  const lang = useSelector((s) => s.settings.lang);
  const t = (k) => (T[lang] && T[lang][k]) || T.en[k] || k;
  return { t, lang };
}
