import { ASTVisitor, FieldDefinitionNode, Kind, NonNullTypeNode, TypeNode } from "graphql";

export const makeListFieldNonNullable: ASTVisitor = {
    FieldDefinition(fieldDefinition: FieldDefinitionNode) {
        if (isListType(fieldDefinition.type)) {
            return {
                ...fieldDefinition,
                type: convertListElementTypeToNonNull(fieldDefinition.type),
            };
        }
        return fieldDefinition;
    },
};

function convertListElementTypeToNonNull(typeNode: TypeNode): TypeNode {
    if (typeNode.kind === Kind.NON_NULL_TYPE) {
        return {
            ...typeNode,
            type: convertListElementTypeToNonNull(typeNode.type) as Exclude<TypeNode, NonNullTypeNode>,
        };
    }
    if (typeNode.kind === Kind.LIST_TYPE) {
        if (typeNode.type.kind === Kind.NON_NULL_TYPE) {
            return typeNode;
        }
        if (typeNode.type.kind === Kind.LIST_TYPE) {
            throw new Error("Invalid Neo4jGraphQL schema, nested lists were never supported");
        }

        return {
            kind: Kind.LIST_TYPE,
            type: {
                kind: Kind.NON_NULL_TYPE,
                type: typeNode.type,
            },
        };
    }

    return typeNode;
}

function isListType(type: any): boolean {
    if (type.kind === Kind.NON_NULL_TYPE) {
        return isListType(type.type);
    }
    return type.kind === Kind.LIST_TYPE;
}
