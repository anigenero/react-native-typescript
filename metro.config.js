/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
module.exports = {
    resolver: {
        sourceExts: ["js", "ts", "tsx", "graphql", "gql"],
    },
    transformer: {
        babelTransformerPath: require.resolve("react-native-typescript-transformer"),
    },
};
