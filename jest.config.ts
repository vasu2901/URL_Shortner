export default {
    preset: "ts-jest",
    testEnvironment: "node", // or "node"
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
};
