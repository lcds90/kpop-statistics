import React from 'react';
import ReactPlayer from 'react-player';
import styles from 'styles/Playlist.module.css';
import {
  PieChart, Pie, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  labelFormatterTime, labelFormatterPercentage,
  percentageStatistics, timeStatistics,
} from 'helpers';

const Music = ({
  music: {
    snippet,
    statistics = {},
  } = {},
}) => {
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
  
  return (
    <section className={styles.section}>
      <article>
        <h3>{title}</h3>
        <div>
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
        </div>
      </article>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls />
    </section>
  );
};

export default Music;
