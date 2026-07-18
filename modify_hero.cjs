const fs = require('fs');

let jsx = fs.readFileSync('src/components/Hero.jsx', 'utf8');

// 1. Remove the inline ChakraModel (lines 6 to 66)
// The block starts with "const ChakraModel = () => {" and ends with "};" before "const Hero = () => {"
jsx = jsx.replace(/const ChakraModel = \(\) => \{[\s\S]*?\};\n\nconst Hero = \(\) => \{/, 'import ChakraModel3D from \'./ChakraModel3D\';\n\nconst Hero = () => {');

// 2. Replace <ChakraModel /> with <ChakraModel3D theme="dark" />
jsx = jsx.replace(/<ChakraModel \/>/g, '<ChakraModel3D theme="dark" />');

fs.writeFileSync('src/components/Hero.jsx', jsx);
