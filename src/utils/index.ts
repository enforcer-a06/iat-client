import client from './client';

const intl = (key: string, options?: Record<string, string | number>) => {
  const i18nKey = window.tx_language?.[key] || key;
  if (options) {
    return Object.entries(options).reduce((result, [k, v]) => {
      const reg = new RegExp(`{{${k}}}`, 'g');
      return result.replace(reg, String(v));
    }, i18nKey);
  }
  return i18nKey;
};

export { client, intl };
