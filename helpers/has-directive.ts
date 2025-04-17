import { DirectiveNode } from "graphql";
import { getDirective } from "./get-directive";

export function hasDirective(directives: DirectiveNode[], directiveName: string): boolean {
    return Boolean(getDirective(directives, directiveName));
}
