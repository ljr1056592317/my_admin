import { useEffect, useRef } from 'react';
import type { GraphOptions } from '@antv/g6';
import { Graph as G6Graph } from '@antv/g6';

type UseG6BaseHookType = {
  graphOptions: GraphOptions;
  // 渲染后调用的回调，可以在这里做一些事件绑定啥的
  onRender?: (graph: G6Graph) => void;
};

const useG6BaseHook = (props: UseG6BaseHookType) => {
  const { graphOptions, onRender } = props;
  const graphRef = useRef<G6Graph>();
  const initG6 = () => {
    const graph = new G6Graph(graphOptions);
    graphRef.current = graph;
  };

  useEffect(() => {
    initG6();
    return () => {
      const graph = graphRef.current;
      console.log(graph, 'graph-写在');

      if (graph) {
        graph.destroy();
        graphRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    const graph = graphRef.current;
    console.log(graph, 'gra');

    if (!graphOptions || !graph) return;

    graph
      .render()
      .then(() => {
        // 渲染完成后
        onRender?.(graph);
        console.log(111, 'onRender?.(graph)');
      })
      .catch((error) => console.debug(error));
  }, [graphOptions]);

  return {
    initG6,
    graphRef,
  };
};

export default useG6BaseHook;
