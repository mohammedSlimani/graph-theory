const assert = require('assert')
const { UndirectedGraph } = require('../graph')

describe('Graph tests', () => {
    describe('UndirectedGraph', () => {
        it('Starts with an empty adjacent list', () => {
            const Graph = new UndirectedGraph()
            assert.deepStrictEqual(Graph.adjacencyList, {}, 'the graph is initialized with an empty object')
        })

        it('adds a node to the graph', () => {
            const Graph = new UndirectedGraph()
            Graph.addVertex(1)
            assert.deepStrictEqual(Graph.adjacencyList, { 1: [] })
        })

        it('Can create an edge with non existing vertices', () => {
            const Graph = new UndirectedGraph()
            Graph.addEdge(1,2)
            assert.deepStrictEqual(Graph.adjacencyList, { 1: [2], 2: [1] } )
        })

        it('Can create an edge from an existing vertex', () => {
            const Graph = new UndirectedGraph()
            Graph.addVertex(1)
            Graph.addEdge(1, 2)
            assert.deepStrictEqual(Graph.adjacencyList, { 1: [2], 2: [1] })
        })

        it('Can create an edge with the same vertex', () => {
            const Graph = new UndirectedGraph()
            Graph.addVertex(1)
            Graph.addEdge(1,1)
            assert.deepStrictEqual(Graph.adjacencyList, { 1: [1] })
            Graph.addEdge(1,1)
            assert.deepStrictEqual(Graph.adjacencyList, { 1: [1,1] })
        })

        it('can Remove an Edge', () => {
            const source = 1
            const destination = 2
            const Graph = new UndirectedGraph()
            Graph.addEdge(source, destination)
            Graph.removeEdge(source, destination)
            assert.deepStrictEqual(Graph.adjacencyList, { [source]: [], [destination]: [] })
        })

        it('Can remove a vertex', () => {
            const source = 1
            const destination = 2
            const Graph = new UndirectedGraph()
            Graph.addEdge(source, destination)
            Graph.removeVertex(source)
            assert.deepStrictEqual(Graph.adjacencyList, { [destination]: [] })
        })
    })
})