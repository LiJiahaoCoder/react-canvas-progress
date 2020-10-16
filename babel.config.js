'use strict';

module.exports = {
  presets: [
      [
          '@babel/preset-env',
          {
              targets: {
                  node: 'current'
              }
          }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
  ],
  plugins: [
    [
      "prismjs",
      {
        languages: ["tsx"],
        theme: "default",
        css: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
