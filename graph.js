/**
 * The graph is made of adjacent vertices.
 * It is an object where the keys are the vertices and the values are the
 * the adjacent vertices.
**/
exports.UndirectedGraph = class UndirectedGraph {
  constructor () {
    this._adjacencyList = {}
  }

  get adjacencyList () {
    return this._adjacencyList
  }

  /**
   * Add a vertex to the graph
   * @param {number} vertex - the vertex to be added. Identified by a unique number
   */
  addVertex (vertex) {
    if (this._adjacencyList[vertex]) return; // already exists
    this._adjacencyList[vertex] = []
  }

  /**
   * Create an edge in our graph
   * @param {number} source - the source vertex
   * @param {number} destination - the destination vertex
   */
  addEdge (source, destination) {
    // make sure the vertices exist or add them
    if (!this._adjacencyList[source]) this.addVertex(source)
    if (!this._adjacencyList[destination]) this.addVertex(destination)

    // source is destination, we only need to push the vertex once.
    if( source === destination){
      this._adjacencyList[source].push(destination)
      return
    }

    // make the source and destination vertices neighbours
    this._adjacencyList[source].push(destination)
    this._adjacencyList[destination].push(source)
  }

  /**
   * Remove an edge. The edge is identified by two vertices. The vertices are no longer neighbours.
   * @param source
   * @param destination
   */
  removeEdge (source, destination) {
    this._adjacencyList[source] = this._adjacencyList[source].filter(v => v !== destination)
    this._adjacencyList[destination] = this._adjacencyList[destination].filter(v => v !== source)
  }

  /**
   * Remove a vertex from the graph
   * @param vertex
   */
  removeVertex (vertex) {
    // remove the vertex from all the neighbours adjacency list
    while (this._adjacencyList[vertex].length) {
      const neighbour = this._adjacencyList[vertex].pop()
      this.removeEdge(vertex, neighbour)
    }
    // Remove the vertex
    delete this._adjacencyList[vertex]
  }
}

/**
 * The Weighted Undirected Graph here is a graph represented with the adjacency Matrix.
 * @type {WeightedUndirectedGraph}
 */
exports.WeightedUndirectedGraph = class WeightedUndirectedGraph {
  /**
   * adjacencyMatrix
   * vertexHash: is a hashmap between the naming given to the vertex and the index of this vertex in the matrix
   */
  constructor() {
    this._adjacencyMatrix = []
    this._vertexHash = {}
  }

  get adjacencyMatrix () {
    return this._adjacencyMatrix;
  }

  /**
   * Add a vertex with a custom name
   * @param { string }vertex - the name given to the vertex
   */
  addVertex (vertex) {
    // keeping the vertexHash naming unique to avoid problems
    if (!isNaN(this._vertexHash[vertex])) throw new Error('Vertex name already exist')

    for (let i = 0; i < this._adjacencyMatrix.length; i++) {
      this._adjacencyMatrix[i].push(0) // the new vertex is not connected to any other vertex
    }
    // after adding a vertex, the size of the matrix increases by 1 in both rows and column
    const newMatrixLength = this._adjacencyMatrix.length + 1
    const newVertex = new Array(newMatrixLength).fill(0)
    this._adjacencyMatrix.push(newVertex)

    // Mapping the index of the newly created row and column to the name given to the vertex
    this._vertexHash[vertex] = newMatrixLength - 1
  }

  /**
   * @typedef Edge
   * @property {string} destination - The destination to where the edge should go
   * @property {number} weight - the cost of going to that destination
   */

  /**
   *
   * @param {string}source
   * @param {(Edge | [Edge])}destinations
   * @param {boolean} [directed] - the flag to decide whether the graph is direct or not
   */
  addEdges(source, destinations, directed = false) {
    destinations = Array.isArray(destinations)? destinations : [destinations]
    for (const vertex of [...destinations, {destination: source, weight: 0}]) {
      if (!this._vertexHash[vertex.destination]) this.addVertex(vertex.destination)
    }

    for (const destination of destinations) {
      this._adjacencyMatrix[this._vertexHash[source]][this._vertexHash[destination.destination]] = destination.weight
      // make the matrix symmetric if the graph is undirected
      if (!directed) {
        this._adjacencyMatrix[this._vertexHash[destination.destination]][this._vertexHash[source]] = destination.weight
      }
    }
  }

  /**
   * Removes an edge between a source and a destination
   * @param {string} source - the name of the source
   * @param {string} destination - the name of the destination
   * @param {boolean} [directed] - the flag to decide whether the graph is direct or not
   */
  removeEdge(source, destination, directed = false) {
    // if the edges dont exist, dont do anything, We might want to throw an error just to make the code strict
    if (isNaN(this._vertexHash[source]))
      throw new Error(`Can't remove edge, because ${source} doesn't exist`)

    if (isNaN(this._vertexHash[destination]))
      throw new Error(`Can't remove edge, because ${destination} doesn't exist`)

    this._adjacencyMatrix[this._vertexHash[source]][this._vertexHash[destination]] = 0
    if (!directed) {
      this._adjacencyMatrix[this._vertexHash[destination]][this._vertexHash[source]] = 0
    }
  }
}
