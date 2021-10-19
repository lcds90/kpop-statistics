import React from 'react';
import ReactPlayer from 'react-player';
import styles from 'styles/Playlist.module.css';
import {
  PieChart, Pie, Label, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';

const Music = ({
  music: {
    snippet: {
      channelTitle,
      description,
      resourceId: { videoId },
      title,
      thumbnails: {
        high: { url: thumbnail },
      },
    },
    statistics,
  },
}) => {
  const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  const timeStatistics = Object
    .entries(statistics)
    .filter((s) => s[0] !== 'id')
    .map((s) => ({ name: capitalizeName(s[0]), value: s[1].time, fill: s[1].fill }));
  const percentageStatistics = Object
    .entries(statistics)
    .filter((s) => s[0] !== 'id')
    .map((s) => ({ name: capitalizeName(s[0]), value: s[1].percentage, fill: s[1].fill }));
  const labelFormatterPercentage = ({ value }) => `${(value)}%`;
  const labelFormatterTime = ({ value }) => `${(value)}s`;
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
                data={timeStatistics}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
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
                data={percentageStatistics}
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
