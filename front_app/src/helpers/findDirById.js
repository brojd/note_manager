export default function findDirById(dirId, dirsTree) {
  let dirToReturn;
  function innerFunc(dirId, dirsTree) {
    dirsTree.forEach((n) => {
      if (n.id === dirId) {
        dirToReturn = n;
        return;
      } else if (n.hasOwnProperty('children')) {
        innerFunc(dirId, n.children);
      }
    });
  }
  innerFunc(dirId, dirsTree);
  return dirToReturn;
}
