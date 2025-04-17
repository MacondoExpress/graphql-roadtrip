import { FieldDefinitionNode } from "graphql";

export function removeDirective(
  fieldDefinition: FieldDefinitionNode,
  directiveName: string
): FieldDefinitionNode {
  const directives = fieldDefinition.directives?.filter(
    (directive) => directive.name.value !== directiveName
  );

  return {
    ...fieldDefinition,
    directives,
  };
}
