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


