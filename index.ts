import * as fs from "fs";
import { ASTVisitor, DocumentNode, parse, print, visit } from "graphql";
import { fulltextRequiredParameter } from "./rules/fulltext-required-parameters";
import { makeListFieldNonNullable } from "./rules/make-list-field-non-nullable";
import { relationshipQueryDirection } from "./rules/relationship-query-direction";
import { removePrivateDirective } from "./rules/remove-private-directive";
import { removeUniqueDirective } from "./rules/remove-unique-directive";
import { requireNodeDirective } from "./rules/required-node-directive";
import { singleElementRelationships } from "./rules/single-element-relationships";

function main() {
    const args = process.argv.slice(2);

    const typedefs = fs.readFileSync(args[0], { encoding: "utf-8" });
    const ast = parse(typedefs);
    const rules = [
        removeUniqueDirective,
        requireNodeDirective,
        removePrivateDirective,
        relationshipQueryDirection,
        fulltextRequiredParameter,
        makeListFieldNonNullable,
        singleElementRelationships,
    ];

    const result = migrate(ast, rules);
    const updatedTypedefs = print(result);
    if (args[1] === "-o") {
        fs.writeFileSync(args[2], updatedTypedefs);
    } else {
        console.log(updatedTypedefs);
    }
}

function migrate(ast: DocumentNode, rules: Array<ASTVisitor>): DocumentNode {
    return rules.reduce((acc, rule) => {
        const intermediate = visit(acc, rule);
        return intermediate;
    }, ast);
}

main();
