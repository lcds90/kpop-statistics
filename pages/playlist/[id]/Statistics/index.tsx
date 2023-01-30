import React from 'react';
import {
  Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Bar } from 'recharts/lib/cartesian/Bar';
import { CartesianGrid } from 'recharts/lib/cartesian/CartesianGrid';
import { XAxis } from 'recharts/lib/cartesian/XAxis';
import { YAxis } from 'recharts/lib/cartesian/YAxis';
import { BarChart } from 'recharts/lib/chart/BarChart';
import styles from './Statistics.module.css';

const Statistics = ({ average }) => {
  if (!average) return <div>Carregando...</div>;
  const data = Object.entries(average)
    .map((av: any) => ({ name: av[0], Time: av[1].time, Percentage: av[1].percentage }));
  return (
    <article className={styles.article}>
      <ResponsiveContainer width="99%" height={300}>
        <BarChart animationDuration={0} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip animationDuration={0} />
          <Legend />
          <Bar animationDuration={0} isAnimationActive={false} dataKey="Time" fill="#8884d8" />
          <Bar animationDuration={0} isAnimationActive={false} dataKey="Percentage" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
};

export default Statistics;
