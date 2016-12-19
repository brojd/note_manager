export default function findAndModifyDir(dirId, dirsTree, newDir) {
  dirsTree.forEach((n) => {
    if (n.id === dirId) {
      n = newDir;
      return;
    }
    if (n.hasOwnProperty('children')) {
      findAndModifyDir(n.id, n.children, newDir);
    }
  });
}
