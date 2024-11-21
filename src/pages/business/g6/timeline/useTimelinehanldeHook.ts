import { useEffect, useRef } from 'react';
import type { GraphData, GraphOptions, NodeOptions } from '@antv/g6';
import { Graph as G6Graph } from '@antv/g6';
import { TimelineDataType } from './type';

type UseTimelinehanldeHook = {
  // 渲染后调用的回调，可以在这里做一些事件绑定啥的
  graph: G6Graph;
};

const useTimelinehanldeHook = (props: UseTimelinehanldeHook) => {
  const { graph } = props;
  const editNode = () => {
    graph.updateNodeData([{ id: 'node-1', style: { x: 100, y: 100 } }]);
  };

  // 转
  const convertDataToGragh = (timelineData: TimelineDataType) => {
    const nodes: GraphData['nodes'] = [];
    const edges: GraphData['edges'] = [];

    // 遍历每一年的数据
    timelineData.forEach((yearData, index) => {
      const year = yearData.year.toString();
      nodes.push({
        id: year,
        name: year,
        style: { x: 200 + index * 177, y: 200 },
      });

      // 遍历这一年中的每个技术
      yearData.technologyList.forEach((tech, techIndex) => {
        const techId = tech.id;
        nodes.push({
          id: techId,
          name: tech.name,
          style: { x: 280 + index * 177, y: 200 + (techIndex + 1) * 100 },
        });

        // 创建从年份到技术的边
        edges.push({
          id: `edge-${year}-${techId}`,
          source: year,
          target: techId,
        });
      });

      if (index !== timelineData.length - 1) {
        const nextYear = timelineData[index + 1].year.toString();
        // 创建从年份到年份的边
        edges.push({
          id: `edge-${year}-${nextYear}`,
          source: year,
          target: nextYear,
        });
      }
    });
    return {
      nodes,
      edges,
    };
  };
  return {
    editNode,
    convertDataToGragh,
  };
};

export default useTimelinehanldeHook;
