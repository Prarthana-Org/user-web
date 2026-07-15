import os

filepath = "/Users/kvid/Desktop/Projects/Prarthana/user-web/src/components/AppShowcase.jsx"
with open(filepath, "r") as f:
    content = f.read()

# Replace HTML comments with JSX comments
content = content.replace("<!--", "{/*").replace("-->", "*/}")

with open(filepath, "w") as f:
    f.write(content)

print("Fixed HTML comments in AppShowcase.jsx")
