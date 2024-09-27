import { Button, Pagination } from '@nextui-org/react';
import React, { useCallback } from 'react';

interface Props {
    page: number;
    pages: number;
    setPage: (value: number) => void; // Updated return type to void
}

const TableBottomContent: React.FC<Props> = ({ page, pages, setPage }) => {
    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);      
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);
    return (
        <div className="flex w-full justify-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)} // Renamed the param for clarity
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                    Previous
                </Button>
                <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default TableBottomContent;
