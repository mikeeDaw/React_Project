export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file) => 
  new Promise((resolve, reject) => {
    // 'resolve' - call this function to fulfill the promise and return the data passed to it.
    // 'reject' - call to reject the promise. (and return the data passed to it?)
    console.log(file)
    const fileReader = new FileReader();
    // 'onload' - this event is fired when the file is loaded successully.
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    console.log(fileReader, file)
  });


export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};

// Function to add 'Black' value to the color (by Chatgpt)
export const darkenColor = (hexColor, amount) => {
  // Ensure the amount is within the valid range [0, 100]
  amount = Math.max(0, Math.min(100, amount));

  // Remove the '#' character if it exists
  hexColor = hexColor.replace(/^#/, '');

  // Parse the hex color into its RGB components
  const red = parseInt(hexColor.slice(0, 2), 16);
  const green = parseInt(hexColor.slice(2, 4), 16);
  const blue = parseInt(hexColor.slice(4, 6), 16);

  // Calculate the new red, green, and blue values
  const newRed = Math.max(0, red - (255 * (amount / 100)));
  const newGreen = Math.max(0, green - (255 * (amount / 100)));
  const newBlue = Math.max(0, blue - (255 * (amount / 100)));

  // Convert the adjusted RGB values back to a hex color
  const newHexColor = `#${(1 << 24 | newRed << 16 | newGreen << 8 | newBlue).toString(16).slice(1)}`;

  return newHexColor;
}





