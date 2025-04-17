import { ASTVisitor, DirectiveNode, EnumValueNode } from "graphql";

export const relationshipQueryDirection: ASTVisitor = {
    Directive(directiveNode: DirectiveNode) {
        if (directiveNode.name.value === "relationship") {
            return {
                ...directiveNode,
                arguments: directiveNode.arguments?.map((arg) => {
                    if (arg.name.value === "queryDirection") {
                        return {
                            ...arg,
                            value: {
                                ...arg.value,
                                value: updateQueryDirectionArgument((arg.value as EnumValueNode).value),
                            },
                        };
                    }
                    return arg;
                }),
            };
        }
    },
};

function updateQueryDirectionArgument(queryDirectionArgument: string) {
    switch (queryDirectionArgument) {
        case "DEFAULT_DIRECTED":
        case "DIRECTED_ONLY":
            return "DIRECTED";
        case "DEFAULT_UNDIRECTED":
        case "UNDIRECTED_ONLY":
            return "UNDIRECTED";
    }
}
