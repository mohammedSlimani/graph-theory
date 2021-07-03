/**
 * Find the shortest path from a root position to all the other nodes
 * @param {[[]]} graph - the adjacency matrix representation of graph, the values in the matrix are the distance/cost to travel from
 * one point to an other.
 * @param {number} root - the index of the point to start from.
 * @return {[]} - keys are the destination and the values are the previous node where we should come from.
 */
module.exports = function dijkstra (graph, root) {
    // note that the array includes two type of information in it, the actual values stored and their indexes.
    // to be efficient, I am mapping the values of the index to a distance.

    // init the distance of all the nodes to infinity. Set the previous Node of all the nodes to undefined
    const distance = new Array(graph.length).fill(Infinity)
    const previous = new Array(graph.length).fill(undefined)

    // the root index will be our start. the distance should be 0
    distance[root] = 0
    previous[root] = root

    // Set a queue of the unvisited nodes
    const queue = []
    for (let i = 0; i < graph.length; i++) {
        queue.push(i)
    }

    while (queue.length !== 0) {
        /* finding the vertex in queue with shortest distance
            Current has two values:
            index: The index of current in the queue, only used to remove it from the queue
            value: the value in the queue, which is the value of the node i.e index in the graph.
         */
        let current = findSmallestOfArray(queue)
        removeItemWithIndex(queue, current.index)

        // Updating the distance to the neighboring nodes
        for (let neighbor = 0; neighbor < graph.length; neighbor++) {
            const possibleNewDistance = distance[current.value] + graph[current.value][neighbor]
            if (possibleNewDistance < distance[neighbor]) {
                distance[neighbor] = possibleNewDistance
                previous[neighbor] = current.value
            }
        }
    }

    return previous
}

/**
 * helper method that removes an item from an array
 * NB: This method alters the given array
 * @param {[]} array - Array to remove the item from
 * @param {number} index - index to remove
 * @return {any[]} - deleted items
 */
const removeItemWithIndex = (array, index) => array.splice(index, 0)

/**
 * Find smallest value of an array
 * @param array
 * @return {{ index: number, value: number }}
 */
const findSmallestOfArray = array => array.reduce((previousValue, currentValue, currentIndex) =>
    currentValue < previousValue ? {value: currentValue, index: currentIndex } : previousValue, { index:-1 , value: -Infinity })