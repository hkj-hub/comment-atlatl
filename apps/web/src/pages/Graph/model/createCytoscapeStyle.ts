import { UserAvatorIcon } from '@comment-atlatl/ui/components';
import Cytoscape from 'cytoscape';
import { renderToStaticMarkup } from 'react-dom/server';
import { GraphDataFromKuzu } from '@/entities/graph';

export const createCytoscapeStyle = (e: GraphDataFromKuzu) => ({
  selector: `node#${e.data.id}`,
  css: {
    content: 'data(label)',
    width: 45,
    height: 45,
    'background-image': (elm: Cytoscape.CoreData) => {
      const data = elm.data();
      const svgString = encodeURIComponent(
        renderToStaticMarkup(UserAvatorIcon({ name: data.peerId })),
      );
      const dataUri = `data:image/svg+xml,${svgString}`;
      return dataUri;
    },
  },
});
