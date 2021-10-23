import React from 'react';
import {
  PieChart, Pie, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'next-i18next';
import {
  labelFormatterTime,
  labelFormatterPercentage,
  percentageStatistics,
  timeStatistics,
} from 'helpers';
import styles from './Music.module.css';

const Music = ({ music: { snippet, statistics = {} } = {} }) => {
  const { t } = useTranslation('common');
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

  const renderStatistics = () => (
    <section className={styles.statistics}>
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
    </section>
  );

  const renderNullStatistics = () => <div>No statistics</div>;

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <h3 className={styles.title}>{title}</h3>
        {Object.keys(statistics).length > 1
          ? renderStatistics()
          : renderNullStatistics()}
      </article>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </section>
  );
};

export default Music;
