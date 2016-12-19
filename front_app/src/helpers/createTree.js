export default function createTree(directories) {
  if (directories.length === 1) {
    return directories;
  }
  let root = directories.filter((n) => n.hasOwnProperty('parentId') === false)[0];
  let assignChildren = (parent) => {
    let children = directories.filter((n) => n.parentId === parent.id);
    if (children.length > 0) {
      parent.children = children;
      children.forEach((n) => {
        assignChildren(n);
      });
    }
  };
  assignChildren(root);
  root.children.map((n) => n.isVisible = true);
  return directories.filter((n) => n.id === root.id)[0];
}
