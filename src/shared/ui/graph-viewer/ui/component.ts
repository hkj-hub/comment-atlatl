/* eslint-disable @typescript-eslint/no-explicit-any */
import Cytoscape from 'cytoscape';
import React from 'react';
import { defaults } from '../model/defaults';
import { patch } from '../model/patch';
import { types } from '../model/types';

type Props = typeof types & { global?: string };

/**
 * The `CytoscapeComponent` is a React component that allows for the declarative creation
 * and modification of a Cytoscape instance, a graph visualisation.
 */
export default class CytoscapeComponent extends React.Component {
  containerRef: React.RefObject<unknown>;
  private _cy: Cytoscape.Core | undefined;
  static get propTypes() {
    return types;
  }

  static get defaultProps() {
    return defaults;
  }

  static normalizeElements(elements: any) {
    const isArray = elements.length != null;

    if (isArray) {
      return elements;
    } else {
      let { nodes, edges } = elements;

      if (nodes == null) {
        nodes = [];
      }

      if (edges == null) {
        edges = [];
      }

      return nodes.concat(edges);
    }
  }

  constructor(props: Props, public displayName: string = 'CytoscapeComponent') {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const container = this.containerRef.current;

    const {
      global,
      headless,
      styleEnabled,
      hideEdgesOnViewport,
      textureOnViewport,
      motionBlur,
      motionBlurOpacity,
      wheelSensitivity,
      pixelRatio,
    } = this.props as Props;

    const cy = new (Cytoscape as any)({
      container,
      headless,
      styleEnabled,
      hideEdgesOnViewport,
      textureOnViewport,
      motionBlur,
      motionBlurOpacity,
      wheelSensitivity,
      pixelRatio,
    });
    this._cy = cy;

    if (global) {
      window[global as any] = cy;
    }

    this.updateCytoscape(null, this.props);
  }

  updateCytoscape(prevProps: any, newProps: any) {
    const cy = this._cy;
    const { diff, toJson, get, forEach } = newProps;

    patch(cy, prevProps, newProps, diff, toJson, get, forEach);

    if (newProps.cy != null) {
      newProps.cy(cy);
    }
  }

  componentDidUpdate(prevProps: any) {
    this.updateCytoscape(prevProps, this.props);
  }

  componentWillUnmount() {
    this._cy?.destroy();
  }

  render() {
    const { id, className, style } = this.props as any;

    return React.createElement('div', {
      ref: this.containerRef,
      id,
      className,
      style,
    });
  }
}
