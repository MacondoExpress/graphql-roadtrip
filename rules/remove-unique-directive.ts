import { ASTVisitor, FieldDefinitionNode } from "graphql";
import { removeDirective } from "../helpers/remove-directive";

export const removeUniqueDirective: ASTVisitor = {
    FieldDefinition(fieldDefinition: FieldDefinitionNode) {
        return removeDirective(fieldDefinition, "unique");
    },
};
