import { DirectiveNode } from "graphql";

export function getDirective(directives: DirectiveNode[], directiveName: string): DirectiveNode | undefined {
    return directives.find((directive) => {
        return directive.name.value === directiveName;
    });
}
