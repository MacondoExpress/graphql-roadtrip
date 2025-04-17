import { ASTVisitor, FieldDefinitionNode, Kind } from "graphql";
import { getBaseType } from "../helpers/get-base-type";
import { hasDirective } from "../helpers/has-directive";
import { isListType } from "../helpers/is-list-type";

export const singleElementRelationships: ASTVisitor = {
    FieldDefinition(fieldDefinition: FieldDefinitionNode) {
        if (
            hasDirective([...(fieldDefinition.directives ?? [])], "relationship") ||
            hasDirective([...(fieldDefinition.directives ?? [])], "declareRelationship")
        ) {
            if (!isListType(fieldDefinition.type)) {
                return {
                    ...fieldDefinition,
                    type: {
                        kind: Kind.NON_NULL_TYPE,
                        type: {
                            kind: Kind.LIST_TYPE,
                            type: {
                                kind: Kind.NON_NULL_TYPE,
                                type: getBaseType(fieldDefinition.type),
                            },
                        },
                    },
                };
            }
        }
        return fieldDefinition;
    },
};
