start_button.addEventListener('click', start);
reset_button.addEventListener('click', reset);
getFile_button.addEventListener('click', createTree);
const FILE = document.getElementById('file_input');
let flag = true;
document.getElementById('input_data').value = "After deleting this message, write some attributes in commas and wihout spaces to make a decision. "
buildTree(getData(0));
let treeRoot = document.getElementById("root");

function createTree() {
    treeRoot = removeTree();
    if(FILE.value === '') {
        buildTree(getData(1));
        drawTree(root, treeRoot);
    }
    else {
        let data = FILE.files[0];
        let reader = new FileReader();
        reader.readAsText(data);
        console.log(data);
        reader.onload = function () {
            data = parseCSVtoMatrix(reader.result);
            buildTree(data);
            drawTree(root, treeRoot);
        }
    }
    flag = true;
} 
function start() {
    if(flag) {
        bypassTree();
        flag = false;
    }
}
function reset() {
    treeRoot = removeTree(treeRoot);
}

function drawTree(currentNode, treeElement) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    currentNode.a = a;
    a.href = "#";
    let nodeName = currentNode.nodeName;
    let atr = currentNode.atribute
    if(nodeName === "root") {
        a.textContent = nodeName;
    }
    else {
        a.textContent = atr + " = " + nodeName;
    }
    
    li.appendChild(a);
    treeElement.appendChild(li);
    if(currentNode.isLeaf()){
        return;
    }
    let ul = document.createElement("ul");
    li.appendChild(ul);
    for (let i = 0; i < currentNode.branches.length; i++) {
        drawTree(currentNode.branches[i], ul);
    }
}

function removeTree() {
    let divTree = document.getElementById("tree");
    treeRoot.remove();
    let ul = document.createElement("ul");
    divTree.appendChild(ul);
    return ul;
}
drawTree(root, treeRoot);
