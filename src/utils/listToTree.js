export function listToTree(list) {
  const tree = [];
  for (const node of list) {
    if (!node.pid) {
      let p = { ...node };
      p.children = getChildren(p.menuId, list);
      tree.push(p);
    }
  }
  function getChildren(id, list) {
    const children = [];
    for (const node of list) {
      if (node.pid === id) {
        children.push(node);
      }
    }

    for (const node of children) {
      const children = getChildren(node.menuId, list);
      if (children.length) {
        node.children = children;
      }
    }

    return children;
  }

  return tree;
}
