

module.exports = function(graph, name){
	var modules = [];
	var visited = {};
	
	function visit( name ) {
		if(!visited[name]) {
		
			visited[name] = true;
			var node = graph[name];
			node.dependencies.forEach(function( moduleName ) {
				visit(moduleName);
			});
			modules.push(node);
		}
	}
	visit(name);
	return modules;
};