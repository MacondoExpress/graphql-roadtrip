import { Kind, TypeNode } from "graphql";

export function isListType(type: TypeNode): boolean {
    if (type.kind === Kind.NON_NULL_TYPE) {
        return isListType(type.type);
    }
    return type.kind === Kind.LIST_TYPE;
}
