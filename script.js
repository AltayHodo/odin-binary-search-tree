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
    if (array.length === 0) {
      return null;
    }
    const start = 0;
    const end = array.length - 1;

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode && currentNode.data !== value) {
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if (currentNode === null) {
      return null;
    }
    return currentNode;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root == null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      parentNode = currentNode;
      if (value > currentNode.data) {
        currentNode = currentNode.right;
        if (currentNode === null) {
          parentNode.right = newNode;
        }
      } else {
        currentNode = currentNode.left;
        if (currentNode === null) {
          parentNode.left = newNode;
        }
      }
    }
  }

  deleteItem(value) {
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode && currentNode.data !== value) {
      parentNode = currentNode;
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (currentNode === null) {
      return;
    }

    if (!currentNode.left && !currentNode.right) {
      if (currentNode === this.root) {
        this.root = null;
      }
      if (parentNode.left === currentNode) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    } else if (currentNode.left && !currentNode.right) {
      if (currentNode === this.root) {
        this.root = currentNode.left;
      } else if (parentNode.left === currentNode) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    } else if (!currentNode.left && currentNode.right) {
      if (currentNode === this.root) {
        this.root = currentNode.right;
      } else if (parentNode.left === currentNode) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
    } else {
      let nextBiggestParent = currentNode;
      let nextBiggest = currentNode.right;

      while (nextBiggest.left) {
        nextBiggestParent = nextBiggest;
        nextBiggest = nextBiggest.left;
      }

      currentNode.data = nextBiggest.data;

      if (nextBiggest.data !== nextBiggestParent.data) {
        nextBiggestParent.left = nextBiggest.right;
      } else {
        nextBiggestParent.right = nextBiggest.right;
      }
    }
  }

  levelOrder(callback = null) {
    const queue = [];
    const finalArray = [];
    queue.push(this.root);
    while (queue.length > 0) {
      if (callback) {
        callback(queue[0]);
      } else {
        finalArray.push(queue[0].data);
      }
      if (queue[0].left) {
        queue.push(queue[0].left);
      }
      if (queue[0].right) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
    if (!callback) {
      return finalArray;
    }
  }

  inOrder(callback = null) {
    const finalArray = [];
    function inOrderHelper(node) {
      if (node === null) null;
      if (node.left) {
        inOrderHelper(node.left);
      }
      finalArray.push(node.data);
      if (node.right) {
        inOrderHelper(node.right);
      }
    }
    inOrderHelper(this.root);
    return finalArray;
  }

  preOrder(callback = null) {
    const finalArray = [];
    function preOrderHelper(node) {
      if (node === null) null;
      finalArray.push(node.data);
      if (node.left) {
        preOrderHelper(node.left);
      }
      if (node.right) {
        preOrderHelper(node.right);
      }
    }
    preOrderHelper(this.root);
    return finalArray;
  }

  postOrder(callback = null) {
    const finalArray = [];
    function postOrderHelper(node) {
      if (node === null) null;
      if (node.left) {
        postOrderHelper(node.left);
      }
      if (node.right) {
        postOrderHelper(node.right);
      }
      finalArray.push(node.data);
    }
    postOrderHelper(this.root);
    return finalArray;
  }

  height(node) {
    if (node === null) {
      return 0;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node) {
    function helper(alsoNode) {
      if (alsoNode.data === node.data) {
        return 0;
      }
      if (alsoNode.data > node.data) {
        return 1 + helper(alsoNode.left);
      } else {
        return 1 + helper(alsoNode.right);
      }
    }
    return helper(this.root);
  }

  isBalanced() {
    const checkBalanced = (node) => {
      if (node === null) {
        return true;
      }

      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return checkBalanced(node.left) && checkBalanced(node.right);
    };

    return checkBalanced(this.root);
  }

  rebalance(){
    const array = this.inOrder();
    this.root = this.buildTree(array);
  }
}

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

