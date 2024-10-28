import { CytoscapeComponent } from '@/shared/ui/graph-viewer';
import { useGraphViewModel } from '../model/useGraphViewModel';

function Graph() {
  const {
    elements,
    selectedLabel,
    loadGraph,
    save,
    breadthFirstHanlder,
    circleHandler,
    concentricHandler,
    coseHandler,
    gridHandler,
    randomHandler,
    cyHandler,
  } = useGraphViewModel();
  return (
    <div>
      <div>
        整列:
        <button onClick={breadthFirstHanlder}>breadthfirst</button>
        <button onClick={circleHandler}>circle</button>
        <button onClick={concentricHandler}>concentric</button>
        <button onClick={coseHandler}>cose</button>
        <button onClick={gridHandler}>grid</button>
        <button onClick={randomHandler}>random</button>
      </div>
      <div>返信先: {selectedLabel}</div>
      <CytoscapeComponent
        elements={elements}
        cy={cyHandler}
        layout={{ name: 'preset' }}
        wheelSensitivity={0.1}
        style={{ width: '600px', height: '600px' }}
      />
      <div>
        <button onClick={save}>保存</button> <button onClick={loadGraph}>復元</button>
      </div>
    </div>
  );
}

export default Graph;
