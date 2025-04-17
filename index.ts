import * as fs from "fs";
import { requireNodeDirective } from "./rules/required-node-directive";
import { removeUniqueDirective } from "./rules/remove-unique-directive";
import {
  ASTVisitFn,
  ASTVisitor,
  DocumentNode,
  parse,
  print,
  visit,
} from "graphql";
import { removePrivateDirective } from "./rules/remove-private-directive";

function main() {
  const typedefs = fs.readFileSync("typedef.graphql", { encoding: "utf-8" });
  console.log(typedefs);
  const ast = parse(typedefs);
  const rules = [
    removeUniqueDirective,
    requireNodeDirective,
    removePrivateDirective,
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
