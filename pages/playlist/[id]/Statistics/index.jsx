import React from 'react';
import {
  Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Bar } from 'recharts/lib/cartesian/Bar';
import { CartesianGrid } from 'recharts/lib/cartesian/CartesianGrid';
import { XAxis } from 'recharts/lib/cartesian/XAxis';
import { YAxis } from 'recharts/lib/cartesian/YAxis';
import { BarChart } from 'recharts/lib/chart/BarChart';

const Statistics = ({ average }) => {
  const data = Object.entries(average)
    .map((av) => ({ name: av[0], Time: av[1].time, Percentage: av[1].percentage }));
  return (
    <article>
      <ResponsiveContainer width="99%" height={300}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Time" fill="#8884d8" />
          <Bar dataKey="Percentage" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
};

export default Statistics;
