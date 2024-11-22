### gitignore file:
```
# dependencies
node_modules
/.pnp
.pnp.js

# production
/build
/dist

# misc
.DS_Store

npm-debug.log*
.vscode
dbConfig.json
```
Summary of what it does: 
This .gitignore file is configured to:
- Ignore dependencies and build artifacts (node_modules, build, dist, .pnp).
- Ignore files that are specific to your local system or development environment (.DS_Store, .vscode, npm-debug.log*).
- Prevent sensitive or developer-specific files like dbConfig.json from being tracked.
- By including these rules, your repository will only track the essential source files and configuration needed for others to build and run the project, reducing unnecessary clutter and improving security.
