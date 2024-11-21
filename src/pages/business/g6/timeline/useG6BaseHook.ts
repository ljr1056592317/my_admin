import { useEffect, useRef } from 'react';
import type { GraphOptions } from '@antv/g6';
import { Graph as G6Graph } from '@antv/g6';

type UseG6BaseHookType = {
  // 渲染后调用的回调，可以在这里做一些事件绑定啥的
  onRender?: (graph: G6Graph) => void;
};

const useG6BaseHook = (props: UseG6BaseHookType) => {
  const { onRender } = props;
  const graphRef = useRef<G6Graph>();

  const renderGraph = async (graphOptions: GraphOptions) => {
    if (!graphOptions) return;
    const graph = new G6Graph(graphOptions);
    graph
      .render()
      .then(() => {
        graphRef.current = graph;
        // 渲染完成后
        onRender?.(graph);
        console.log(111, 'onRender?.(graph)');
      })
      .catch((error) => console.debug(error));
  };

  useEffect(() => {
    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = undefined;
      }
    };
  });

  return {
    renderGraph,
    graphRef,
  };
};

export default useG6BaseHook;
