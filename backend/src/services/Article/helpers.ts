import { IFindArticleDto } from 'dtos/article/IFindArticle';

export const provideTagQueryObject = (
    tags: string[],
    containsAll: boolean = false
): Object =>
    containsAll
        ? {
              tags: { $all: tags }
          }
        : {
              tags: { $in: tags }
          };

export const provideFilterQueryObject = (query: string): Object => ({
    $or: [
        { title: { $regex: query, $options: 'i' } },
        { summary: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
    ]
});

export const getQueryObject = ({
    tags,
    containsAll,
    query
}: IFindArticleDto) => {
    switch (true) {
        case tags !== undefined && query !== undefined:
            return {
                ...provideTagQueryObject(tags as string[], containsAll),
                ...provideFilterQueryObject(query as string)
            };
        case tags !== undefined:
            return provideTagQueryObject(tags as string[], containsAll);
        case query !== undefined:
            return provideFilterQueryObject(query as string);
        default:
            return {};
    }
};
