export default (nodes, links, startNode, endNode) => {
    let graph = {}
    nodes.forEach((n) => graph[n.name] = [])
    links.forEach(l => console.log(graph[l.source.name].push(l.target.name)))
    // console.log(graph)

    let visited = Array(nodes.length).fill(false)
    let path = []
    let paths = []

    printAllPathsUtil(startNode, endNode, visited, path, graph, paths)

    return paths

}

const printAllPathsUtil = (s, d, visited, path, graph, paths) => {
    visited[s] = true
    path.push(s)
    // console.log(graph[s])

    if (s === d)
        paths.push([...path])

    else
        for (let i = 0; i < graph[s].length; i++)
            if (visited[i] === false)
                printAllPathsUtil(graph[s][i], d, visited, path, graph, paths)
    path.pop()
    visited[s] = false
}