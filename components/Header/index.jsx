import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import welcomeMessage from './helpers';

const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const getTime = () => {
    const timeNow = welcomeMessage();
    const message = {
      afternoon: t('welcome.greeting.afternoon'),
      dawn: t('welcome.greeting.dawn'),
      evening: t('welcome.greeting.evening'),
      morning: t('welcome.greeting.morning'),
    };

    return message[timeNow];
  };
  return (
    <header>
      {getTime()}
      <Link passHref href="/" locale="en">
        <button type="button">en</button>
      </Link>
      <Link passHref href="/" locale="ko">
        <button type="button">ko</button>
      </Link>
      <Link passHref href="/" locale="pt">
        <button type="button">pt</button>
      </Link>
    </header>
  );
};

export default Header;
