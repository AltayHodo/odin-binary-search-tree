class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0){
      return null
    } 
    const start = 0;
    const end = array.length - 1;

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid])

    node.left = this.buildTree(array.slice(0, mid))
    node.right = this.buildTree(array.slice(mid+1))
    return node
  }

  insert(value){
    
  }
}
let tree = new Tree([3,4,5,6,1,2,7])





const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
