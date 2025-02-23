import Maybe from '../tsutils/Maybe';
import { GraphQLSchema } from '../type/schema';
import {
  GraphQLOutputType,
  GraphQLCompositeType,
  GraphQLInputType,
  GraphQLField,
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLType,
} from '../type/definition';
import { GraphQLDirective } from '../type/directives';
import { ASTNode, FieldNode } from '../language/ast';

/**
 * TypeInfo is a utility class which, given a GraphQL schema, can keep track
 * of the current field and type definitions at any point in a GraphQL document
 * AST during a recursive descent by calling `enter(node)` and `leave(node)`.
 */
export class TypeInfo {
  constructor(
    schema: GraphQLSchema,
    // NOTE: this experimental optional second parameter is only needed in order
    // to support non-spec-compliant codebases. You should never need to use it.
    // It may disappear in the future.
    getFieldDefFn?: getFieldDef,
    // Initial type may be provided in rare cases to facilitate traversals
    // beginning somewhere other than documents.
    initialType?: GraphQLType,
  );

  getType(): Maybe<GraphQLOutputType>;
  getParentType(): Maybe<GraphQLCompositeType>;
  getInputType(): Maybe<GraphQLInputType>;
  getParentInputType(): Maybe<GraphQLInputType>;
  getFieldDef(): GraphQLField<any, Maybe<any>>;
  getDefaultValue(): Maybe<any>;
  getDirective(): Maybe<GraphQLDirective>;
  getArgument(): Maybe<GraphQLArgument>;
  getEnumValue(): Maybe<GraphQLEnumValue>;
  enter(node: ASTNode): any;
  leave(node: ASTNode): any;
}

type getFieldDef = (
  schema: GraphQLSchema,
  parentType: GraphQLType,
  fieldNode: FieldNode,
) => Maybe<GraphQLField<any, any>>;
