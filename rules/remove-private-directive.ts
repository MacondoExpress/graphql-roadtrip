import { ASTVisitor, FieldDefinitionNode } from "graphql";
import { removeDirective } from "../helpers/remove-directive";

export const removePrivateDirective: ASTVisitor = {
    FieldDefinition(fieldDefinition: FieldDefinitionNode) {
        return removeDirective(fieldDefinition, "private");
    },
};
