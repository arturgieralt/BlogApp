import mongoose from 'mongoose';

export const commentsExpected = [
    {
        _id: new mongoose.Types.ObjectId('500a44b66970a011ed25ca0e'),
        content: 'The comment was removed.',
        author: {
            _id: new mongoose.Types.ObjectId('5d1a44b66970a011ed25ca0e'),
            name: 'myUser'
        },
        isRemoved: true,
        article: new mongoose.Types.ObjectId('7d1a44b66970a011ed25ca0e'),
        created_date: new Date('2019-10-04T00:00:00.000Z')
    },
    {
        _id: new mongoose.Types.ObjectId('600a44b66970a011ed25ca0e'),
        content: 'It is important to use tags to make user be able to search..',
        author: {
            _id: new mongoose.Types.ObjectId('5d1a44b66970a011ed25ca0e'),
            name: 'myUser'
        },
        isRemoved: false,
        article: new mongoose.Types.ObjectId('7d1a44b66970a011ed25ca0e'),
        created_date: new Date('2019-10-04T00:00:00.000Z')
    },
    {
        _id: new mongoose.Types.ObjectId('700a44b66970a011ed25ca0e'),
        content: 'It is important to use tags to make user be able to search..',
        author: {
            _id: new mongoose.Types.ObjectId('5d1a44b66970a011ed25ca0e'),
            name: 'myUser'
        },
        isRemoved: false,
        article: new mongoose.Types.ObjectId('901a44b66970a011ed25ca0e'),
        created_date: new Date('2019-10-04T00:00:00.000Z')
    }
];
