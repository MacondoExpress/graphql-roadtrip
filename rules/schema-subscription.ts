// extend schema @subscription

import { ASTVisitor, DocumentNode, Kind } from "graphql";
import { hasDirective } from "../helpers/has-directive";

export const schemaSubscription: ASTVisitor = {
    Document(doc: DocumentNode) {
        if (!hasSubscriptionExtension(doc)) {
            return {
                ...doc,
                definitions: [
                    ...doc.definitions,
                    {
                        kind: Kind.SCHEMA_EXTENSION,
                        directives: [
                            {
                                kind: Kind.DIRECTIVE,
                                name: {
                                    kind: Kind.NAME,
                                    value: "subscription",
                                },
                            },
                        ],
                    },
                ],
            };
        }
        return doc;
    },
};

function hasSubscriptionExtension(doc: DocumentNode): boolean {
    return Boolean(
        doc.definitions.find((def) => {
            return def.kind === Kind.SCHEMA_EXTENSION && hasDirective([...(def.directives ?? [])], "subscription");
        })
    );
}
