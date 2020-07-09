const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        firefox: "60",
        chrome: "67"
      }
    },
    "@babel/preset-typescript"
  ]
];

const plugins = ["@babel/plugin-proposal-class-properties", "@babel/proposal-object-rest-spread"];
  
module.exports = { 
  presets, 
  plugins 
};