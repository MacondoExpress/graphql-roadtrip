import * as fs from "fs";
import { ASTVisitor, DirectiveNode, Kind, ObjectTypeDefinitionNode, parse, print, visit } from "graphql";

const NodeDirective = {
    kind: Kind.DIRECTIVE,
    name: {
        kind: Kind.NAME,
        value: "node",
    },
} as const;

const visitor: ASTVisitor = {
    ObjectTypeDefinition(node: ObjectTypeDefinitionNode) {
        const nodeDirectives = [...(node.directives ?? [])];
        if (!hasNodeDirecive(nodeDirectives)) {
            nodeDirectives.push(NodeDirective);
        }

        const newObject: ObjectTypeDefinitionNode = {
            ...node,
            directives: nodeDirectives,
        };
        return newObject;
    },
};

function hasNodeDirecive(directives: DirectiveNode[]): boolean {
    return Boolean(
        directives.find((directive) => {
            return directive.name.value === "node";
        })
    );
}

function main() {
    const typedefs = fs.readFileSync("typedef.graphql", { encoding: "utf-8" });
    console.log(typedefs);
    const ast = parse(typedefs);
    const result = visit(ast, visitor);

    console.log("-----");
    const updatedTypedefs = print(result);
    console.log(updatedTypedefs);
}

main();
