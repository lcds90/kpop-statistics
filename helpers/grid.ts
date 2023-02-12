export const gridGenerator = (
    rows: number | GridTypes[],
    columns: number | GridTypes[]
): GridProperties => {
    const grid: GridProperties = {
        rows: Array.isArray(rows) ? rows : [],
        columns: Array.isArray(columns) ? columns : [],
    };

    if (typeof rows === "number") {
        for (let i = 0; i < rows; i++) {
            grid.rows.push("1fr");
        }
    }

    if (typeof columns === "number") {
        for (let i = 0; i < columns; i++) {
            grid.columns.push("1fr");
        }
    }

    return grid;
};