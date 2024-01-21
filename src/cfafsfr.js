const files = [
    'Home',
    'Login',
    'Registration',
    'KiuHost',
    'KiuHelp',
    'Profile',
  ];
  
  const fs = require('fs');
  
  // Create the "components" folder if it doesn't exist
  const componentsFolder = 'components';
  if (!fs.existsSync(componentsFolder)) {
    fs.mkdirSync(componentsFolder);
  }
  
  files.forEach(fileName => {
    const jsxFileName = `${fileName}.jsx`;
  
    // Write the content to the components folder
    fs.writeFileSync(
      `${componentsFolder}/${jsxFileName}`,
      `This is the content of ${jsxFileName} file in the "components" folder.`
    );
  });
  
  console.log('Components generated successfully in the "components" folder!');
  