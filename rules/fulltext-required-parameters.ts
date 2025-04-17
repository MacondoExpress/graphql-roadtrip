import {
    ASTVisitor,
    DirectiveNode,
    Kind,
    ListValueNode,
    ObjectFieldNode,
    ObjectTypeDefinitionNode,
    ObjectValueNode,
} from "graphql";

export const fulltextRequiredParameter: ASTVisitor = {
    ObjectTypeDefinition(objectTypeNode: ObjectTypeDefinitionNode) {
        const objectTypeName = objectTypeNode.name.value;
        let indexCount = 0;
        return {
            ...objectTypeNode,
            directives: objectTypeNode.directives?.map((directiveNode: DirectiveNode) => {
                if (directiveNode.name.value === "fulltext") {
                    return {
                        ...directiveNode,
                        arguments: directiveNode.arguments?.map((directiveArg) => {
                            if (directiveArg.name.value === "indexes") {
                                return {
                                    ...directiveArg,
                                    value: {
                                        ...directiveArg.value,
                                        values: (directiveArg.value as ListValueNode).values.map((obj) => {
                                            indexCount += 1;
                                            const withIndexName = upsertField(
                                                obj as ObjectValueNode,
                                                "indexName",
                                                `${objectTypeName}IndexName${indexCount}`
                                            );
                                            return upsertField(
                                                withIndexName,
                                                "queryName",
                                                `${objectTypeName}FulltextQuery${indexCount}`
                                            );
                                        }),
                                    },
                                };
                            }
                            return directiveArg;
                        }),
                    };
                }

                return directiveNode;
            }),
        };
    },
};

function hasField(obj: ObjectValueNode, name: string): boolean {
    return Boolean(obj.fields.find((field) => field.name.value === name));
}

function upsertField(obj: ObjectValueNode, key: string, value: string): ObjectValueNode {
    if (!hasField(obj, key)) {
        return {
            ...obj,
            fields: [...obj.fields, createStringField(key, value)],
        };
    }

    return obj;
}

function createStringField(key: string, value: string): ObjectFieldNode {
    return {
        kind: Kind.OBJECT_FIELD,
        name: {
            kind: Kind.NAME,
            value: key,
        },
        value: {
            kind: Kind.STRING,
            value: value,
        },
    };
}
