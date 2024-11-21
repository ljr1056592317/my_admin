import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import useG6BaseHook from './useG6BaseHook';
import type { Graph, GraphOptions } from '@antv/g6';
import { getFakeCaptcha, getTimeLineApi } from './api';
import useTimelineHook from './useTimelinehanldeHook';
import { mockTimelineData } from './mock';
type G6TiimeLineProps = {
  classname?: string;
};

const G6TiimeLine: React.FC<G6TiimeLineProps> = (props) => {
  const { classname } = props;
  const [timelineData, setTimelineData] = useState({
    nodes: [
      {
        id: '1987',
        name: '1987',
        style: { x: 100, y: 100 },
      },
      {
        id: '6730c6898fc281fece3261da',
        name: 'OLED技术2',
        style: { x: 180, y: 200 },
      },
      {
        id: '6730c6898fc281fece3261dc',
        name: 'ACC技术',
        style: { x: 180, y: 300 },
      },
      {
        id: '2005',
        name: '2005',
        style: { x: 300, y: 100 },
      },
      {
        id: '6730c6898fc281fece32622a',
        name: '合成方法',
        style: { x: 380, y: 200 },
      },
    ],
    edges: [
      { id: 'edge-1-1', source: '1987', target: '2005' },
      { id: 'edge-2', source: '1987', target: '6730c6898fc281fece3261da' },
      { id: 'edge-3', source: '1987', target: '6730c6898fc281fece3261dc' },
      { id: 'edge-4', source: '2005', target: '6730c6898fc281fece32622a' },
    ],
  });

  const { graphRef, renderGraph } = useG6BaseHook({});
  const { convertDataToGragh } = useTimelineHook({ graph: graphRef.current as Graph });
  const newData = convertDataToGragh(mockTimelineData);
  console.log(newData, 'newData222');

  const graphOptions: GraphOptions = useMemo(() => {
    return {
      container: 'container',
      data: newData,
      node: {
        type: 'rect',
        state: {
          selected: {
            lineWidth: 0.0,
            // halo: false,
            stroke: '#08f', //边框色
          },
        },
        style: {
          size: [77, 32],
          fill: '#ebf6ff',
          ports: [
            { key: 'top', placement: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
            { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
          ],
          labelText: (d) => {
            return `${d?.name}`;
          },
          labelFill: '#06f',
          labelPlacement: 'center', // 文本位置
          stroke: '#08f', //边框色
          // lineWidth: 1,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 1,
          stroke: '#b2dbff', //边框色
          router: { type: 'orth' },
          radius: 30,
        },
      },
      autoFit: 'center',
      behaviors: ['zoom-canvas', 'click-select'],
    };
  }, [timelineData]);

  useEffect(() => {
    renderGraph(graphOptions);
  }, []);

  return (
    <div
      id="container"
      className={classNames(styles.container, classname)}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default G6TiimeLine;
