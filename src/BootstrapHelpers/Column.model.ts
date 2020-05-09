export class ColumnModel {
    constructor(
        public colSize: number,
        public colBreakpoint: 'sm' | 'md' | 'lg' | 'xs'
    ) {
    }

    static getAsClass(columns: ColumnModel[]): string {
        return columns.map((col: ColumnModel) => {
            if (col.colBreakpoint === "xs") {
                return `col-${col.colSize}`
            }
            return `col-${col.colBreakpoint}-${col.colSize}`
        }).join(' ')
    }
}