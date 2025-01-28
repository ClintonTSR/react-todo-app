export type PaginatedResponse<T> = {
    data: T[],
    cursor: {
        afterCursor?: string;
        beforeCursor?: string;
    }
}