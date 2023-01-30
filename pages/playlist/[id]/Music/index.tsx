import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
import { i18n } from 'next-i18next';

import {
  labelFormatterTime,
  labelFormatterPercentage,
  percentageStatistics,
  timeStatistics,
} from 'helpers';
import { useRouter } from 'next/router';
import styles from './Music.module.css';

const defaultMusic = {
  snippet: {
    channelTitle: '',
    description: '',
    resourceId: {
      videoId: '',
    },
    title: '',
    thumbnails: {
      high: {
        url: '',
      },
    },
  },
  statistics: {
    ep: '',
    whoStarted: '',
    whoEnded: '',
    time: {
      '0': 0,
    },
    percentage: {
      '0': 0,
    },
  },
};


const Music = ({ music: { snippet, statistics } = defaultMusic }: {
  music: {
    snippet: {
      channelTitle: string;
      description: string;
      resourceId: {
        videoId: string;
      };
      title: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
    statistics: {
      ep: string;
      whoStarted: string;
      whoEnded: string;
      time: {
        [key: string]: number;
      };
      percentage: {
        [key: string]: number;
      };
    };
  };
}) => {
  const { locale } = useRouter();
  const [translation, setTranslation] = useState({});
  useEffect(() => {
    const bundle = i18n?.getResource(locale as string, 'common', 'common');
    setTranslation(bundle);
  }, []);

  if (!snippet) return <div>Carregando...</div>;

  const {
    channelTitle,
    description,
    resourceId: { videoId },
    title,
    thumbnails: {
      high: { url: thumbnail },
    },
  } = snippet;

  // LINK https://stackoverflow.com/a/43849204/14263138
  const t = (word) => word
    .split('.')
    .reduce((p, c) => (p && p[c]) || null, translation);

  const renderStatistics = () => (
    <div className={styles.statistics}>
      <article className={styles.infosStatistics}>
        <h4>Informações</h4>
        <p>
          <h5>{t('music.from')}</h5>
          <span>{statistics.ep}</span>
        </p>
        <p>
          <h5>{t('music.whoStarted')}</h5>
          <span>{statistics.whoStarted}</span>
        </p>
        <p>
          <h5>{t('music.whoEnded')}</h5>
          <span>{statistics.whoEnded}</span>
        </p>
      </article>
      <article>
        <h4>{t('music.timeStatistics')}</h4>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={timeStatistics(statistics)}
              cx="50%"
              cy="50%"
              outerRadius={80}
              legendType="square"
              label={labelFormatterTime}
            />
            <Legend verticalAlign="top" height={36} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </article>
      <article>
        <h4>{t('music.percentageStatistics')}</h4>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={percentageStatistics(statistics)}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={labelFormatterPercentage}
            />
            <Legend verticalAlign="top" height={36} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </article>
    </div>
  );

  const renderNullStatistics = () => <div>No statistics</div>;

  return (
    <div className={styles.section}>
      <article className={styles.article}>
        <h3 className={styles.title}>{title}</h3>
        {Object.keys(statistics).length > 1
          ? renderStatistics()
          : renderNullStatistics()}
      </article>
      <div className={styles.article}>
        <iframe
          className={styles.player}
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    </div>
  );
};

export default Music;
