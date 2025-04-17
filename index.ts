import * as fs from "fs";
import { requireNodeDirective } from "./rules/required-node-directive";
import { DocumentNode, parse, print, visit } from "graphql";

function main() {
  const typedefs = fs.readFileSync("typedef.graphql", { encoding: "utf-8" });
  console.log(typedefs);
  const ast = parse(typedefs);
  const result = migrate(ast);
  console.log("-----");
  const updatedTypedefs = print(result);
  console.log(updatedTypedefs);
}

function migrate(ast: DocumentNode): DocumentNode {
  const result = visit(ast, requireNodeDirective);
  return result as DocumentNode;
}

main();
