import { DirectiveNode, FieldDefinitionNode } from "graphql";

export function hasDirective(
  directives: DirectiveNode[],
  directiveName: string
): boolean {
  return Boolean(
    directives.find((directive) => {
      return directive.name.value === directiveName;
    })
  );
}
