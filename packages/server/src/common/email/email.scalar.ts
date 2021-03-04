import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, Kind, ValueNode } from 'graphql';

import { emailRegExp } from '@nestjs-graphql-react/common';

@Scalar('Email')
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Email custom scalar type';

  private emailRegex: RegExp;

  constructor() {
    this.emailRegex = emailRegExp;
  }

  parseValue(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string');
    }

    if (!this.emailRegex.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  }

  serialize(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!this.emailRegex.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as email addresses but got a: ${ast.kind}`,
      );
    }

    if (!this.emailRegex.test(ast.value)) {
      throw new TypeError(`Value is not a valid email address: ${ast.value}`);
    }

    return ast.value;
  }
}
