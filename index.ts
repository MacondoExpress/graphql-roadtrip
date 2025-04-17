import * as fs from "fs";
import { ASTVisitor, DocumentNode, parse, print, visit } from "graphql";
import { fulltextRequiredParameter } from "./rules/fulltext-required-parameters";
import { relationshipQueryDirection } from "./rules/relationship-query-direction";
import { removePrivateDirective } from "./rules/remove-private-directive";
import { makeListFieldNonNullable } from "./rules/make-list-field-non-nullable";
import { removeUniqueDirective } from "./rules/remove-unique-directive";
import { requireNodeDirective } from "./rules/required-node-directive";

function main() {
    const typedefs = fs.readFileSync("typedef.graphql", { encoding: "utf-8" });
    console.log(typedefs);
    const ast = parse(typedefs);
    const rules = [
        removeUniqueDirective,
        requireNodeDirective,
        removePrivateDirective,
        relationshipQueryDirection,
        fulltextRequiredParameter,
        makeListFieldNonNullable,
    ];

    const result = migrate(ast, rules);
    console.log("-----");
    const updatedTypedefs = print(result);
    console.log(updatedTypedefs);
}

function migrate(ast: DocumentNode, rules: Array<ASTVisitor>): DocumentNode {
    return rules.reduce((acc, rule) => {
        const intermediate = visit(acc, rule);
        return intermediate;
    }, ast);
}

main();
