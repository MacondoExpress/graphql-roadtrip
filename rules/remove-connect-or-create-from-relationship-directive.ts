import { ArgumentNode, ASTVisitor, DirectiveNode, Kind } from "graphql";
import { hasDirective } from "../helpers/has-directive";

export const removeConnectOrCreateFromRelationshipDirective: ASTVisitor = {
    Directive(directiveNode: DirectiveNode) {
        if (directiveNode.name.value === "relationship") {
            //console.log("Removing CONNECT_OR_CREATE from relationship directive");
            const args = directiveNode.arguments ?? [];
            const nestedOperationsArg = args.find((arg) => arg.name.value === "nestedOperations");
            const argsWithoutNestedOperations = args.filter((arg) => arg.name.value !== "nestedOperations");
            if (nestedOperationsArg) {
                if (nestedOperationsArg.value.kind === Kind.LIST) {
                    const nestedOperationsValues = nestedOperationsArg.value.values.filter(
                        (value) => value.kind !== Kind.STRING || value.value !== "CONNECT_OR_CREATE"
                    );
                    //console.log("nestedOperationsArgs");
                    return {
                        ...directiveNode,
                        arguments: [
                            ...argsWithoutNestedOperations,
                            {
                                ...nestedOperationsArg,
                                value: { ...nestedOperationsArg.value, values: nestedOperationsValues },
                            },
                        ],
                    };
                }
            }
        }
    },
};
