import {
  ASTVisitor,
  DirectiveNode,
  Kind,
  ObjectTypeDefinitionNode,
} from "graphql";

const NodeDirective = {
  kind: Kind.DIRECTIVE,
  name: {
    kind: Kind.NAME,
    value: "node",
  },
} as const;

export const requireNodeDirective: ASTVisitor = {
  ObjectTypeDefinition(node: ObjectTypeDefinitionNode) {
    const nodeDirectives = [...(node.directives ?? [])];
    if (!hasNodeDirective(nodeDirectives)) {
      nodeDirectives.push(NodeDirective);
    }

    const newObject: ObjectTypeDefinitionNode = {
      ...node,
      directives: nodeDirectives,
    };
    return newObject;
  },
};

function hasNodeDirective(directives: DirectiveNode[]): boolean {
  return Boolean(
    directives.find((directive) => {
      return directive.name.value === "node";
    })
  );
}
