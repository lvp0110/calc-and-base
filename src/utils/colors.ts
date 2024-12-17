
const colors = [
    'cyan',
    'pink',
    'purple',
    'deepPurple',
    'indigo',
    "blue",
    'teal',
    'green',
    "lightGreen",
    "orange",
    'deepOrange',
    'brown',
    'blueGrey',
  ];
  
  export const getColorFromString = (text: string): string => {
    let hash = 0;
  
    for (let i = 0; i < text.length; i += 1) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
    }
  
    hash = ((hash % colors.length) + colors.length) % colors.length;
  
    return colors[hash];
  };