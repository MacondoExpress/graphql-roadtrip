import { Kind, TypeNode } from "graphql";

export function getBaseType(type: TypeNode): TypeNode {
    if (type.kind === Kind.NON_NULL_TYPE || type.kind === Kind.LIST_TYPE) {
        return getBaseType(type.type);
    }

    return type;
}
