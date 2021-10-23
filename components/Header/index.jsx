import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

import { iconBrazil, iconSouthKorea, iconUSA } from 'assets';
import { welcomeMessage } from 'helpers';
import styles from './Header.module.css';

const Header = () => {
  const { t } = useTranslation('common');

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
    <header className={styles.header}>
      <Link passHref href="/home" locale="en">
        <button type="button">
          <Image
            alt="Change to English Language"
            title="Change to English Language"
            src={iconUSA}
            layout="fill"
            quality={100}
          />
        </button>
      </Link>
      <Link passHref href="/home" locale="ko">
        <button type="button">
          <Image
            alt="Change to Korean Language"
            title="Change to Korean Language"
            src={iconSouthKorea}
            layout="fill"
            quality={100}

          />
        </button>
      </Link>
      <Link passHref href="/home" locale="pt">
        <button type="button">
          <Image
            alt="Change to Portuguese Language"
            title="Change to Portuguese Language"
            src={iconBrazil}
            layout="fill"
            quality={100}
          />
        </button>
      </Link>
      <h2>{getTime()}</h2>
    </header>
  );
};

export default Header;
