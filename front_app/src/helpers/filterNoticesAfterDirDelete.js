export default function filterNoticesAfterDirDelete(notices, parentDirectory) {
  let newNotices = notices.slice();
  function innerFunc(innerNotices, innerParentDirectory) {
    innerNotices.forEach((n) => {
      if (innerParentDirectory.hasOwnProperty('children')) {
        innerParentDirectory.children.forEach((dir) => innerFunc(innerNotices, dir));
      }
      if (n.directoryId === innerParentDirectory.id) {
        newNotices = newNotices.filter((n) => n.directoryId !== innerParentDirectory.id);
      }
    });
  }
  innerFunc(notices, parentDirectory);
  return newNotices;
}
