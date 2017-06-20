import 'babel-polyfill'
import * as d3 from 'd3'
import Graph from 'egraph/graph'
import EdgeConcentrationTransformer from 'egraph/transformer/edge-concentration'
import maxrect from 'egraph/transformer/edge-concentration/rectangular'
import {Renderer} from 'd3-egraph'

// build your graph
const vertices = [
  [0, 1, 2, 3, 4],
  [10, 11, 12, 13, 14, 15, 16]
]
const [a1, a2, a3, a4, a5] = vertices[0]
const [b1, b2, b3, b4, b5, b6, b7] = vertices[1]
const graph = new Graph()
  .addVertex(a1, {text: 'a1', width: 50, height: 50})
  .addVertex(a2, {text: 'a2', width: 50, height: 50})
  .addVertex(a3, {text: 'a3', width: 50, height: 50})
  .addVertex(a4, {text: 'a4', width: 50, height: 50})
  .addVertex(a5, {text: 'a5', width: 50, height: 50})
  .addVertex(b1, {text: 'b1', width: 50, height: 50})
  .addVertex(b2, {text: 'b2', width: 50, height: 50})
  .addVertex(b3, {text: 'b3', width: 50, height: 50})
  .addVertex(b4, {text: 'b4', width: 50, height: 50})
  .addVertex(b5, {text: 'b5', width: 50, height: 50})
  .addVertex(b6, {text: 'b6', width: 50, height: 50})
  .addVertex(b7, {text: 'b7', width: 50, height: 50})
  .addEdge(a1, b1)
  .addEdge(a1, b2)
  .addEdge(a1, b3)
  .addEdge(a1, b4)
  .addEdge(a2, b1)
  .addEdge(a2, b2)
  .addEdge(a2, b3)
  .addEdge(a2, b4)
  .addEdge(a3, b1)
  .addEdge(a3, b2)
  .addEdge(a3, b3)
  .addEdge(a3, b4)
  .addEdge(a3, b5)
  .addEdge(a3, b6)
  .addEdge(a3, b7)
  .addEdge(a4, b4)
  .addEdge(a4, b5)
  .addEdge(a4, b6)
  .addEdge(a4, b7)
  .addEdge(a5, b4)
  .addEdge(a5, b5)
  .addEdge(a5, b6)
  .addEdge(a5, b7)

/**
 * Edge concentration function
 * @param {Graph} graph - graph structure
 * @param {Array} h1 - array of left vertices
 * @param {Array} h2 - array of right vertices
 * @return {Array} returns array of {source, target}
 */
const myMethod = (graph, h1, h2) => {
  // write your algorithm
  const clusters = maxrect(graph, h1, h2)
  return clusters
}

const transformer = new EdgeConcentrationTransformer()
  .method(myMethod)
  .dummy(() => ({dummy: true, width: 20, height: 20}))
const renderer = new Renderer()
  .transformer(transformer)
renderer.layouter()
  .edgeWidth(() => 2)
  .layerMargin(200)
  .vertexMargin(3)
  .edgeMargin(3)
  .ltor(true)
renderer.layouter()
  .layerAssignment()
  .repeat(5)
renderer.vertexRenderer()
  .vertexScale(() => 2)

const wrapper = d3.select('#screen-wrapper').node()
const selection = d3.select('#screen')
  .attr('width', wrapper.clientWidth)
  .attr('height', wrapper.clientHeight)
  .datum(graph)

const zoom = d3.zoom()
  .scaleExtent([0.1, 2])
  .on('zoom', () => {
    const {x, y, k} = d3.event.transform
    selection
      .select('g')
      .attr('transform', `translate(${x},${y})scale(${k})`)
  })
selection
  .call(zoom)

selection
  .transition()
  .duration(1000)
  .delay(500)
  .call(renderer.render())
