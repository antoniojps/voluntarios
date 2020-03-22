import gql from 'graphql-tag';
import Category from './../../models/category';
import { secure } from './../utils/filters';

export const typeDef = gql`
  type Category{
    _id: ID!
    name: String!
    color: HexColorCode!
  }

  input CategoryInput {
    name: String!
    color: HexColorCode!
  }

  type CategoryEdge {
    node: Category!
    cursor: DateTime!
  }

  type CategoryConnection {
    totalCount: Int!
    edges: [CategoryEdge]
    pageInfo: PaginationInfo!
  }

  extend type Query {
    # All categories
    allCategories: [Category]
    # Search categories by name paginated
    categories(search: String, pagination: PaginationInput): CategoryConnection
  }

  extend type Mutation {
    # (Admin) Add a category with name and color
    addCategory(input: CategoryInput!): Category!
    # (Admin) Update a category name and color
    updateCategory(categoryId: ID!, input: CategoryInput!): Category
    # (Admin) Delete category
    removeCategory(categoryId: ID!): Category
  }
`;

export const resolvers = {
  Query: {
    allCategories: () => Category.find({}),
    categories: (root, { search, pagination = {} }) => Category.searchByName({ search, pagination }),
  },
  Mutation: {
    addCategory: secure(
      async (root, { input }) => {
        const newCategory = new Category(input)
        await newCategory.save()
        return newCategory
      },
      true,
    ),
    updateCategory: secure(
      async (root, { categoryId, input: category }) => {
        const updatedCategory = await Category.findOneAndUpdate(
          {
            _id: categoryId,
          },
          {
            $set: category,
          },
          {
            new: true,
          },
        )
        return updatedCategory
      },
      true,
    ),
    removeCategory: secure(
      async (root, { categoryId }) => {
        const removedCategory = await Category.findOneAndDelete({ _id: categoryId })
        return removedCategory
      },
      true,
    ),
  },
};
