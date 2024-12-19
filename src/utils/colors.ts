
const colors = [
    "blue",
    'brown',
    'red',
    'green',
    "orange", 
    'gray',
    'black',
    'navy',
    'yellowgreen',
  ];

  export const getColorByIndex = (index: number): string => {
    return colors[index]
  }
  
  export const getColorFromString = (text: string): string => {
    let hash = 0;
  
    for (let i = 0; i < text.length; i += 1) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
    }
  
    hash = ((hash % colors.length) + colors.length) % colors.length;
  
    return colors[hash];
  };