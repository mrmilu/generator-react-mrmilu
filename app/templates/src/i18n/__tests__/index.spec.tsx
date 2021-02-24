import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useTranslation } from '../';

type MockComponentProps = {
  lang?: string;
};

function MockComponent({ lang = 'en' }: MockComponentProps) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    async function setLanguage() {
      await i18n.changeLanguage(lang);
    }

    void setLanguage();
  }, [i18n, lang]);
  return <div>{t('title')}</div>;
}

describe('i18n', () => {
  it('Should translate a text in english', () => {
    const renderer = render(<MockComponent />);
    expect(renderer.getByText('Sample title')).not.toBeNil();
    expect(renderer.container).toMatchSnapshot();
  });
  it('Should translate a text in spanish', () => {
    const renderer = render(<MockComponent lang="es" />);
    expect(renderer.getByText('Título de ejemplo')).not.toBeNil();
    expect(renderer.container).toMatchSnapshot();
  });
});
