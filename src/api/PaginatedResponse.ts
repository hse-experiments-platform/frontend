interface PaginationInfo {
    total: number;
}

interface PaginatedResponse {
    pageInfo: PaginationInfo;
}

export default PaginatedResponse;