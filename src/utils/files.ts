const newLine = `\r\n`;

export const exportToCsv = (columns: string[], rows: string[][]) => {
  let data = columns.join(",") + newLine;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];

    data += row.join(",") + newLine;
  }

  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", "export.csv");
  a.click();
};
