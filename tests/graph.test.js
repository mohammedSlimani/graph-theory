const assert = require('assert')
const { UndirectedGraph, WeightedUndirectedGraph } = require('../graph')

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

    describe('WeightedUndirectedGraph', () => {
        /**
         * Helper function to assert the dimensions of a matrix
         * @param graph - Weighted Undirected Graph to be tested
         * @param dimension - the expected dimensions
         */
        const assertMatrixDimensions = (graph, dimension) => {
            assert(Array.isArray(graph.adjacencyMatrix))
            assert.strictEqual(graph.adjacencyMatrix.length, dimension)
            for (const row of graph.adjacencyMatrix) {
                assert(Array.isArray(row))
                assert.strictEqual(row.length, dimension)
            }
        }

        it('Initializes the graph with an empty matrix', () => {
            const graph = new WeightedUndirectedGraph()
            assert.deepStrictEqual(graph.adjacencyMatrix, [])
            assertMatrixDimensions(graph, 0)
        })

        it('initializes the matrix with the given matrix', () => {
            const matrix = [[0,0,0],[0,0,0],[0,0,0]]
            const graph = new WeightedUndirectedGraph(matrix)
            assertMatrixDimensions(graph, 3)
        })

        it('throws when given an invalid matrix', () => {
            const matrix = [[0], [0]]
            assert.throws(() => new WeightedUndirectedGraph(matrix), /Invalid adjacency matrix/)
        })

        it('Checks for valid adjacency Matrices', () => {
            let matrix = []
            assert.strictEqual(WeightedUndirectedGraph.matrixValid(matrix), true)
            matrix = [['a', 'b'], ['a', 'b']]
            assert.strictEqual(WeightedUndirectedGraph.matrixValid(matrix), false)
            matrix = [[1], [1, 0]]
            assert.strictEqual(WeightedUndirectedGraph.matrixValid(matrix), false)
            matrix = [[0, 1], [1, 1]] // no zeros in the diagonal
            assert.strictEqual(WeightedUndirectedGraph.matrixValid(matrix), false)
            matrix = [0, [0, 1]]
            assert.strictEqual(WeightedUndirectedGraph.matrixValid(matrix), false)
        })

        it('Adds a vertex to the graph, Adding the same vertex again will throw an error', () => {
            const graph = new WeightedUndirectedGraph()
            graph.addVertex('A')
            assertMatrixDimensions(graph, 1)
            assert.throws(() => graph.addVertex('A'), /Vertex name already exist/)
        })

        // I dont know if this is the right behavior
        // This can be possible if the adjacency matrix represented the number of neighbours connected instead of the weight
        // take this with a grain of salt dear reader <3
        it('Can\'t add an edge to oneself', () => {
            const graph = new WeightedUndirectedGraph()
            const source = 'A'
            assert.throws(() => graph.addEdges(source, { destination: source, weight: 1 }), /Vertex name already exist/)
        })

        it('Adds edges to one destination', () => {
            const graph = new WeightedUndirectedGraph()
            const destination = { destination: 'B', weight: 1 }
            graph.addEdges('A', destination)
            assertMatrixDimensions(graph, 2)
            assert.deepStrictEqual(graph.adjacencyMatrix, [[0, destination.weight], [destination.weight, 0]])
        })

        it('Can add multiple destinations', () => {
            const graph = new WeightedUndirectedGraph()
            const source = 'source'
            const numberOfDestinations = 10
            const destinations = []
            for (let i = 0; i < numberOfDestinations; i++) {
                destinations.push({ destination: i, weight: i })
            }
            graph.addEdges(source, destinations)
            assertMatrixDimensions(graph, numberOfDestinations + 1)
        })

        it('Removes an edge', () => {
            const graph = new WeightedUndirectedGraph()
            const source = 'A'
            const destination = { destination: 'B', weight: 12 }

            graph.addEdges(source, destination)
            assertMatrixDimensions(graph, 2)
            assert.deepStrictEqual(graph.adjacencyMatrix, [[0, destination.weight], [destination.weight, 0]])

            graph.removeEdge(source, destination.destination)
            assertMatrixDimensions(graph, 2)
            assert.deepStrictEqual(graph.adjacencyMatrix, [[0,0], [0,0]])
        })

        it('throws when removing an edge with source or destination that don\'t exist', () => {
            const graph = new WeightedUndirectedGraph()
            assert.throws(() => graph.removeEdge('A', 'B'), /Can't remove edge, because .* doesn't exist/)
        })

    })
})