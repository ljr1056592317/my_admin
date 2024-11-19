import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import useG6BaseHook from './useG6BaseHook';
import type { GraphOptions } from '@antv/g6';
type G6TiimeLineProps = {
  classname?: string;
};

const G6TiimeLine: React.FC<G6TiimeLineProps> = (props) => {
  const { classname } = props;
  const [timelineData, setTimelineData] = useState({
    nodes: [
      {
        id: 'node-1',
        style: { x: 50, y: 100 },
      },
      {
        id: 'node-1-1',
        style: { x: 80, y: 200 },
      },
      {
        id: 'node-1-2',
        style: { x: 80, y: 300 },
      },
      {
        id: 'node-2',
        style: { x: 150, y: 100 },
      },
      {
        id: 'node-3',
        style: { x: 250, y: 100 },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
      { id: 'edge-3', source: 'node-1', target: 'node-1-1' },
      { id: 'edge-4', source: 'node-1', target: 'node-1-2' },
    ],
  });
  const graphOptions: GraphOptions = useMemo(() => {
    return {
      container: 'container',
      data: timelineData,
      node: {
        type: 'rect',
        style: {
          width: 120,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: '#7e3feb',
          lineWidth: 0.5,
          labelBackgroundOpacity: 1,
          labelBackgroundLineWidth: 2,
          labelBackgroundRadius: 100,
          router: { type: 'orth' },
          radius: 30,
        },
      },
    };
  }, [timelineData]);

  const { graphRef } = useG6BaseHook({ graphOptions });

  return (
    <div
      id="container"
      className={classNames(styles.container, classname)}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default G6TiimeLine;
