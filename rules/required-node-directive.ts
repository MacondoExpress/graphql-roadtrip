import { ASTVisitor, Kind, ObjectTypeDefinitionNode } from "graphql";
import { hasDirective } from "../helpers/has-directive";

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
    if (!hasDirective(nodeDirectives, "node")) {
      nodeDirectives.push(NodeDirective);
    }

    const newObject: ObjectTypeDefinitionNode = {
      ...node,
      directives: nodeDirectives,
    };
    return newObject;
  },
};
