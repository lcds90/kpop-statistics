type Units = "1fr" | "2fr" | "3fr" | "0.1fr" | "20rem"

type GridTypes = "auto" | "max-content" | Units;

interface GridProperties {
    rows:  GridTypes[];
    columns: GridTypes[];
}

type As = "div" | "main" | "section" | "header" | "footer" | "aside" | "article" | "nav";

interface LayoutProps {
    as?: As;
    isMaxHeight?: boolean;
    isMaxWidth?: boolean;
    hasBackground?: boolean;
    padding?: {
        mobile: "small" | "medium" | "large";
        tablet: "small" | "medium" | "large";
    };
    flex?: {
        direction?: "row" | "column";
        justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
        align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    };
    grid?: {
        mobile?: GridProperties;
        tablet?: GridProperties;
        autofit?: {
            minSize: Units;
            maxSize: Units;
        };
    };
    gap?: {
        mobile: "small" | "medium" | "large";
        tablet: "small" | "medium" | "large";
    };
    overflow?: {
        y?: boolean;
        x?: boolean;
    }
}