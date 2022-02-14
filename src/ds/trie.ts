class TrieNode {
  value: string;
  children: (TrieNode | null)[];
  isEndWord: boolean;
  constructor(value: string) {
    this.value = value;
    this.children = [];
    for (let i = 0; i < 26; i++) {
      this.children[i] = null;
    }
    this.isEndWord = false;
  }

  markAsLeaf() {
    this.isEndWord = true;
  }

  unMarkAsLeaf() {
    this.isEndWord = false;
  }
}

export class Trie {
  root: TrieNode | null;
  constructor() {
    this.root = new TrieNode("");
  }

  getIndex(t: string) {
    return t.charCodeAt(0) - "a".charCodeAt(0);
  }

  insert(key: string) {
    if (key === null) {
      return;
    }

    key = key.toLowerCase();
    let currentNode = this.root;
    let index = 0;

    for (let level = 0; level < key.length; level++) {
      index = this.getIndex(key[level]);
      if (!currentNode) return;
      if (currentNode.children[index] == null) {
        currentNode.children[index] = new TrieNode(key[level]);
      }
      currentNode = currentNode?.children[index];
    }

    currentNode?.markAsLeaf();
  }

  search(key: string) {
    if (key == null) {
      return false; //null key
    }

    key = key.toLowerCase();
    let currentNode = this.root;
    let index = 0;

    //Iterate the Trie with given character index,
    //If it is null at any point then we stop and return false
    //We will return true only if we reach leafNode and have traversed the
    //Trie based on the length of the key

    for (var level = 0; level < key.length; level++) {
      index = this.getIndex(key[level]);
      if (!currentNode) return;
      if (currentNode.children[index] == null) {
        return false;
      }
      currentNode = currentNode.children[index];
    }
    if (currentNode != null && currentNode.isEndWord) {
      return true;
    }
    return false;
  }
}
