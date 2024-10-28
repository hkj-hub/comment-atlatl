import { CytoscapeComponent } from '@/shared/ui/graph-viewer';
import { useGraphViewModel } from '../model/useGraphViewModel';

function Graph() {
  const vm = useGraphViewModel();
  const { elements, selectedLabel } = vm;
  return (
    <div>
      <div>
        整列:
        <button onClick={vm.breadthFirstHanlder}>breadthfirst</button>
        <button onClick={vm.circleHandler}>circle</button>
        <button onClick={vm.concentricHandler}>concentric</button>
        <button onClick={vm.coseHandler}>cose</button>
        <button onClick={vm.gridHandler}>grid</button>
        <button onClick={vm.randomHandler}>random</button>
      </div>
      <div>返信先: {selectedLabel}</div>
      <CytoscapeComponent
        elements={elements}
        cy={vm.cyHandler}
        layout={{ name: 'preset' }}
        wheelSensitivity={0.1}
        style={{ width: '600px', height: '600px' }}
      />
      <div>
        <button onClick={vm.save}>保存</button> <button onClick={vm.loadGraph}>復元</button>
      </div>
    </div>
  );
}

export default Graph;
