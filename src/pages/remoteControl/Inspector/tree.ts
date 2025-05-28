


type Meta = { drawer: string; meta: any }
export interface Entry { value: unknown; meta: Meta }

export interface TreeNode {
  key: string
  value?: unknown
  meta?: Meta
  children?: Record<string, TreeNode>
}

export function buildTree(entries: Record<string, Entry>) {
  const root: TreeNode = { key: '__root__', children: {} }
  for (const [flatKey, { value, meta }] of Object.entries(entries)) {
    const parts = flatKey.split('/')
    let node = root
    for (const part of parts) {
      node.children = node.children ?? {}
      node.children[part] = node.children[part] ?? { key: part }
      node = node.children[part]!
    }
    node.value = value
    node.meta = meta
  }
  return root
}