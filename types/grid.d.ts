type Units = "1fr" | "2fr" | "3fr" | "0.1fr"
type GridTypes = "auto" | "max-content" | Units;


interface GridProperties {
    rows: GridTypes[];
    columns: GridTypes[];
}

interface LayoutProps {
    isMaxHeight?: boolean;
    isMaxWidth?: boolean;
    hasBackground?: boolean;
    grid: {
        mobile: GridProperties;
        tablet: GridProperties;
    };
}