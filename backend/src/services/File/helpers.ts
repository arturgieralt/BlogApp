import { IFindFileDto } from '../../dtos/file/IFindFile';
import { provideTagQueryObject } from '../../services/Article/helpers';

const provideUploadByQueryObject = (uploadBy: string) => ({
    uploadBy
});

export const getQueryObject = ({
    tags,
    containsAll,
    uploadBy
}: IFindFileDto) => {
    switch (true) {
        case tags !== undefined && uploadBy !== undefined:
            return {
                ...provideTagQueryObject(tags as string[], containsAll),
                ...provideUploadByQueryObject(uploadBy as string)
            };
        case tags !== undefined:
            return provideTagQueryObject(tags as string[], containsAll);
        case uploadBy !== undefined:
            return provideUploadByQueryObject(uploadBy as string);
        default:
            return {};
    }
};
