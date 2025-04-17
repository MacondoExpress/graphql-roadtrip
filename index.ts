import * as fs from "fs";
import { ASTVisitor, DocumentNode, parse, print, visit } from "graphql";
import { fulltextRequiredParameter } from "./rules/fulltext-required-parameters";
import { relationshipQueryDirection } from "./rules/relationship-query-direction";
import { removePrivateDirective } from "./rules/remove-private-directive";
<<<<<<< HEAD
import { makeListFieldNonNullable } from "./rules/make-list-field-non-nullable";
||||||| 07b5d21
=======
import { removeUniqueDirective } from "./rules/remove-unique-directive";
import { requireNodeDirective } from "./rules/required-node-directive";
>>>>>>> 79a3d8be7df1be3834edafddcc99a7c75dc04e93

function main() {
<<<<<<< HEAD
  const typedefs = fs.readFileSync("typedef.graphql", { encoding: "utf-8" });
  console.log(typedefs);
  const ast = parse(typedefs);
  const rules = [
    removeUniqueDirective,
    requireNodeDirective,
    removePrivateDirective,
    makeListFieldNonNullable,
  ];
||||||| 07b5d21
  const typedefs = fs.readFileSync("typedef.graphql", { encoding: "utf-8" });
  console.log(typedefs);
  const ast = parse(typedefs);
  const rules = [
    removeUniqueDirective,
    requireNodeDirective,
    removePrivateDirective,
  ];
=======
    const typedefs = fs.readFileSync("typedef.graphql", { encoding: "utf-8" });
    console.log(typedefs);
    const ast = parse(typedefs);
    const rules = [
        removeUniqueDirective,
        requireNodeDirective,
        removePrivateDirective,
        relationshipQueryDirection,
        fulltextRequiredParameter,
    ];
>>>>>>> 79a3d8be7df1be3834edafddcc99a7c75dc04e93

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
